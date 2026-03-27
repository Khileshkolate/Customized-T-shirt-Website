const express = require('express');
const router = express.Router();
const {
    getDesigns,
    getMyDesigns,
    createDesign,
    deleteDesign
} = require('../controllers/designController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .get(protect, admin, getDesigns)
    .post(protect, createDesign);

router.get('/my', protect, getMyDesigns);
router.delete('/:id', protect, deleteDesign);

module.exports = router;
