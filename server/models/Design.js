const mongoose = require('mongoose');

const designSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
            default: 'Untitled Design'
        },
        canvasData: {
            type: Object, // Fabric.js JSON representation
            required: true
        },
        thumbnail: {
            type: String, // Allow saving a base64 preview or a Cloudinary URL later
        },
        color: {
            type: String,
            default: '#ffffff' // Base shirt color
        }
    },
    {
        timestamps: true,
    }
);

const Design = mongoose.model('Design', designSchema);

module.exports = Design;
