const Mockup = require('../models/Mockup');

// @desc    Get all mockups
// @route   GET /api/mockups
// @access  Public
const getMockups = async (req, res) => {
    try {
        const mockups = await Mockup.find({});
        res.json({
            success: true,
            data: mockups
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Upload/Update a mockup
// @route   POST /api/mockups
// @access  Private/Admin
const uploadMockup = async (req, res) => {
    try {
        const { key: rawKey } = req.body;
        if (!rawKey) {
            return res.status(400).json({ success: false, message: 'Mockup key is required' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Mockup image is required' });
        }

        const key = rawKey.toLowerCase();
        const imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        // Parse key to get type, color, view
        const [type, color, view] = key.split('_');

        if (!type || !color || !['front', 'back'].includes(view)) {
            return res.status(400).json({ success: false, message: 'Mockup key must use type_color_front or type_color_back format' });
        }

        let mockup = await Mockup.findOne({ key });

        if (mockup) {
            mockup.imageUrl = imageUrl;
            mockup.imageMimeType = req.file.mimetype;
            mockup.imageSize = req.file.size;
            mockup.type = type;
            mockup.color = color;
            mockup.view = view;
            await mockup.save();
        } else {
            mockup = await Mockup.create({
                key,
                imageUrl,
                imageMimeType: req.file.mimetype,
                imageSize: req.file.size,
                type,
                color,
                view
            });
        }

        res.status(201).json({
            success: true,
            data: mockup
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete a mockup
// @route   DELETE /api/mockups/:key
// @access  Private/Admin
const deleteMockup = async (req, res) => {
    try {
        const mockup = await Mockup.findOne({ key: req.params.key.toLowerCase() });
        if (mockup) {
            await mockup.deleteOne();
            res.json({ success: true, message: 'Mockup removed' });
        } else {
            res.status(404).json({ success: false, message: 'Mockup not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getMockups,
    uploadMockup,
    deleteMockup
};
