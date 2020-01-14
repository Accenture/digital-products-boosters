const request = require('supertest');
const app = require('../src/app');
const teardown = require('./config/teardown');
const uuid = require('uuid/v4');

const user = {
  firstName: 'Andrew',
  lastName: 'Mayer',
  id: uuid(),
};
describe('test', () => {
  afterAll(teardown);

  it('should', async () => {
    const res = await request(app)
      .post('/users/')
      .send(user);
    expect(res.statusCode).toEqual(201);
  });
});
