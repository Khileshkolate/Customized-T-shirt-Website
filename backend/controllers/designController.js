const Design = require('../models/Design');

// @desc    Get all designs
// @route   GET /api/designs
// @access  Private/Admin
const getDesigns = async (req, res) => {
    try {
        const designs = await Design.find({}).populate('user', 'name email');
        res.json({
            success: true,
            data: designs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get user designs
// @route   GET /api/designs/my
// @access  Private
const getMyDesigns = async (req, res) => {
    try {
        const designs = await Design.find({ user: req.user._id });
        res.json({
            success: true,
            data: designs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a design
// @route   POST /api/designs
// @access  Private
const createDesign = async (req, res) => {
    try {
        const { name, type, canvasData, elements, isPublic, previewImage } = req.body;
        const design = await Design.create({
            user: req.user._id,
            name,
            type,
            canvasData,
            elements,
            isPublic,
            previewImage
        });
        res.status(201).json({
            success: true,
            data: design
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete a design
// @route   DELETE /api/designs/:id
// @access  Private
const deleteDesign = async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (design) {
            // Check ownership unless admin
            if (design.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ success: false, message: 'Not authorized' });
            }
            await design.deleteOne();
            res.json({ success: true, message: 'Design removed' });
        } else {
            res.status(404).json({ success: false, message: 'Design not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getDesigns,
    getMyDesigns,
    createDesign,
    deleteDesign
};
