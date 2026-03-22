const mongoose = require('mongoose');

const mockupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: { // e.g., 'tshirt', 'hoodie'
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    views: {
        front: { type: String, required: true },
        back: { type: String },
        left: { type: String },
        right: { type: String }
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Mockup = mongoose.model('Mockup', mockupSchema);

module.exports = Mockup;
