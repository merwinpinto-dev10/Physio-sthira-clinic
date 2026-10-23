const { v4: uuidv4 } = require('uuid');

const generateReference = (prefix = 'PS') => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const dateStr = formatter.format(now).replace(/-/g, '');
  const suffix = uuidv4().substring(0, 4).toUpperCase();
  return `${prefix}-${dateStr}-${suffix}`;
};

module.exports = {
  generateReference
};
