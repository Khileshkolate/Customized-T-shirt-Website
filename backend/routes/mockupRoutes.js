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

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/mockups/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const baseName = path.basename(file.originalname, ext)
            .replace(/[^a-z0-9_-]/gi, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 80) || 'mockup';

        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${baseName}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
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
