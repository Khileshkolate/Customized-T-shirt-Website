const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Transporter for Email
let transporter;
if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000
    });
}

// Twilio Client
let twilioClient;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

const sendEmailOtp = async (email, otp) => {
    if (!transporter) {
        console.log(`[MOCK EMAIL OTP] To: ${email} | Code: ${otp}`);
        return true;
    }

    try {
        const info = await transporter.sendMail({
            from: `"ViragKala Authentication" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your Login OTP Code',
            text: `Your OTP verification code is: ${otp}. It will expire in 5 minutes.`,
            html: `<p>Your OTP verification code is: <b>${otp}</b></p><p>It will expire in 5 minutes.</p>`
        });
        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email OTP:', error);
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
            to: `+91${phone.replace(/^\+91/, '')}` // Format to e.164 if needed
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
    sendSmsOtp
};
