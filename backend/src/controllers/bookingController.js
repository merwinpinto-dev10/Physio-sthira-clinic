const Booking = require('../models/Booking');
const { generateReference } = require('../utils/reference');
const { formatBookingMessage, sendWhatsAppNotification } = require('../utils/whatsapp');
const { checkPhoneRateLimit, getClientIP } = require('../middleware/rateLimiter');

// Simple phone format verification (allows +91, 10 digits, etc.)
const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

// Simple email verification
const isValidEmail = (email) => {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const createBooking = async (req, res, next) => {
  try {
    const { name, phone, email, service, services, visitType, message, source, website } = req.body;

    // Honeypot check for bots
    if (website && String(website).trim() !== '') {
      return res.status(200).json({
        success: true,
        reference: 'PS-PROCESSED',
        message: 'Appointment request received.'
      });
    }

    // Input validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your full name.'
      });
    }

    if (!phone || !isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid contact phone number (at least 10 digits).'
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    // Phone rate limit check
    const isAllowed = await checkPhoneRateLimit(phone);
    if (!isAllowed) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests for this phone number. Please wait an hour or contact the clinic directly.'
      });
    }

    // Normalize services array (handles multiple selected concerns from Requirement 1!)
    let servicesList = [];
    if (Array.isArray(services) && services.length > 0) {
      servicesList = services.map(s => String(s).trim()).filter(Boolean);
    } else if (service && typeof service === 'string') {
      servicesList = [service.trim()];
    } else {
      servicesList = ['General Assessment'];
    }

    const reference = generateReference('PS');
    const clientIP = getClientIP(req);

    // Save to MongoDB
    let newBooking = null;
    try {
      newBooking = await Booking.create({
        reference,
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim().toLowerCase() : undefined,
        services: servicesList,
        visitType: visitType || 'Clinic Visit',
        message: message ? message.trim() : '',
        source: source || 'booking-modal',
        clientIP,
        status: 'pending'
      });
    } catch (dbErr) {
      console.warn('⚠️ MongoDB save warning (proceeding with WhatsApp notification):', dbErr.message);
    }

    // Format & dispatch Twilio WhatsApp message
    const formattedMessage = formatBookingMessage({
      reference,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      services: servicesList,
      visitType: visitType || 'Clinic Visit',
      message: message ? message.trim() : ''
    });

    const twilioResult = await sendWhatsAppNotification(formattedMessage, reference);

    // Update DB with Twilio status if DB record exists
    if (newBooking) {
      try {
        newBooking.twilioStatus = twilioResult.success ? (twilioResult.isDryRun ? 'dry_run' : 'sent') : 'failed';
        newBooking.twilioMessageSid = twilioResult.messageSid;
        await newBooking.save();
      } catch (err) {
        // Non-critical
      }
    }

    return res.status(201).json({
      success: true,
      reference,
      message: 'Appointment request received. We will contact you shortly to confirm your booking.',
      data: {
        reference,
        name: name.trim(),
        services: servicesList,
        visitType: visitType || 'Clinic Visit',
        isDryRun: twilioResult.isDryRun
      }
    });

  } catch (err) {
    next(err);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
};

const getBookingByReference = async (req, res, next) => {
  try {
    const { reference } = req.params;
    const booking = await Booking.findOne({ reference });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking reference not found.'
      });
    }
    res.json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingByReference
};
