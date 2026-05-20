const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    console.error('Missing required environment variables: MONGO_URI and JWT_SECRET must be set.');
    process.exit(1);
}

const app = express();

// Middleware
const allowedOrigins = (process.env.CLIENT_URL || process.env.CORS_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const isAllowedOrigin = (origin) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return true;
    }

    try {
        const { hostname, protocol } = new URL(origin);
        const isHttps = protocol === 'https:';
        const isVercelDomain = hostname.endsWith('.vercel.app');
        const isProjectDeployment = hostname.includes('customizedtshirtwebsite')
            || hostname.includes('customized-t-shirt-website');

        return isHttps && isVercelDomain && isProjectDeployment;
    } catch (error) {
        return false;
    }
};

app.use(cors({
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        console.warn(`Blocked by CORS. Origin: ${origin || 'unknown'}`);
        return callback(new Error('Not allowed by CORS'));
    }
}));
app.use(express.json({ limit: '10mb' }));

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Main Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/adminRoutes'));
app.use('/api/designs', require('./routes/designRoutes'));
app.use('/api/mockups', require('./routes/mockupRoutes'));
app.use('/api/attributes', require('./routes/attributeRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Root endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
};

startServer();

