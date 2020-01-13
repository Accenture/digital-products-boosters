const request = require('supertest');
const app = require('../src/app');
const createDB = require('./config/setup').createDB;
const setup = require('./config/setup').seedDB('user');

describe('test', () => {
  beforeAll(async () => {
    await createDB();
    return setup([
      { firstName: 'Andrew', lastName: 'Mayer' },
      { firstName: 'Andrew', lastName: 'Mayer' },
    ]);
  });
  it('should return user profile given speicifc userId', async () => {
    [res1, res2] = await Promise.all([
      request(app).get('/users/1'),
      request(app).get('/users/2'),
    ]);

    expect(res1.statusCode).toEqual(200);
    expect(res1.body.firstName).toEqual('Andrew');
    expect(res1.body.lastName).toEqual('Mayer');

    expect(res2.statusCode).toEqual(200);
    expect(res2.body.firstName).toEqual('Andrew');
    expect(res2.body.lastName).toEqual('Mayer');
  });
});
