const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'Portfolio backend API for about, projects, experience, and contact.',
    },
    servers: [
      { url: 'http://localhost:3001' },
    ],
    tags: [
      { name: 'Health', description: 'Service health and diagnostics' },
      { name: 'About', description: 'Portfolio about/profile information' },
      { name: 'Projects', description: 'Portfolio projects' },
      { name: 'Experience', description: 'Professional experience' },
      { name: 'Contact', description: 'Contact messages' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
