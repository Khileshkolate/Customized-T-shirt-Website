const ShirtAttribute = require('../models/ShirtAttribute');

// @desc    Get all attributes
// @route   GET /api/attributes
// @access  Public
const getAttributes = async (req, res) => {
    try {
        const type = req.query.type;
        const query = type ? { type } : {};
        const attributes = await ShirtAttribute.find(query).sort({ createdAt: 1 });
        res.json({ success: true, count: attributes.length, data: attributes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add new attribute
// @route   POST /api/attributes
// @access  Private/Admin
const addAttribute = async (req, res) => {
    try {
        const { name, value, type, meta } = req.body;

        const attributeExists = await ShirtAttribute.findOne({ value, type });

        if (attributeExists) {
            return res.status(400).json({ success: false, message: 'Attribute already exists' });
        }

        const attribute = await ShirtAttribute.create({
            name,
            value,
            type,
            meta
        });

        res.status(201).json({ success: true, data: attribute });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete attribute
// @route   DELETE /api/attributes/:id
// @access  Private/Admin
const deleteAttribute = async (req, res) => {
    try {
        const attribute = await ShirtAttribute.findById(req.params.id);

        if (!attribute) {
            return res.status(404).json({ success: false, message: 'Attribute not found' });
        }

        await attribute.deleteOne();

        res.json({ success: true, message: 'Attribute removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getAttributes,
    addAttribute,
    deleteAttribute
};
