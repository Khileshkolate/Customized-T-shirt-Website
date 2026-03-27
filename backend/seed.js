const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();

        // Create Admin
        await User.create({
            name: 'System Admin',
            email: 'admin@viragkala.com',
            password: 'password123',
            phone: '9999999999',
            role: 'admin',
            isVerified: true
        });
        console.log('✅ Admin user created: admin@viragkala.com / password123');

        // Create Sample Products
        const products = [
            {
                name: 'Premium Cotton T-Shirt',
                description: '100% premium cotton, comfortable fit for all-day wear.',
                price: 599,
                discountPrice: 499,
                category: 'T-Shirts',
                type: 't-shirt',
                countInStock: 50,
                rating: 4.8,
                numReviews: 12,
                colors: ['Black', 'White', 'Blue'],
                sizes: ['S', 'M', 'L', 'XL']
            }
        ];

        await Product.insertMany(products);
        console.log('✅ Sample products created');

        console.log('Seeding complete! Closing connection...');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
