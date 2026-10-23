const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getBookingByReference } = require('../controllers/bookingController');
const { ipRateLimiter } = require('../middleware/rateLimiter');

// Rate limit POST /api/bookings: max 15 requests per 15 minutes per IP
router.post('/', ipRateLimiter(15, 900), createBooking);
router.get('/', getBookings);
router.get('/:reference', getBookingByReference);

module.exports = router;
