const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    getMockups,
    uploadMockup,
    deleteMockup
} = require('../controllers/mockupController');
const { protect, admin } = require('../middleware/auth');

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // MongoDB stores mockups as base64 data URLs.
    },
    fileFilter: (req, file, cb) => {
        if (!allowedImageTypes.has(file.mimetype)) {
            return cb(new Error('Only JPEG, PNG, and WebP images are allowed'));
        }
        cb(null, true);
    }
});

const uploadMockupImage = (req, res, next) => {
    upload.single('image')(req, res, (error) => {
        if (!error) {
            return next();
        }

        const message = error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE'
            ? 'Image must be 5MB or smaller'
            : error.message;

        return res.status(400).json({ success: false, message });
    });
};

router.route('/')
    .get(getMockups)
    .post(protect, admin, uploadMockupImage, uploadMockup);

router.delete('/:key', protect, admin, deleteMockup);

module.exports = router;
