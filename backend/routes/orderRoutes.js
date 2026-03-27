const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);

module.exports = router;
