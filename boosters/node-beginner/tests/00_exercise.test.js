const request = require('supertest');
const app = require('../src/app');
const setup = require('./config/setup')('Users');
const teardown = require('./config/teardown');
const uuid = require('uuid/v4');

const users = [
  { firstName: 'Andrew', lastName: 'Mayer', id: uuid() },
  { firstName: 'Andrew', lastName: 'Mayer', id: uuid() },
];

describe('Get All Users', () => {
  beforeAll(setup(users));
  afterAll(teardown);
  it('should return all users', async () => {
    const res = await request(app).get('/users/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(users.length);
  });
});
