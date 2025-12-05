'use strict';

const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String, index: true }],
    repoUrl: { type: String },
    liveUrl: { type: String },
    thumbnailUrl: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Project', ProjectSchema);
