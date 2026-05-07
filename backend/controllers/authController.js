const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const { sendEmailOtp, sendSmsOtp } = require('../utils/otpSender');

// Helper to generate 6-digit numeric OTP
const generateNumericOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register a new user (Creates unverified user and sends OTP)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const userExists = await User.findOne({ email });
        // We can optionally check if an unverified user exists and update them, 
        // but for now we'll just reject if email is taken.
        if (userExists && userExists.isVerified) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        let user = userExists;
        if (!userExists) {
            user = await User.create({
                name,
                email,
                password,
                phone,
                isVerified: false
            });
        } else {
            user.name = name;
            user.password = password;
            user.phone = phone;
            user.isVerified = false;
            await user.save();
        }

        // Logic to send OTP
        const contact = email; // Relying primarily on email for OTP
        const lastOtp = await Otp.findOne({ contact });

        if (lastOtp && (Date.now() - new Date(lastOtp.lastSentAt).getTime() < 60000)) {
            return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting a new OTP' });
        }

        if (lastOtp) {
            await Otp.deleteOne({ _id: lastOtp._id });
        }

        const numericOtp = generateNumericOtp();

        await Otp.create({
            contact,
            otp: numericOtp,
            expiresAt: new Date(Date.now() + 5 * 60000) // 5 minutes
        });

        // Try sending SMS. You could also sendEmailOtp here parallelly.
        const otpSent = await sendSmsOtp(contact, numericOtp);
        if (!otpSent) {
            await Otp.deleteOne({ contact });
            return res.status(502).json({ success: false, message: 'Failed to send OTP. Please try again.' });
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
        const contact = req.body.contact || phone || email;

        if (!contact) {
            return res.status(400).json({ success: false, message: 'Contact information is required' });
        }

        const lastOtp = await Otp.findOne({ contact });

        if (lastOtp && (Date.now() - new Date(lastOtp.lastSentAt).getTime() < 60000)) {
            return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting a new OTP' });
        }

        if (lastOtp) {
            await Otp.deleteOne({ _id: lastOtp._id });
        }

        const numericOtp = generateNumericOtp();

        await Otp.create({
            contact,
            otp: numericOtp,
            expiresAt: new Date(Date.now() + 5 * 60000)
        });

        const otpSent = type === 'email' || contact.includes('@')
            ? await sendEmailOtp(contact, numericOtp)
            : await sendSmsOtp(contact, numericOtp);

        if (!otpSent) {
            await Otp.deleteOne({ contact });
            return res.status(502).json({ success: false, message: 'Failed to send OTP. Please try again.' });
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
        const { phone, email, otp } = req.body;
        const contact = phone || email;

        if (!contact || !otp) {
            return res.status(400).json({ success: false, message: 'Contact and OTP are required' });
        }

        const otpDoc = await Otp.findOne({ contact });

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

        // OTP is valid. Now log the user in via email or phone.
        const user = await User.findOne(phone ? { phone } : { email }).select('+password');

        if (!user) {
            await Otp.deleteOne({ _id: otpDoc._id });
            return res.status(404).json({ success: false, message: 'User not found for this contact' });
        }

        // Mark user as verified
        if (!user.isVerified) {
            user.isVerified = true;
            await user.save();
        }

        await Otp.deleteOne({ _id: otpDoc._id });

        res.json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    isVerified: user.isVerified
                },
                token: generateToken(user._id)
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Auth user & get token (Standard Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            // Enforce OTP on Login as well
            const contact = user.email; // Use email as primary contact for OTP
            const lastOtp = await Otp.findOne({ contact });

            if (lastOtp && (Date.now() - new Date(lastOtp.lastSentAt).getTime() < 60000)) {
                return res.status(429).json({ success: false, message: 'Please wait 60 seconds before requesting a new OTP' });
            }

            if (lastOtp) {
                await Otp.deleteOne({ _id: lastOtp._id });
            }

            const numericOtp = generateNumericOtp();

            await Otp.create({
                contact,
                otp: numericOtp,
                expiresAt: new Date(Date.now() + 5 * 60000)
            });

            const otpSent = contact.includes('@')
                ? await sendEmailOtp(contact, numericOtp)
                : await sendSmsOtp(contact, numericOtp);

            if (!otpSent) {
                await Otp.deleteOne({ contact });
                return res.status(502).json({ success: false, message: 'Failed to send OTP. Please try again.' });
            }

            res.json({
                success: true,
                message: 'OTP sent for login',
                requireOtp: true,
                contact: contact // Pass the contact so frontend knows where it was sent
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
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
                    isVerified: user.isVerified
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

        const { name, phone, address } = req.body;

        if (name !== undefined) {
            user.name = name;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (address !== undefined) {
            user.addresses = [{
                ...(user.addresses?.[0]?.toObject?.() || user.addresses?.[0] || {}),
                street: address,
                isDefault: true
            }];
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                isVerified: updatedUser.isVerified,
                addresses: updatedUser.addresses
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
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
    sendOtp,
    verifyOtp
};
