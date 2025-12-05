'use strict';

const { Schema, model } = require('mongoose');

const AboutSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    summary: { type: String, required: true },
    avatarUrl: { type: String },
    location: { type: String },
    socials: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      website: { type: String },
    },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = model('About', AboutSchema);
