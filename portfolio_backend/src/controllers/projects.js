'use strict';

const Project = require('../models/Project');

class ProjectsController {
  // PUBLIC_INTERFACE
  /**
   * List projects with optional filters and sorting.
   */
  async list(req, res, next) {
    try {
      const { featured, q } = req.query;
      const filter = {};
      if (featured === 'true') filter.featured = true;
      if (q) filter.$text = { $search: q };

      const docs = await Project.find(filter).sort({ order: 1, createdAt: -1 }).lean();
      return res.status(200).json({ data: docs });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Create a new project.
   */
  async create(req, res, next) {
    try {
      const doc = await Project.create(req.body);
      return res.status(201).json({ data: doc });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Update a project by id.
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const doc = await Project.findByIdAndUpdate(id, req.body, { new: true });
      if (!doc) return res.status(404).json({ message: 'Project not found' });
      return res.status(200).json({ data: doc });
    } catch (err) {
      next(err);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a project by id.
   */
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const doc = await Project.findByIdAndDelete(id);
      if (!doc) return res.status(404).json({ message: 'Project not found' });
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProjectsController();
