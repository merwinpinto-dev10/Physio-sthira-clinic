const mongoose = require('mongoose');
const { isTwilioConfigured } = require('../config/twilio');
const redisClient = require('../config/redis');

const getHealthStatus = (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'ok',
    service: 'physiosthira-express-backend',
    database: {
      status: dbStatusMap[dbState] || 'unknown',
      connected: dbState === 1
    },
    redis: {
      configured: redisClient.isConfigured(),
      connected: redisClient.isConnected(),
      mode: redisClient.isConnected() ? 'upstash_rest' : 'in_memory_fallback'
    },
    twilio: {
      configured: isTwilioConfigured(),
      dryRun: process.env.TWILIO_DRY_RUN !== 'false'
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getHealthStatus
};
