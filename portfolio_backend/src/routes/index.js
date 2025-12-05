const express = require('express');
const healthController = require('../controllers/health');
const aboutController = require('../controllers/about');
const projectsController = require('../controllers/projects');
const experienceController = require('../controllers/experience');
const contactController = require('../controllers/contact');

const router = express.Router();
// Health endpoint

/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Service health and diagnostics
 *   - name: About
 *     description: Portfolio about/profile information
 *   - name: Projects
 *     description: Portfolio projects
 *   - name: Experience
 *     description: Professional experience
 *   - name: Contact
 *     description: Contact messages
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Health]
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /about:
 *   get:
 *     tags: [About]
 *     summary: Get portfolio about/profile
 *     responses:
 *       200:
 *         description: Returns about data
 *   put:
 *     tags: [About]
 *     summary: Create or update about/profile (upsert)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Upserted about data
 */
router.get('/about', aboutController.get.bind(aboutController));
router.put('/about', aboutController.upsert.bind(aboutController));

/**
 * @swagger
 * /projects:
 *   get:
 *     tags: [Projects]
 *     summary: List projects
 *     parameters:
 *       - in: query
 *         name: featured
 *         schema:
 *           type: string
 *         description: Filter to only featured projects (featured=true)
 *     responses:
 *       200:
 *         description: Projects list
 *   post:
 *     tags: [Projects]
 *     summary: Create a project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created project
 * /projects/{id}:
 *   put:
 *     tags: [Projects]
 *     summary: Update a project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated project
 *   delete:
 *     tags: [Projects]
 *     summary: Delete a project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.get('/projects', projectsController.list.bind(projectsController));
router.post('/projects', projectsController.create.bind(projectsController));
router.put('/projects/:id', projectsController.update.bind(projectsController));
router.delete('/projects/:id', projectsController.remove.bind(projectsController));

/**
 * @swagger
 * /experience:
 *   get:
 *     tags: [Experience]
 *     summary: List experience entries
 *     responses:
 *       200:
 *         description: Experience list
 *   post:
 *     tags: [Experience]
 *     summary: Create an experience entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created experience
 * /experience/{id}:
 *   put:
 *     tags: [Experience]
 *     summary: Update an experience entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated experience
 *   delete:
 *     tags: [Experience]
 *     summary: Delete an experience entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
router.get('/experience', experienceController.list.bind(experienceController));
router.post('/experience', experienceController.create.bind(experienceController));
router.put('/experience/:id', experienceController.update.bind(experienceController));
router.delete('/experience/:id', experienceController.remove.bind(experienceController));

/**
 * @swagger
 * /contact:
 *   get:
 *     tags: [Contact]
 *     summary: List contact submissions
 *     responses:
 *       200:
 *         description: Contact submissions
 *   post:
 *     tags: [Contact]
 *     summary: Submit a contact message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created contact message
 */
router.get('/contact', contactController.list.bind(contactController));

// Simple validation middleware for contact submission
function validateContact(req, res, next) {
  /** Validate contact payload: name, email, message are required and email must be valid-ish */
  const { name, email, message } = req.body || {};
  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length === 0) errors.push('name is required');
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('email is required');
  } else {
    // rudimentary email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) errors.push('email is invalid');
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) errors.push('message is required');

  if (errors.length) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  return next();
}

/**
 * @swagger
 * /contact:
 *   get:
 *     tags: [Contact]
 *     summary: List contact submissions
 *     responses:
 *       200:
 *         description: Contact submissions
 *   post:
 *     tags: [Contact]
 *     summary: Submit a contact message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created contact message
 */
router.post('/contact', validateContact, contactController.submit.bind(contactController));

module.exports = router;
