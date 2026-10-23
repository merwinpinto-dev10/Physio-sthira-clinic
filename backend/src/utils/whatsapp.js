const { getTwilioClient, isTwilioConfigured } = require('../config/twilio');
const { v4: uuidv4 } = require('uuid');

/**
 * Format timestamp in Asia/Kolkata timezone
 */
const formatTimestamp = () => {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date());
};

/**
 * Format appointment booking WhatsApp message
 */
const formatBookingMessage = (booking) => {
  const serviceList = Array.isArray(booking.services) && booking.services.length > 0
    ? booking.services.join(', ')
    : (booking.service || 'General Assessment');

  let text = `📋 *NEW APPOINTMENT REQUEST*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `🔖 *Reference:* ${booking.reference}\n`;
  text += `👤 *Patient Name:* ${booking.name}\n`;
  text += `📞 *Phone:* ${booking.phone}\n`;
  text += `✉️ *Email:* ${booking.email || 'Not provided'}\n`;
  text += `🩺 *Concern(s) / Service:* ${serviceList}\n`;
  text += `🏥 *Visit Type:* ${booking.visitType || 'Clinic Visit'}\n`;
  if (booking.message && booking.message.trim()) {
    text += `💬 *Notes:* ${booking.message.trim()}\n`;
  }
  text += `⏰ *Submitted:* ${formatTimestamp()} (IST)\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `_PhysioSthira Clinic Notification System_`;

  return text;
};

/**
 * Format contact enquiry WhatsApp message
 */
const formatEnquiryMessage = (enquiry) => {
  let text = `✉️ *NEW CLINIC ENQUIRY*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `🔖 *Reference:* ${enquiry.reference}\n`;
  text += `👤 *Name:* ${enquiry.name}\n`;
  text += `📞 *Phone:* ${enquiry.phone}\n`;
  text += `✉️ *Email:* ${enquiry.email || 'Not provided'}\n`;
  text += `🩺 *Interest / Service:* ${enquiry.service || 'General Enquiry'}\n`;
  if (enquiry.message && enquiry.message.trim()) {
    text += `💬 *Message:* ${enquiry.message.trim()}\n`;
  }
  text += `⏰ *Submitted:* ${formatTimestamp()} (IST)\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `_PhysioSthira Clinic Notification System_`;

  return text;
};

/**
 * Send WhatsApp notification using Twilio
 * @param {string} messageBody - Formatted message
 * @param {string} reference - Tracking reference
 * @returns {Promise<{ success: boolean, messageSid: string, error?: string, isDryRun: boolean }>}
 */
const sendWhatsAppNotification = async (messageBody, reference) => {
  const isDryRun = process.env.TWILIO_DRY_RUN !== 'false' || !isTwilioConfigured();
  const recipient = process.env.BOOKING_NOTIFICATION_WHATSAPP || 'whatsapp:+919187310374';
  const sender = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';

  if (isDryRun) {
    console.log('\n================== [TWILIO WHATSAPP DRY-RUN] ==================');
    console.log(`To:        ${recipient}`);
    console.log(`From:      ${sender}`);
    console.log(`Reference: ${reference}`);
    console.log('------------------ [MESSAGE CONTENT] ------------------');
    console.log(messageBody);
    console.log('================================================================\n');

    return {
      success: true,
      messageSid: `DRY_RUN_${uuidv4()}`,
      reference,
      isDryRun: true
    };
  }

  try {
    const client = getTwilioClient();
    if (!client) {
      throw new Error('Twilio client is not initialized');
    }

    const messageParams = {
      to: recipient,
      from: sender
    };

    // Use Content Template if configured, otherwise send formatted body
    if (process.env.TWILIO_WHATSAPP_CONTENT_SID) {
      messageParams.contentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID;
    } else {
      messageParams.body = messageBody;
    }

    const response = await client.messages.create(messageParams);

    console.log(`✅ [TWILIO] WhatsApp message sent! SID: ${response.sid}, Ref: ${reference}`);

    return {
      success: true,
      messageSid: response.sid,
      reference,
      isDryRun: false
    };
  } catch (error) {
    console.error(`❌ [TWILIO ERROR] Ref: ${reference} -`, error.message);
    return {
      success: false,
      messageSid: null,
      error: error.message,
      reference,
      isDryRun: false
    };
  }
};

module.exports = {
  formatBookingMessage,
  formatEnquiryMessage,
  sendWhatsAppNotification
};
