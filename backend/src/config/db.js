const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.warn('⚠️ MONGODB_URI is not set in environment variables. Database operations will be skipped.');
      return;
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB successfully.');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

module.exports = connectDB;
