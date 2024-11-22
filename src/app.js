const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling cookies
app.use(cookieParser());

// CORS Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://resonant-paprenjak-6ede1f.netlify.app', // Use CLIENT_URL from .env or default URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies
}));

// Echo route for testing
app.get('/echo', (req, res) => {
    res.send('Echo route working!');
});

// Routes
app.use(authRoute);
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

// Error handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ errMsg: 'Route not found' });
});

// General error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    const { status = 500, message = 'Internal server error' } = err;
    res.status(status).json({ errMsg: message });
});

module.exports = app;
