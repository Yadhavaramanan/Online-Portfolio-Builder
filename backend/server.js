const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolioRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - ORDER IS CRUCIAL!
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolios', portfolioRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Log registered routes
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Registered Route: ${Object.keys(middleware.route.methods).join(", ").toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`Registered Route: ${Object.keys(handler.route.methods).join(", ").toUpperCase()} /api${middleware.regexp.source.replace('^\\/?', '').replace('(?=\\/|$)', '')}${handler.route.path}`);
      }
    });
  }
});

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Default route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available Routes:');
  console.log('POST /api/auth/signup');
  console.log('POST /api/auth/signin');
});