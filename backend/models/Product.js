const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    discountPrice: {
        type: Number
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
    type: {
        type: String,
        required: [true, 'Please add a product type (e.g., t-shirt, mug)']
    },
    images: [{
        url: String,
        publicId: String
    }],
    colors: [String],
    sizes: [String],
    countInStock: {
        type: Number,
        required: [true, 'Please add count in stock'],
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    tags: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
