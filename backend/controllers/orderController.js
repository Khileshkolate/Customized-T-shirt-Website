const Order = require('../models/Order');
const mongoose = require('mongoose');

const normalizeLocation = (location) => {
    if (!location) return undefined;

    const latitude = Number(location.latitude);
    const longitude = Number(location.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return undefined;
    }

    return {
        latitude,
        longitude,
        accuracy: Number.isFinite(Number(location.accuracy)) ? Number(location.accuracy) : undefined,
        capturedAt: location.capturedAt ? new Date(location.capturedAt) : new Date()
    };
};

const normalizeShippingAddress = (shippingAddress = {}) => ({
    firstName: shippingAddress.firstName,
    lastName: shippingAddress.lastName,
    address: shippingAddress.address || shippingAddress.street,
    city: shippingAddress.city,
    state: shippingAddress.state,
    postalCode: shippingAddress.postalCode || shippingAddress.zipCode,
    country: shippingAddress.country || 'India',
    phone: shippingAddress.phone,
    email: shippingAddress.email,
    location: normalizeLocation(shippingAddress.location)
});

const normalizeOrderItem = (item) => {
    const product = mongoose.Types.ObjectId.isValid(item.product) ? item.product : undefined;

    return {
        name: item.name,
        qty: item.qty || item.quantity,
        image: item.image,
        price: item.price,
        color: item.color,
        size: item.size,
        designId: item.designId,
        isCustom: item.isCustom || !product,
        product
    };
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentResult,
            isPaid,
            paidAt
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ success: false, message: 'No order items' });
        }

        const normalizedShippingAddress = normalizeShippingAddress(shippingAddress);
        if (!normalizedShippingAddress.address || !normalizedShippingAddress.city || !normalizedShippingAddress.postalCode) {
            return res.status(400).json({ success: false, message: 'Complete shipping address is required' });
        }

        const normalizedItems = orderItems.map(normalizeOrderItem);
        if (normalizedItems.some((item) => !item.name || !item.qty || !item.image || item.price === undefined)) {
            return res.status(400).json({ success: false, message: 'Order items are incomplete' });
        }

        const order = new Order({
            orderItems: normalizedItems,
            user: req.user._id,
            shippingAddress: normalizedShippingAddress,
            paymentMethod,
            paymentResult,
            isPaid: isPaid || false,
            paidAt: paidAt || null,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json({
            success: true,
            data: createdOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
            }

            res.json({
                success: true,
                data: order
            });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders
};
