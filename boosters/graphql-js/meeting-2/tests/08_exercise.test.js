const setup = require('./config/setup');
const teardown = require('./config/teardown');

const userData = {
  bio: 'world famous salt chef undercover as a web developer',
  firstName: 'Richard',
  lastName: 'Chen',
  pictureUrl: 'https://loremflickr.com/300/300',
  username: 'trickyricky',
};

describe('exercise 08', () => {
  let values;
  beforeEach(async () => (values = await setup('08')));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables: { input: userData },
    });

    expect(response.errors).toBe(undefined);
    const [user] = await db.user.findAll();

    expect(response.data).toEqual({
      createUser: {
        user: {
          bio: user.bio,
          firstName: user.firstName,
          id: user.id,
          lastName: user.lastName,
          pictureUrl: user.pictureUrl,
          username: user.username,
        },
      },
    });

    expect(user.bio).toEqual(userData.bio);
    expect(user.firstName).toEqual(userData.firstName);
    expect(user.lastName).toEqual(userData.lastName);
    expect(user.pictureUrl).toEqual(userData.pictureUrl);
    expect(user.username).toEqual(userData.username);
  });
});
