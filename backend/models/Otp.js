const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const otpSchema = new mongoose.Schema({
    contact: {
        type: String,
        required: true,
        index: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    lastSentAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// TTL Index: Deletes the document 0 seconds after the expiresAt date is reached.
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Pre-save hook to hash OTP
otpSchema.pre('save', async function() {
    if (!this.isModified('otp')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
});

// Method to verify OTP
otpSchema.methods.matchOtp = async function(enteredOtp) {
    return await bcrypt.compare(enteredOtp, this.otp);
};

module.exports = mongoose.model('Otp', otpSchema);
