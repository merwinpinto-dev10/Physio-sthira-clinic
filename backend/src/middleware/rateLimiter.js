const redisClient = require('../config/redis');
const crypto = require('crypto');

const hashValue = (val) => {
  return crypto.createHash('sha256').update(String(val)).digest('hex').substring(0, 16);
};

const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() ||
         req.socket?.remoteAddress ||
         req.ip ||
         '127.0.0.1';
};

const ipRateLimiter = (maxRequests = 20, windowSecs = 900) => {
  return async (req, res, next) => {
    try {
      const ip = getClientIP(req);
      req.clientIP = ip;
      const key = `ratelimit:ip:${hashValue(ip)}`;

      const current = await redisClient.incr(key);
      if (current === 1) {
        await redisClient.expire(key, windowSecs);
      }

      if (current > maxRequests) {
        return res.status(429).json({
          success: false,
          error: 'Too many requests from your IP. Please try again later.',
          retryAfterSeconds: windowSecs
        });
      }
      next();
    } catch (err) {
      // Fail open so users aren't blocked on Redis errors
      next();
    }
  };
};

const checkPhoneRateLimit = async (phone, maxPerHour = 5) => {
  try {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const key = `ratelimit:phone:${hashValue(cleanPhone)}`;
    const current = await redisClient.incr(key);
    if (current === 1) {
      await redisClient.expire(key, 3600); // 1 hour window
    }
    return current <= maxPerHour;
  } catch (err) {
    return true; // Fail open
  }
};

module.exports = {
  ipRateLimiter,
  checkPhoneRateLimit,
  getClientIP
};
