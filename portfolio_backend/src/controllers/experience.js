'use strict';

const Experience = require('../models/Experience');

class ExperienceController {
  // PUBLIC_INTERFACE
  /**
   * List all experiences (most recent first).
   */
  async list(req, res, next) {
    try {
      const docs = await Experience.find().sort({ startDate: -1 }).lean();
      return res.status(200).json({ data: docs });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new experience entry.
   */
  async create(req, res, next) {
    try {
      const doc = await Experience.create(req.body);
      return res.status(201).json({ data: doc });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Update an experience entry.
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const doc = await Experience.findByIdAndUpdate(id, req.body, { new: true });
      if (!doc) return res.status(404).json({ message: 'Experience not found' });
      return res.status(200).json({ data: doc });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Delete an experience entry.
   */
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const doc = await Experience.findByIdAndDelete(id);
      if (!doc) return res.status(404).json({ message: 'Experience not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ExperienceController();
