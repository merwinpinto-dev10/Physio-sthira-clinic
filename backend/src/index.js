'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');
const redisClient = require('./config/redis');
const bookingRoutes = require('./routes/bookingRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Trust proxy for rate-limiting client IP
app.set('trust proxy', 1);

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Request Logger
app.use(morgan('dev'));

// CORS Configuration - Requirement 6: Configured origins + exactly ONE localhost origin
const rawOrigins = process.env.ALLOWED_ORIGINS || 'https://www.physiosthira.in,https://physiosthira.in';
const configuredOrigins = rawOrigins
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// Exactly ONE localhost origin for local frontend testing
const LOCAL_DEV_ORIGIN = 'http://localhost:5173';

const allowedOriginsList = Array.from(new Set([...configuredOrigins, LOCAL_DEV_ORIGIN]));

console.log('🔒 CORS Allowed Origins:', allowedOriginsList);

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser requests (like curl, mobile apps, or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOriginsList.includes(origin)) {
      return callback(null, true);
    }

    const msg = `CORS error: Origin ${origin} not allowed by Access-Control-Allow-Origin`;
    console.warn(`[CORS REJECTED] ${origin}`);
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-idempotency-key']
}));

// Body Parsers
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Mount API Routes
app.use('/api/health', healthRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Aliases for compatibility
app.use('/api/booking', bookingRoutes);
app.use('/api/contact', enquiryRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'PhysioSthira Clinic API is running.',
    documentation: {
      health: 'GET /api/health',
      bookings: 'POST /api/bookings',
      enquiries: 'POST /api/enquiries'
    }
  });
});

// 404 Route Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Centralized Error Handling
app.use(errorHandler);

// Connect databases and start server
const PORT = parseInt(process.env.PORT || '5001', 10);

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Connect to Upstash Redis
  await redisClient.connect();

  const server = app.listen(PORT, () => {
    console.log(`\n========================================================`);
    console.log(`🚀 PhysioSthira Express Server running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`💬 Twilio Dry-Run: ${process.env.TWILIO_DRY_RUN !== 'false' ? 'ENABLED (Safe)' : 'LIVE'}`);
    console.log(`📱 WhatsApp Recipient: ${process.env.BOOKING_NOTIFICATION_WHATSAPP || 'Not configured'}`);
    console.log(`========================================================\n`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log('\nGracefully terminating PhysioSthira server...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer();

module.exports = app;
