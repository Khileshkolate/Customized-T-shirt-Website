const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getMockups,
    uploadMockup,
    deleteMockup
} = require('../controllers/mockupController');
const { protect, admin } = require('../middleware/auth');

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/mockups/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.route('/')
    .get(getMockups)
    .post(protect, admin, upload.single('image'), uploadMockup);

router.delete('/:key', protect, admin, deleteMockup);

module.exports = router;
