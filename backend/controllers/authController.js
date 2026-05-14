const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendEmailOtp, sendPasswordResetEmail, sendSmsOtp, getEmailOtpStatus } = require('../utils/otpSender');

// Helper to generate 6-digit numeric OTP
const generateNumericOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const normalizeContact = (contact) => {
    if (!contact) return contact;
    const value = String(contact).trim();
    return value.includes('@') ? value.toLowerCase() : value.replace(/\s+/g, '');
};

const maskContact = (contact) => {
    if (!contact) return contact;
    if (contact.includes('@')) {
        const [name, domain] = contact.split('@');
        return `${name.slice(0, 2)}***@${domain}`;
    }
    return `${contact.slice(0, 2)}***${contact.slice(-2)}`;
};

const logOtpEvent = (event, contact, extra = {}) => {
    console.log(`[OTP] ${event}`, {
        contact: maskContact(contact),
        channel: contact?.includes('@') ? 'email' : 'sms',
        ...extra
    });
};

const buildUserPayload = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    isVerified: user.isVerified,
    addresses: user.addresses,
    preferences: user.preferences
});

const sendAuthResponse = (res, user, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data: {
            user: buildUserPayload(user),
            token: generateToken(user._id)
        }
    });
};

const normalizeBaseUrl = (url) => {
    if (!url) return null;

    const firstUrl = String(url).split(',')[0].trim().replace(/\/+$/, '');
    if (!firstUrl || firstUrl.includes('your-vercel-domain')) return null;

    const withProtocol = /^https?:\/\//i.test(firstUrl) ? firstUrl : `https://${firstUrl}`;

    try {
        return new URL(withProtocol).origin;
    } catch {
        return null;
    }
};

const getClientUrl = (req) => {
    const explicitResetUrl = normalizeBaseUrl(process.env.RESET_PASSWORD_BASE_URL);
    if (explicitResetUrl) return explicitResetUrl;

    const requestedOrigin = normalizeBaseUrl(req.body?.clientOrigin || req.get('origin'));
    if (requestedOrigin) return requestedOrigin;

    const referer = req.get('referer');
    if (referer) {
        const refererOrigin = normalizeBaseUrl(referer);
        if (refererOrigin) return refererOrigin;
    }

    const envUrl = [
        process.env.CLIENT_URL,
        process.env.FRONTEND_URL,
        process.env.VITE_APP_URL,
        process.env.VERCEL_URL
    ].map(normalizeBaseUrl).find(Boolean);
    if (envUrl) return envUrl;

    return 'http://localhost:5173';
};

const hashResetToken = (token) => (
    crypto.createHash('sha256').update(token).digest('hex')
);

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const normalizeLocation = (location) => {
    if (!location) return undefined;

    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return undefined;
    }

    return {
        latitude,
        longitude,
        accuracy: Number.isFinite(Number(location.accuracy)) ? Number(location.accuracy) : undefined,
        capturedAt: location.capturedAt ? new Date(location.capturedAt) : new Date()
    };
};

// @desc    Register a new user after email OTP verification
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const name = String(req.body.name || '').trim();
        const password = String(req.body.password || '');
        const email = normalizeContact(req.body.email);
        const phone = normalizeContact(req.body.phone);

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, phone, and password are required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please add a valid email' });
        }

        if (phone.length !== 10) {
            return res.status(400).json({ success: false, message: 'Please add a valid 10-digit phone number' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        const existingEmailUser = await User.findOne({ email });
        if (existingEmailUser?.isVerified) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const existingPhoneUser = await User.findOne({ phone });
        if (existingPhoneUser?.isVerified && existingPhoneUser.email !== email) {
            return res.status(400).json({ success: false, message: 'Phone number is already registered' });
        }

        if (existingEmailUser && !existingEmailUser.isVerified) {
            await User.deleteOne({ _id: existingEmailUser._id });
        }

        if (existingPhoneUser && !existingPhoneUser.isVerified && existingPhoneUser.email !== email) {
            await User.deleteOne({ _id: existingPhoneUser._id });
        }

        const contact = email;
        logOtpEvent('register_requested', contact);
        const lastOtp = await Otp.findOne({ contact, purpose: 'register' });

        if (lastOtp && (Date.now() - new Date(lastOtp.lastSentAt).getTime() < 60000)) {
            return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting a new OTP' });
        }

        if (lastOtp) {
            await Otp.deleteOne({ _id: lastOtp._id });
        }

        const numericOtp = generateNumericOtp();
        const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(10));

        await Otp.create({
            contact,
            purpose: 'register',
            otp: numericOtp,
            pendingUser: {
                name,
                email,
                phone,
                passwordHash
            },
            expiresAt: new Date(Date.now() + 5 * 60000)
        });

        const otpSent = await sendEmailOtp(contact, numericOtp);
        if (!otpSent) {
            await Otp.deleteOne({ contact, purpose: 'register' });
            return res.status(502).json({ success: false, message: 'Failed to send OTP. Check email configuration on the server.' });
        }

        res.status(201).json({
            success: true,
            message: `OTP sent successfully to ${contact}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Send OTP securely (Can be used for resend or separate auth flows)
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = async (req, res) => {
    try {
        const { phone, email, type } = req.body;
        const contact = normalizeContact(req.body.contact || phone || email);

        if (!contact) {
            return res.status(400).json({ success: false, message: 'Contact information is required' });
        }

        logOtpEvent('send_requested', contact, { type });
        const lastOtp = await Otp.findOne({ contact }).sort({ createdAt: -1 });

        if (lastOtp && (Date.now() - new Date(lastOtp.lastSentAt).getTime() < 60000)) {
            return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting a new OTP' });
        }

        if (lastOtp) {
            await Otp.deleteOne({ _id: lastOtp._id });
        }

        const numericOtp = generateNumericOtp();

        await Otp.create({
            contact,
            purpose: 'generic',
            otp: numericOtp,
            expiresAt: new Date(Date.now() + 5 * 60000)
        });

        const otpSent = type === 'email' || contact.includes('@')
            ? await sendEmailOtp(contact, numericOtp)
            : await sendSmsOtp(contact, numericOtp);

        if (!otpSent) {
            await Otp.deleteOne({ contact });
            return res.status(502).json({ success: false, message: 'Failed to send OTP. Check email configuration on the server.' });
        }

        res.status(200).json({ success: true, message: 'OTP sent successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


// @desc    Verify OTP and Authenticate User
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const phone = normalizeContact(req.body.phone);
        const email = normalizeContact(req.body.email);
        const contact = phone || email;

        if (!contact || !otp) {
            return res.status(400).json({ success: false, message: 'Contact and OTP are required' });
        }

        logOtpEvent('verify_requested', contact);
        const otpDoc = await Otp.findOne({ contact }).sort({ createdAt: -1 });

        if (!otpDoc) {
            return res.status(400).json({ success: false, message: 'OTP expired or not found' });
        }

        if (otpDoc.attempts >= 5) {
            await Otp.deleteOne({ _id: otpDoc._id });
            return res.status(429).json({ success: false, message: 'Too many failed attempts. Please request a new OTP.' });
        }

        const isMatch = await otpDoc.matchOtp(otp);

        if (!isMatch) {
            otpDoc.attempts += 1;
            await otpDoc.save();
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (otpDoc.purpose === 'register') {
            const pendingUser = otpDoc.pendingUser || {};

            if (!pendingUser.name || !pendingUser.email || !pendingUser.phone || !pendingUser.passwordHash) {
                await Otp.deleteOne({ _id: otpDoc._id });
                return res.status(400).json({ success: false, message: 'Registration session expired. Please register again.' });
            }

            const existingEmailUser = await User.findOne({ email: pendingUser.email });
            if (existingEmailUser?.isVerified) {
                await Otp.deleteOne({ _id: otpDoc._id });
                return res.status(400).json({ success: false, message: 'User already exists' });
            }

            const existingPhoneUser = await User.findOne({ phone: pendingUser.phone });
            if (existingPhoneUser?.isVerified && existingPhoneUser.email !== pendingUser.email) {
                await Otp.deleteOne({ _id: otpDoc._id });
                return res.status(400).json({ success: false, message: 'Phone number is already registered' });
            }

            if (existingEmailUser && !existingEmailUser.isVerified) {
                await User.deleteOne({ _id: existingEmailUser._id });
            }

            if (existingPhoneUser && !existingPhoneUser.isVerified && existingPhoneUser.email !== pendingUser.email) {
                await User.deleteOne({ _id: existingPhoneUser._id });
            }

            const user = new User({
                name: pendingUser.name,
                email: pendingUser.email,
                phone: pendingUser.phone,
                password: pendingUser.passwordHash,
                isVerified: true
            });
            user.$locals.skipPasswordHash = true;
            await user.save();

            await Otp.deleteMany({ contact: pendingUser.email, purpose: 'register' });

            return sendAuthResponse(res, user, 201);
        }

        await Otp.deleteOne({ _id: otpDoc._id });
        return res.status(400).json({
            success: false,
            message: 'OTP verification is only required during signup.'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { password } = req.body;
        const email = normalizeContact(req.body.email);

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please complete signup verification before logging in.'
            });
        }

        sendAuthResponse(res, user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    isVerified: user.isVerified,
                    addresses: user.addresses,
                    preferences: user.preferences
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { name, phone, address, addressDetails, preferences } = req.body;

        if (name !== undefined) {
            const trimmedName = String(name).trim();
            if (!trimmedName) {
                return res.status(400).json({ success: false, message: 'Name cannot be empty' });
            }
            user.name = trimmedName;
        }

        if (phone !== undefined) {
            const normalizedPhone = normalizeContact(phone);
            if (normalizedPhone && normalizedPhone.length !== 10) {
                return res.status(400).json({ success: false, message: 'Please add a valid 10-digit phone number' });
            }
            user.phone = normalizedPhone;
        }

        if (addressDetails !== undefined || address !== undefined) {
            const currentAddress = user.addresses?.[0]?.toObject?.() || user.addresses?.[0] || {};
            const nextAddress = addressDetails || {};
            user.addresses = [{
                ...currentAddress,
                street: addressDetails !== undefined ? String(nextAddress.street || '').trim() : address,
                city: addressDetails !== undefined ? String(nextAddress.city || '').trim() : currentAddress.city,
                state: addressDetails !== undefined ? String(nextAddress.state || '').trim() : currentAddress.state,
                zipCode: addressDetails !== undefined ? String(nextAddress.zipCode || '').replace(/\D/g, '').slice(0, 6) : currentAddress.zipCode,
                location: addressDetails !== undefined ? normalizeLocation(nextAddress.location) : currentAddress.location,
                isDefault: true
            }];
        }

        if (preferences !== undefined) {
            user.preferences = {
                ...(user.preferences?.toObject?.() || user.preferences || {}),
                emailNotifications: Boolean(preferences.emailNotifications),
                orderUpdates: Boolean(preferences.orderUpdates),
                marketingEmails: Boolean(preferences.marketingEmails)
            };
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: buildUserPayload(updatedUser)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Change logged-in user's password
// @route   PUT /api/auth/password
// @access  Private
const changePassword = async (req, res) => {
    try {
        const currentPassword = String(req.body.currentPassword || '');
        const newPassword = String(req.body.newPassword || req.body.password || '');
        const confirmPassword = req.body.confirmPassword;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Current password and new password are required' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        if (confirmPassword !== undefined && confirmPassword !== newPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        const user = await User.findById(req.user._id).select('+password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Send password reset link
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const email = normalizeContact(req.body.email);

        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please add a valid email' });
        }

        const genericMessage = 'If an account exists for this email, a password reset link has been sent.';
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: true, message: genericMessage });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = hashResetToken(resetToken);
        user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${getClientUrl(req)}/reset-password/${resetToken}`;
        const emailSent = await sendPasswordResetEmail(user.email, resetUrl);

        if (!emailSent) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(502).json({ success: false, message: 'Failed to send reset email. Check email configuration on the server.' });
        }

        res.json({ success: true, message: genericMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Reset user password with token
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const resetToken = req.params.token;
        const password = String(req.body.password || req.body.newPassword || '');
        const confirmPassword = req.body.confirmPassword;

        if (!resetToken) {
            return res.status(400).json({ success: false, message: 'Reset token is required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        if (confirmPassword !== undefined && confirmPassword !== password) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        const user = await User.findOne({
            resetPasswordToken: hashResetToken(resetToken),
            resetPasswordExpires: { $gt: Date.now() }
        }).select('+resetPasswordToken +resetPasswordExpires');

        if (!user) {
            return res.status(400).json({ success: false, message: 'Reset link is invalid or expired' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;
        await user.save();

        res.json({ success: true, message: 'Password reset successfully. You can now sign in.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Check OTP email configuration without exposing secrets
// @route   GET /api/auth/otp-health
// @access  Public
const getOtpHealth = async (req, res) => {
    res.json({
        success: true,
        data: {
            email: getEmailOtpStatus()
        }
    });
};

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    sendOtp,
    verifyOtp,
    forgotPassword,
    resetPassword,
    getOtpHealth
};
