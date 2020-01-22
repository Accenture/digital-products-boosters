const setup = require('./config/setup');
const teardown = require('./config/teardown');

const userData = [
  {
    bio: 'world famous salt chef undercover as a web developer',
    firstName: 'Richard',
    lastName: 'Chen',
    pictureUrl: 'https://loremflickr.com/300/300',
    username: 'trickyricky',
  },
  {
    bio: 'desarrolladora de web',
    firstName: 'Maggie',
    lastName: 'Casey',
    pictureUrl: null,
    username: 'maggs',
  },
  {
    bio: null,
    firstName: 'Mark',
    lastName: 'Fletcher',
    pictureUrl: 'https://loremflickr.com/300/300',
    username: 'markymark',
  },
];

describe('exercise 03', () => {
  let values;
  beforeEach(async () => (values = await setup('03')));
  afterEach(teardown);

  xit('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    await db.user.bulkCreate(userData);
    const users = await db.user.findAll();
    const response = await testClient.query({ query: EXERCISE_QUERY });

    expect(response.errors).toBe(undefined);
    expect(response.data.users.length).toBe(users.length);

    response.data.users.forEach(dataUser => {
      const user = users.find(user => user.id === dataUser.id);
      expect(user.bio).toBe(dataUser.bio);
      expect(user.firstName).toBe(dataUser.firstName);
      expect(user.lastName).toBe(dataUser.lastName);
      expect(user.pictureUrl).toBe(dataUser.pictureUrl);
      expect(user.username).toBe(dataUser.username);
    });
  });
});
