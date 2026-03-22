const Mockup = require('../models/Mockup');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'mockups');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/mockups/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpg|jpeg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Images only!');
        }
    }
});

// We expect files to come with field names like 'front', 'back', 'left', 'right'
const uploadMockupImages = upload.fields([
    { name: 'front', maxCount: 1 },
    { name: 'back', maxCount: 1 },
    { name: 'left', maxCount: 1 },
    { name: 'right', maxCount: 1 }
]);

// @desc    Create or update mockup
// @route   POST /api/mockups
// @access  Private/Admin
const createMockup = async (req, res) => {
    try {
        const { name, type, color, isAvailable } = req.body;
        
        // Find existing mockup by type and color
        let mockup = await Mockup.findOne({ type, color });

        const newViews = {};
        
        ['front', 'back', 'left', 'right'].forEach(view => {
            if (req.files && req.files[view]) {
                // Generate URL accessible path
                newViews[view] = `/uploads/mockups/${req.files[view][0].filename}`;
            }
        });

        if (mockup) {
            // Update existing mockup
            mockup.views = { ...mockup.views, ...newViews };
            
            // Delete old files that were replaced (optional cleanup could go here, omitting for simplicity to avoid breaking active previews)
            
            if (name) mockup.name = name;
            if (isAvailable !== undefined) mockup.isAvailable = isAvailable;
            
            await mockup.save();
            return res.status(200).json({ success: true, data: mockup });
        } else {
            // Ensure at least a front view exists for new
            if (!req.files || (!req.files['front'] && !req.files['back'])) {
                 return res.status(400).json({ success: false, message: 'Image view is required' });
            }

            // Create new mockup
            mockup = new Mockup({
                name: name || `${type} ${color}`,
                type,
                color,
                views: newViews,
                isAvailable: isAvailable !== undefined ? isAvailable : true
            });

            const createdMockup = await mockup.save();
            return res.status(201).json({ success: true, data: createdMockup });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Get all mockups
// @route   GET /api/mockups
// @access  Public (or Private depending on needs, assume public for frontend use)
const getMockups = async (req, res) => {
    try {
        const query = {};
        if (req.query.type) query.type = req.query.type;
        if (req.query.color) query.color = req.query.color;
        
        // By default only return available mockups unless admin
        if (!req.user || req.user.role !== 'admin') {
            query.isAvailable = true;
        }

        const mockups = await Mockup.find(query).sort({ createdAt: -1 });
        res.json({ success: true, count: mockups.length, data: mockups });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete a mockup
// @route   DELETE /api/mockups/:id
// @access  Private/Admin
const deleteMockup = async (req, res) => {
    try {
        const mockup = await Mockup.findById(req.params.id);

        if (!mockup) {
            return res.status(404).json({ success: false, message: 'Mockup not found' });
        }

        // Delete associated files
        Object.values(mockup.views).forEach(filePath => {
            const absolutePath = path.join(__dirname, '..', filePath);
            if (fs.existsSync(absolutePath)) {
                fs.unlinkSync(absolutePath);
            }
        });

        await Mockup.deleteOne({ _id: req.params.id });
        res.json({ success: true, message: 'Mockup removed' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    uploadMockupImages,
    createMockup,
    getMockups,
    deleteMockup
};
