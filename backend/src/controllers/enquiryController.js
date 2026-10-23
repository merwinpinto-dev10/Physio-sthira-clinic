const Enquiry = require('../models/Enquiry');
const { generateReference } = require('../utils/reference');
const { formatEnquiryMessage, sendWhatsAppNotification } = require('../utils/whatsapp');
const { checkPhoneRateLimit, getClientIP } = require('../middleware/rateLimiter');

const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

const isValidEmail = (email) => {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, email, service, message, source, website } = req.body;

    // Honeypot check
    if (website && String(website).trim() !== '') {
      return res.status(200).json({
        success: true,
        reference: 'ENQ-PROCESSED',
        message: 'Enquiry received.'
      });
    }

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

    const isAllowed = await checkPhoneRateLimit(phone);
    if (!isAllowed) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests for this phone number. Please try again later or call the clinic.'
      });
    }

    const reference = generateReference('ENQ');
    const clientIP = getClientIP(req);

    // Save to MongoDB
    let newEnquiry = null;
    try {
      newEnquiry = await Enquiry.create({
        reference,
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim().toLowerCase() : undefined,
        service: service || 'General Enquiry',
        message: message ? message.trim() : '',
        source: source || 'contact-form',
        clientIP,
        status: 'new'
      });
    } catch (dbErr) {
      console.warn('⚠️ MongoDB save warning (proceeding with WhatsApp notification):', dbErr.message);
    }

    // Format & dispatch Twilio WhatsApp message
    const formattedMessage = formatEnquiryMessage({
      reference,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      service: service || 'General Enquiry',
      message: message ? message.trim() : ''
    });

    const twilioResult = await sendWhatsAppNotification(formattedMessage, reference);

    if (newEnquiry) {
      try {
        newEnquiry.twilioStatus = twilioResult.success ? (twilioResult.isDryRun ? 'dry_run' : 'sent') : 'failed';
        newEnquiry.twilioMessageSid = twilioResult.messageSid;
        await newEnquiry.save();
      } catch (err) {
        // Non-critical
      }
    }

    return res.status(201).json({
      success: true,
      reference,
      message: 'Enquiry received. We will get back to you shortly.',
      data: {
        reference,
        name: name.trim(),
        service: service || 'General Enquiry',
        isDryRun: twilioResult.isDryRun
      }
    });

  } catch (err) {
    next(err);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries
};
