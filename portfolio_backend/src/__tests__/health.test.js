const request = require('supertest');
const app = require('../app');

describe('Health Endpoint', () => {
  it('GET / should return 200 OK with health JSON', async () => {
    const res = await request(app).get('/').expect(200);
    expect(res.body).toBeDefined();
    // Expect at least status or message field as per current implementation
    expect(typeof res.body.status === 'string' || typeof res.body.message === 'string').toBe(true);
    // Optionally, check known defaults
    if (res.body.status) {
      expect(res.body.status).toBe('ok');
    }
    if (res.body.message) {
      expect(res.body.message).toBe('Service is healthy');
    }
  });
});
