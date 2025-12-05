'use strict';

const { Schema, model } = require('mongoose');

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // null/undefined means present
    location: { type: String },
    responsibilities: [{ type: String }],
    skills: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = model('Experience', ExperienceSchema);
