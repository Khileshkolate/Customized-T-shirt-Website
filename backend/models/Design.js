const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        default: 'Untitled Design'
    },
    type: {
        type: String,
        required: true,
        enum: ['t-shirt', 'mug', 'hoodie', 'frame', 'template'],
        default: 't-shirt'
    },
    canvasData: {
        type: Object,
        required: true
    },
    elements: {
        type: Array,
        default: []
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    previewImage: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Design', designSchema);
