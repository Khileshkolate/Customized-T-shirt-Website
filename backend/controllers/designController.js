const Design = require('../models/Design');

// @desc    Create new design
// @route   POST /api/designs
// @access  Private
const createDesign = async (req, res) => {
    try {
        const { name, canvasData, thumbnail, color } = req.body;

        if (!canvasData) {
            return res.status(400).json({ success: false, message: 'No canvas data provided' });
        }

        const design = new Design({
            user: req.user._id,
            name: name || 'Untitled Design',
            canvasData,
            thumbnail,
            color
        });

        const createdDesign = await design.save();
        res.status(201).json({ success: true, data: createdDesign });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get logged in user designs
// @route   GET /api/designs
// @access  Private
const getMyDesigns = async (req, res) => {
    try {
        const designs = await Design.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, count: designs.length, data: designs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get design by ID
// @route   GET /api/designs/:id
// @access  Private
const getDesignById = async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);

        if (design) {
            // Check if user is owner
            if (design.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ success: false, message: 'Not authorized to view this design' });
            }
            res.json({ success: true, data: design });
        } else {
            res.status(404).json({ success: false, message: 'Design not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    createDesign,
    getMyDesigns,
    getDesignById
};
