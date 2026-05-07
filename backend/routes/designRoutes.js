const express = require('express');
const router = express.Router();
const {
    getDesigns,
    getMyDesigns,
    createDesign,
    getDesignById,
    updateDesign,
    deleteDesign
} = require('../controllers/designController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .get(protect, admin, getDesigns)
    .post(protect, createDesign);

router.get('/my', protect, getMyDesigns);
router.route('/:id')
    .get(protect, getDesignById)
    .put(protect, updateDesign)
    .delete(protect, deleteDesign);

module.exports = router;
