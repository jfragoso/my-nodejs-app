const request = require('supertest');
const app = require('../server');

describe('GET /', () => {
  it('should return Hello, Jenkins CI/CD!', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello, Jenkins CI/CD!');
  });
});
