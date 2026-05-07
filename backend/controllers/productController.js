const Product = require('../models/Product');
const mongoose = require('mongoose');

const normalizeProductPayload = (body) => {
    const countInStock = body.countInStock ?? body.stock;

    return {
        name: body.name,
        description: body.description,
        price: body.price,
        discountPrice: body.discountPrice,
        category: body.category,
        type: body.type,
        images: body.images,
        colors: body.colors,
        sizes: body.sizes,
        countInStock,
        tags: body.tags
    };
};

const compactDefined = (payload) => {
    return Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value !== undefined)
    );
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { category, type, q, search } = req.query;
        const query = {};
        const searchTerm = q || search;

        if (category) {
            query.category = category;
        }

        if (type) {
            query.type = type;
        }

        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { tags: { $regex: searchTerm, $options: 'i' } }
            ];
        }

        const products = await Product.find(query);
        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get available product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json({
            success: true,
            data: categories.filter(Boolean)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Search products
// @route   GET /api/products/search?q=...
// @access  Public
const searchProducts = async (req, res) => {
    try {
        const searchTerm = req.query.q || '';
        const products = searchTerm
            ? await Product.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                    { tags: { $regex: searchTerm, $options: 'i' } }
                ]
            })
            : [];

        res.json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const product = await Product.findById(req.params.id);
        if (product) {
            res.json({
                success: true,
                data: product
            });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const productData = compactDefined(normalizeProductPayload(req.body));
        const product = new Product(productData);

        const createdProduct = await product.save();
        res.status(201).json({
            success: true,
            data: createdProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const updates = compactDefined(normalizeProductPayload(req.body));
            Object.assign(product, updates);

            const updatedProduct = await product.save();
            res.json({
                success: true,
                data: updatedProduct
            });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ success: true, message: 'Product removed' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getCategories,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
