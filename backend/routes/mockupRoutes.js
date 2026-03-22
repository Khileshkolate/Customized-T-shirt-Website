const express = require('express');
const router = express.Router();
const { 
    createMockup, 
    getMockups, 
    deleteMockup, 
    uploadMockupImages 
} = require('../controllers/mockupController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .get(getMockups)
    .post(protect, admin, uploadMockupImages, createMockup);

router.route('/:id')
    .delete(protect, admin, deleteMockup);

module.exports = router;
