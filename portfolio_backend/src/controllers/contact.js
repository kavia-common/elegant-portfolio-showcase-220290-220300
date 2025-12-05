'use strict';

const Contact = require('../models/Contact');

class ContactController {
  // PUBLIC_INTERFACE
  /**
   * Submit a contact message.
   */
  async submit(req, res, next) {
    try {
      const doc = await Contact.create(req.body);
      return res.status(201).json({ data: doc });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * List contact messages (admin usage).
   */
  async list(req, res, next) {
    try {
      const docs = await Contact.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json({ data: docs });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ContactController();
