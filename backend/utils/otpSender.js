const nodemailer = require('nodemailer');
const twilio = require('twilio');
const dns = require('dns');

if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
}

const getEnv = (...names) => {
    for (const name of names) {
        const value = process.env[name];
        if (value !== undefined && String(value).trim() !== '') {
            return String(value).trim();
        }
    }
    return undefined;
};

// Configuration with sensible defaults for Gmail if not provided
const smtpConfig = {
    host: getEnv('SMTP_HOST', 'MAIL_HOST', 'EMAIL_HOST') || 'smtp.gmail.com',
    port: Number(getEnv('SMTP_PORT', 'MAIL_PORT', 'EMAIL_PORT') || 465),
    user: getEnv('SMTP_USER', 'SMTP_EMAIL', 'MAIL_USER', 'EMAIL_USER', 'GMAIL_USER'),
    pass: getEnv('SMTP_PASS', 'SMTP_PASSWORD', 'MAIL_PASS', 'EMAIL_PASS', 'GMAIL_APP_PASSWORD', 'GMAIL_PASS'),
    from: getEnv('SMTP_FROM', 'MAIL_FROM', 'EMAIL_FROM')
};

const missingEmailConfig = [];
if (!smtpConfig.user) missingEmailConfig.push('SMTP_USER');
if (!smtpConfig.pass) missingEmailConfig.push('SMTP_PASS');

// Transporter for Email
let transporter;
if (missingEmailConfig.length === 0) {
    const smtpPass = smtpConfig.host.includes('gmail.com')
        ? smtpConfig.pass.replace(/\s+/g, '')
        : smtpConfig.pass;

    // Use SSL for port 465, STARTTLS for 587
    const isSecure = smtpConfig.port === 465;

    console.log('[OTP_EMAIL] Initializing Mail Transporter', {
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: isSecure,
        user: smtpConfig.user.slice(0, 3) + '***'
    });

    transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: isSecure,
        family: 4,
        pool: true, // Use pooling for better performance
        maxConnections: 5,
        maxMessages: 100,
        auth: {
            user: smtpConfig.user,
            pass: smtpPass
        },
        tls: {
            // Do not fail on invalid certificates
            rejectUnauthorized: false
        },
        connectionTimeout: 15000, // 15 seconds
        greetingTimeout: 15000,
        socketTimeout: 30000
    });
} else {
    console.warn('[OTP_EMAIL] Email delivery is not configured.', {
        missing: missingEmailConfig,
        hint: 'Set SMTP_USER and SMTP_PASS in the backend environment.'
    });
}

const maskEmail = (email) => {
    if (!email || !email.includes('@')) return Boolean(email);
    const [name, domain] = email.split('@');
    return `${name.slice(0, 2)}***@${domain}`;
};

const getEmailOtpStatus = () => ({
    configured: Boolean(transporter),
    host: smtpConfig.host,
    port: smtpConfig.port,
    user: maskEmail(smtpConfig.user),
    from: smtpConfig.from ? smtpConfig.from.replace(smtpConfig.user || '', maskEmail(smtpConfig.user) || '') : undefined,
    missing: missingEmailConfig
});

// Twilio Client
let twilioClient;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

const sendEmailOtp = async (email, otp) => {
    if (!transporter) {
        console.error('[OTP_EMAIL] Cannot send OTP because email delivery is not configured.', {
            to: maskEmail(email),
            missing: missingEmailConfig
        });
        return false;
    }

    try {
        console.log('[OTP_EMAIL] Attempting to send real email...', {
            to: maskEmail(email),
            host: smtpConfig.host,
            port: smtpConfig.port
        });

        const info = await transporter.sendMail({
            from: smtpConfig.from || `"ViragKala" <${smtpConfig.user}>`,
            to: email,
            subject: 'Your Verification Code - ViragKala',
            text: `Your OTP verification code is: ${otp}. It will expire in 5 minutes.`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
                    <h2 style="color: #2d3748; text-align: center; margin-bottom: 24px;">Verify Your Account</h2>
                    <p>Hello,</p>
                    <p>Your one-time password (OTP) for ViragKala is:</p>
                    <div style="background-color: #f7fafc; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
                        <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #3182ce;">${otp}</span>
                    </div>
                    <p>This code is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
                    <p style="font-size: 12px; color: #a0aec0; text-align: center;">If you didn't request this code, you can safely ignore this email.</p>
                </div>
            `
        });

        console.log('[OTP_EMAIL] Email sent successfully!', { messageId: info.messageId });
        return true;
    } catch (error) {
        console.error('[OTP_EMAIL] CRITICAL ERROR: Connection failed', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack?.split('\n')[0]
        });
        
        return false;
    }
};

const sendSmsOtp = async (phone, otp) => {
    if (!twilioClient) {
        console.log(`[MOCK SMS OTP] To: ${phone} | Code: ${otp}`);
        return true;
    }

    try {
        const message = await twilioClient.messages.create({
            body: `Your ViragKala verification code is: ${otp}. It will expire in 5 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${phone.replace(/^\+91/, '')}`
        });
        console.log('SMS sent: %s', message.sid);
        return true;
    } catch (error) {
        console.error('Error sending SMS OTP:', error);
        return false;
    }
};

module.exports = {
    sendEmailOtp,
    sendSmsOtp,
    getEmailOtpStatus
};
