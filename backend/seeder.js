const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const sampleProducts = [
  {
    name: 'Premium Cotton T-Shirt',
    description: '100% premium cotton, comfortable fit for all-day wear. Perfect for custom prints. Designed to withstand multiple washes without losing its shape or vibrant color. Includes reinforced double stitching on all seams.',
    price: 599,
    discountPrice: 499,
    type: 't-shirt',
    category: '1',
    rating: 4.8,
    numReviews: 128,
    tags: ['Best Seller', 'Trending'],
    colors: ['#000000', '#FFFFFF', '#3B82F6', '#EF4444'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [{ url: '/images/tshirt.jpg' }, { url: '/images/tshirt-back.jpg' }],
    countInStock: 50,
  },
  {
    name: 'Custom Printed Ceramic Mug',
    description: 'High-quality ceramic mug with vibrant print that lasts. Microwave and dishwasher safe.',
    price: 299,
    type: 'mug',
    category: '2',
    rating: 4.5,
    numReviews: 56,
    tags: ['Personalized'],
    colors: ['#FFFFFF', '#000000', '#F59E0B'],
    sizes: ['11oz', '15oz'],
    images: [{ url: '/images/mug.jpg' }],
    countInStock: 200,
  },
  {
    name: 'Premium Wooden Photo Frame',
    description: 'Elegant wooden frame with glass protection. Perfect for preserving memories.',
    price: 399,
    discountPrice: 349,
    type: 'frame',
    category: '3',
    rating: 4.7,
    numReviews: 89,
    tags: ['New Arrival'],
    colors: ['#92400E', '#1F2937', '#374151'],
    sizes: ['5x7', '8x10', '11x14'],
    images: [{ url: '/images/frame.jpg' }],
    countInStock: 30,
  },
  {
    name: 'Premium Zip-up Hoodie',
    description: 'Winter-ready premium hoodie with custom embroidery. Fleece lined for warmth.',
    price: 899,
    type: 'hoodie',
    category: '5',
    rating: 4.9,
    numReviews: 204,
    tags: ['Premium', 'Limited'],
    colors: ['#000000', '#1E40AF', '#7C2D12'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [{ url: '/images/hoodie.jpg' }],
    countInStock: 15,
  },
  {
    name: 'Round Neck T-Shirt Pack',
    description: 'Pack of 3 basic round neck t-shirts. Great value for daily wear and customization.',
    price: 999,
    discountPrice: 799,
    type: 't-shirt',
    category: '1',
    rating: 4.3,
    numReviews: 67,
    tags: ['Bundle Deal'],
    colors: ['#000000', '#FFFFFF', '#6B7280'],
    sizes: ['S', 'M', 'L'],
    images: [{ url: '/images/tshirt2.jpg' }],
    countInStock: 25,
  },
  {
    name: 'Insulated Travel Mug',
    description: 'Double-walled insulated travel mug keeps drinks hot/cold for hours.',
    price: 549,
    discountPrice: 499,
    type: 'mug',
    category: '2',
    rating: 4.6,
    numReviews: 142,
    tags: ['Insulated'],
    colors: ['#1E40AF', '#374151', '#D1D5DB'],
    sizes: ['16oz', '20oz'],
    images: [{ url: '/images/travel-mug.jpg' }],
    countInStock: 100,
  },
  {
    name: 'Custom Embroidered Cap',
    description: 'Adjustable snapback cap with custom embroidery. UV protection fabric.',
    price: 349,
    type: 'cap',
    category: '6',
    rating: 4.4,
    numReviews: 45,
    tags: ['Summer Essential'],
    colors: ['#000000', '#FFFFFF', '#DC2626', '#F59E0B'],
    sizes: ['One Size'],
    images: [{ url: '/images/cap.jpg' }],
    countInStock: 80,
  },
  {
    name: 'Premium Poster Print',
    description: 'High-quality matte finish poster with vibrant colors. Perfect for wall decor.',
    price: 199,
    discountPrice: 149,
    type: 'poster',
    category: '8',
    rating: 4.8,
    numReviews: 93,
    tags: ['Wall Art'],
    colors: ['All Colors'],
    sizes: ['A3', 'A2', '24x36'],
    images: [{ url: '/images/poster.jpg' }],
    countInStock: 500,
  }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/custom_printing_db');
        console.log('MongoDB Connected For Seeding');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clear existing products

    // Fetch the admin user to attach the products to
    const adminUser = await User.findOne({ email: 'admin@printcraft.com' }) || await User.findOne({});
    
    if (!adminUser) {
        console.log("No user found in DB. Please run seedAdmin.js first to create an admin user.");
        process.exit(1);
    }

    const productsWithUser = sampleProducts.map((p) => {
      return { ...p, user: adminUser._id };
    });

    await Product.insertMany(productsWithUser);

    console.log('✅ Default Products Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing products: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroy data logic if needed
  console.log('Data destroyed');
  process.exit();
} else {
  importData();
}
