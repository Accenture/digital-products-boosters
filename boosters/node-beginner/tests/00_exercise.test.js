const request = require('supertest');
const app = require('../src/app');
const setup = require('./config/setup')('user');

describe('Get All Users', () => {
  beforeAll(() => {
    return setup([
      { firstName: 'Andrew', lastName: 'Mayer' },
      { firstName: 'Andrew', lastName: 'Mayer' },
    ]);
  });
  it('should return all users', async () => {
    const res = await request(app).get('/users/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });
});
