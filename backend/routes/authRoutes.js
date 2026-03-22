const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// Future implementation
router.post('/verify-otp', (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.post('/send-otp', (req, res) => res.status(501).json({ message: 'Not implemented yet' }));

module.exports = router;
