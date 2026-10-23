const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: 100
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    maxlength: 25
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 254
  },
  service: {
    type: String,
    trim: true,
    default: 'General Enquiry'
  },
  message: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  source: {
    type: String,
    default: 'contact-form'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'resolved'],
    default: 'new'
  },
  twilioStatus: {
    type: String,
    default: 'not_sent'
  },
  twilioMessageSid: {
    type: String
  },
  clientIP: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
