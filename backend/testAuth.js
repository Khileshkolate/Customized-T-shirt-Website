const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB...');

        const email = 'admin@viragkala.com';
        const password = 'password123';

        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            console.log('❌ User NOT found in DB');
            process.exit(1);
        }

        console.log('✅ User found:', user.email);
        console.log('Hashed Password in DB:', user.password);

        const isMatch = await user.matchPassword(password);
        console.log('Password Match Result:', isMatch);

        if (isMatch) {
            console.log('🚀 AUTH SUCCESSFUL IN TEST SCRIPT');
        } else {
            console.log('❌ AUTH FAILED IN TEST SCRIPT');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

test();
