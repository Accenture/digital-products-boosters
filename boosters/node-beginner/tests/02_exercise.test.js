const request = require('supertest');
const app = require('../src/app');
const createDB = require('./config/setup').createDB;
const userSetup = require('./config/setup').seedDB('user');
const repoSetup = require('./config/setup').seedDB('repo');

describe('test', () => {
  beforeAll(async () => {
    await createDB();
    const test = await userSetup([
      { firstName: 'Andrew', lastName: 'Mayer' },
      { firstName: 'Andrew', lastName: 'Mayer' },
    ]);
    return Promise.all([
      repoSetup([{ name: 'adf', userId: 1, isPrivate: false }]),
      repoSetup([{ name: 'adf', userId: 2, isPrivate: false }]),
    ]);
  });
  it('should return all repos of a given userId', async () => {
    res = await request(app).get('/users/1/repos');
    expect(res.statusCode).toEqual(200);
  });
});
