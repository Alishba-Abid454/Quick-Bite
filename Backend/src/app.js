//import dependencies
const express = require('express'); // 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { NODE_ENV, CORS_ORIGIN } = require('./config/env');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express app
const app = express();

//app.use	Adds middleware that runs on every request
// 1. Security Headers
app.use(helmet());

// 2. CORS Configuration
app.use(
  cors({ // backend or frontend if differ then still it runs
    origin: CORS_ORIGIN, // acess localhost/5173 from .env
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    //Which headers can be sent in requests
  })
);

// 3. Request Logging
if (NODE_ENV === 'development') { // need quick, readable logs for debugging
  app.use(morgan('dev')); // concise, clear
} else { //production
  app.use(morgan('combined')); // full detail
}

// 4. Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. Static Files (for uploaded images)
app.use('/uploads', express.static('uploads'));

// Test Route - To check if server is working
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    version: '1.0.0',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// 404 Not Found handler - MUST be last route
app.use(notFound);

// Global error handler - MUST be last middleware
app.use(errorHandler);

// ============ ERROR HANDLING ============
// Error handling middleware (will be added later)
// 404 Not Found handler

module.exports = app;