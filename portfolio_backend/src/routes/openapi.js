'use strict';

const express = require('express');
const swaggerSpec = require('../../swagger');

const router = express.Router();

// PUBLIC_INTERFACE
/**
 * Returns the OpenAPI JSON specification.
 */
router.get('/openapi.json', (req, res) => {
  // augment servers dynamically like docs
  const host = req.get('host');
  let protocol = req.protocol;
  const actualPort = req.socket.localPort;
  const hasPort = host.includes(':');
  const needsPort =
    !hasPort &&
    ((protocol === 'http' && actualPort !== 80) ||
      (protocol === 'https' && actualPort !== 443));
  const fullHost = needsPort ? `${host}:${actualPort}` : host;
  protocol = req.secure ? 'https' : protocol;

  const dynamicSpec = {
    ...swaggerSpec,
    servers: [{ url: `${protocol}://${fullHost}` }],
  };
  res.json(dynamicSpec);
});

module.exports = router;
