const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getCategories,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.get('/categories', getCategories);
router.get('/search', searchProducts);

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
