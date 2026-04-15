const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ShirtAttribute = require('./models/ShirtAttribute');

dotenv.config();

const types = [
  { name: 'Round Neck', value: 'Round Neck', type: 'shirt-type', meta: { icon: '👕' } },
  { name: 'Polo', value: 'Polo', type: 'shirt-type', meta: { icon: '🎽' } },
  { name: 'Hoodie', value: 'Hoodie', type: 'shirt-type', meta: { icon: '🧥' } },
];

const colors = [
  { name: 'White', value: 'White', type: 'color', meta: { hex: '#ffffff' } },
  { name: 'Off White', value: 'Off White', type: 'color', meta: { hex: '#f8fafc' } },
  { name: 'Black', value: 'Black', type: 'color', meta: { hex: '#0f172a' } },
  { name: 'Navy', value: 'Navy', type: 'color', meta: { hex: '#1e3a8a' } },
  { name: 'Charcoal', value: 'Charcoal', type: 'color', meta: { hex: '#334155' } },
  { name: 'Red', value: 'Red', type: 'color', meta: { hex: '#dc2626' } },
  { name: 'Green', value: 'Green', type: 'color', meta: { hex: '#16a34a' } },
  { name: 'Yellow', value: 'Yellow', type: 'color', meta: { hex: '#eab308' } },
  { name: 'Blue', value: 'Blue', type: 'color', meta: { hex: '#2563eb' } }
];

const seedAttributes = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/custom_printing_db');
        console.log('✅ MongoDB Connected for Seeding');

        // Clear existing attributes to avoid duplicates if re-running
        await ShirtAttribute.deleteMany({});
        console.log('🗑️  Existing attributes cleared');

        await ShirtAttribute.insertMany([...types, ...colors]);
        console.log('🌱 Attributes seeded successfully');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding attributes:', error);
        process.exit(1);
    }
};

seedAttributes();
