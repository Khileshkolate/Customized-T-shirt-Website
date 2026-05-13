const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    sendOtp,
    verifyOtp,
    forgotPassword,
    resetPassword,
    getOtpHealth
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.get('/otp-health', getOtpHealth);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;
