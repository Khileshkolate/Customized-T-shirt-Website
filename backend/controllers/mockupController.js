const Mockup = require('../models/Mockup');
const path = require('path');
const fs = require('fs');

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
        const { key } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const imageUrl = `/uploads/mockups/${req.file.filename}`;
        
        // Parse key to get type, color, view
        const [type, color, view] = key.split('_');

        let mockup = await Mockup.findOne({ key });

        if (mockup) {
            // Delete old file if exists
            const oldPath = path.join(__dirname, '..', mockup.imageUrl);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            mockup.imageUrl = imageUrl;
            await mockup.save();
        } else {
            mockup = await Mockup.create({
                key,
                imageUrl,
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
        const mockup = await Mockup.findOne({ key: req.params.key });
        if (mockup) {
            const filePath = path.join(__dirname, '..', mockup.imageUrl);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
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
