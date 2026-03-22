const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Mockup = require('./models/Mockup');

// Load env vars
dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/custom_printing_db');
        console.log('✅ MongoDB Connected for Seeding');

        // Create the collections explicitly (optional in Mongo, but good for visibility)
        await User.createCollection();
        await Mockup.createCollection();
        console.log('✅ Collections initialized');

        const adminEmail = 'admin@printcraft.com';
        
        // Remove existing admin if any
        await User.deleteMany({ email: adminEmail });

        // Create the admin user
        const adminUser = new User({
            name: 'System Admin',
            email: adminEmail,
            password: 'password123', // Will be hashed by pre-save middleware
            phone: '9999999999',
            role: 'admin',
            isVerified: true
        });

        await adminUser.save();
        console.log('✅ Admin user seeded successfully!');
        console.log('⚠️  Email: admin@printcraft.com');
        console.log('⚠️  Password: password123');

        process.exit();
    } catch (error) {
        console.error('❌ Error with seeding:', error);
        process.exit(1);
    }
};

seedAdmin();
