const mongoose = require('mongoose');

const shirtAttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    value: { // Unique identifier, e.g., 'round-neck', 'polo', 'red'
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['shirt-type', 'color'],
        required: true
    },
    meta: {
        type: mongoose.Schema.Types.Mixed,
        // For color it will contain { hex: '#ffffff' }
        // For shirt-type it will contain { icon: '👕' }
    }
}, {
    timestamps: true
});

const ShirtAttribute = mongoose.model('ShirtAttribute', shirtAttributeSchema);

module.exports = ShirtAttribute;
