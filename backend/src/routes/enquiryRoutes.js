const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries } = require('../controllers/enquiryController');
const { ipRateLimiter } = require('../middleware/rateLimiter');

router.post('/', ipRateLimiter(15, 900), createEnquiry);
router.get('/', getEnquiries);

module.exports = router;
