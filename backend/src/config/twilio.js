const twilio = require('twilio');

let client = null;

const getTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    return null;
  }

  if (!client) {
    client = twilio(accountSid, authToken);
  }
  return client;
};

const isTwilioConfigured = () => {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_WHATSAPP_FROM &&
    process.env.BOOKING_NOTIFICATION_WHATSAPP
  );
};

module.exports = {
  getTwilioClient,
  isTwilioConfigured
};
