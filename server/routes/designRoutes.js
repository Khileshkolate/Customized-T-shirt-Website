const express = require('express');
const router = express.Router();
const { createDesign, getMyDesigns, getDesignById } = require('../controllers/designController');
const { protect } = require('../middleware/auth');

router.route('/')
    .post(protect, createDesign)
    .get(protect, getMyDesigns);

router.route('/:id')
    .get(protect, getDesignById);

module.exports = router;
