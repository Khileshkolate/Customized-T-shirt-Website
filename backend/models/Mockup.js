const mongoose = require('mongoose');

const mockupSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true // e.g., Round Neck_White_front
    },
    imageUrl: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    view: {
        type: String,
        required: true,
        enum: ['front', 'back']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Mockup', mockupSchema);
