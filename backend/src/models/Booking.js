const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Patient name is required'],
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
  // Allows multiple concerns/services to be selected
  services: {
    type: [String],
    default: []
  },
  visitType: {
    type: String,
    enum: ['Clinic Visit', 'Home Visit', 'Consultation', 'Not Specified'],
    default: 'Clinic Visit'
  },
  message: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  source: {
    type: String,
    default: 'booking-modal'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
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

module.exports = mongoose.model('Booking', bookingSchema);
