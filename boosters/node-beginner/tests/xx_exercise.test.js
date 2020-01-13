const request = require('supertest');
const app = require('../src/app');
const createDB = require('./config/setup').createDB;
const setup = require('./config/setup').seedDB('user');

describe('test', () => {
  beforeAll(async () => {
    return createDB();
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
