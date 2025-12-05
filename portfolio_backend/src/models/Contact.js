'use strict';

const { Schema, model } = require('mongoose');

const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = model('Contact', ContactSchema);
