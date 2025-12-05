'use strict';

const About = require('../models/About');

class AboutController {
  // PUBLIC_INTERFACE
  /**
   * Get the about profile (single document). If multiple, returns the latest.
   */
  async get(req, res, next) {
    try {
      const doc = await About.findOne().sort({ updatedAt: -1 }).lean();
      return res.status(200).json({ data: doc || null });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Create or update the about document (upsert).
   */
  async upsert(req, res, next) {
    try {
      const payload = req.body || {};
      const doc = await About.findOneAndUpdate({}, payload, { upsert: true, new: true, setDefaultsOnInsert: true });
      return res.status(200).json({ data: doc });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AboutController();
