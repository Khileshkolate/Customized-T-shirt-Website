const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products || products.length === 0) throw new Error('No products found in DB');
    res.json(products);
  } catch (error) {
    console.error("Database connection error or empty. Returning fallback products:", error.message);
    res.json([
      {
        _id: '69bfc316ab9999b4a102cd0a',
        name: 'Premium Cotton T-Shirt',
        description: '100% premium cotton, comfortable fit for all-day wear. Perfect for custom prints. Designed to withstand multiple washes without losing its shape or vibrant color. Includes reinforced double stitching on all seams.',
        price: 599, discountPrice: 499, type: 't-shirt', category: '1', rating: 4.8, numReviews: 128, tags: ['Best Seller'],
        colors: ['#000000', '#FFFFFF', '#3B82F6', '#EF4444'], sizes: ['S', 'M', 'L', 'XL'], images: [{ url: '/images/tshirt.jpg' }, { url: '/images/tshirt-back.jpg' }]
      },
      {
        _id: '69bfc316ab9999b4a102cd0b',
        name: 'Custom Printed Ceramic Mug',
        description: 'High-quality ceramic mug with vibrant print that lasts.',
        price: 299, type: 'mug', category: '2', rating: 4.5, numReviews: 56, tags: ['Personalized'],
        colors: ['#FFFFFF', '#000000'], sizes: ['11oz', '15oz'], images: [{ url: '/images/mug.jpg' }]
      },
      {
        _id: '69bfc316ab9999b4a102cd0c',
        name: 'Premium Zip-up Hoodie',
        description: 'Winter-ready premium hoodie with custom embroidery.',
        price: 899, type: 'hoodie', category: '5', rating: 4.9, numReviews: 204, tags: ['Premium', 'Limited'],
        colors: ['#000000', '#1E40AF', '#7C2D12'], sizes: ['S', 'M', 'L', 'XL'], images: [{ url: '/images/hoodie.jpg' }]
      },
      {
        _id: '69bfc316ab9999b4a102cd0d',
        name: 'Custom Embroidered Cap',
        description: 'Adjustable snapback cap with custom embroidery.',
        price: 349, type: 'cap', category: '6', rating: 4.4, numReviews: 45, tags: ['Summer Essential'],
        colors: ['#000000', '#FFFFFF', '#DC2626'], sizes: ['One Size'], images: [{ url: '/images/cap.jpg' }]
      }
    ]);
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      throw new Error('Product not found in DB');
    }
  } catch (error) {
    console.error("Returning fallback product:", error.message);
    res.json({
        _id: req.params.id,
        name: 'Premium Cotton T-Shirt',
        description: '100% premium cotton, comfortable fit for all-day wear. Perfect for custom prints. Designed to withstand multiple washes without losing its shape or vibrant color. Includes reinforced double stitching on all seams.',
        price: 599, discountPrice: 499, type: 't-shirt', category: '1', rating: 4.8, numReviews: 128, tags: ['Best Seller'],
        colors: ['#000000', '#FFFFFF', '#3B82F6', '#EF4444'], sizes: ['S', 'M', 'L', 'XL'], images: [{ url: '/images/tshirt.jpg' }, { url: '/images/tshirt-back.jpg' }]
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
