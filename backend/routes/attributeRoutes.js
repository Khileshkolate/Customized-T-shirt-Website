const express = require('express');
const router = express.Router();
const { 
    getAttributes, 
    addAttribute, 
    deleteAttribute 
} = require('../controllers/attributeController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .get(getAttributes)
    .post(protect, admin, addAttribute);

router.route('/:id')
    .delete(protect, admin, deleteAttribute);

module.exports = router;
