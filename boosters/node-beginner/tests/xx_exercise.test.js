const request = require('supertest');
const app = require('../src/app');
const setup = require('./config/setup')();

describe('test', () => {
  beforeAll(() => {
    return setup();
  });
  it('should', async () => {
    const res = await request(app)
      .post('/users/')
      .send({
        name: 'Andrew',
        lastName: 'Mayer',
      });
    expect(res.statusCode).toEqual(201);
  });
});
