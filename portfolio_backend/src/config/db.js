'use strict';

const mongoose = require('mongoose');

/**
 * Connect to MongoDB using Mongoose.
 * Reads connection info from environment variables:
 * - MONGODB_URL: the full MongoDB connection string (preferred)
 * - MONGODB_HOST, MONGODB_PORT, MONGODB_DB, MONGODB_USER, MONGODB_PASSWORD as fallback
 */
async function connectMongo() {
  // PUBLIC_INTERFACE
  /**
   * Establishes a Mongoose connection to MongoDB.
   * Returns the active mongoose connection.
   */
  const {
    MONGODB_URL,
    MONGODB_HOST = 'localhost',
    MONGODB_PORT = '27017',
    MONGODB_DB = 'portfolio',
    MONGODB_USER,
    MONGODB_PASSWORD,
  } = process.env;

  let uri = MONGODB_URL;
  if (!uri) {
    // Build URI from parts if full URL is not provided
    const auth =
      MONGODB_USER && MONGODB_PASSWORD ? `${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(MONGODB_PASSWORD)}@` : '';
    uri = `mongodb://${auth}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;
  }

  // Recommended Mongoose options (v8 uses Node driver defaults)
  mongoose.set('strictQuery', true);

  // Avoid creating multiple connections in dev with hot-reload
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  await mongoose.connect(uri, {
    // Add appName to help DB monitoring
    appName: 'portfolio-backend',
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  return mongoose.connection;
}

module.exports = {
  connectMongo,
};
