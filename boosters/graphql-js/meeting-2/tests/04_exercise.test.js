const setup = require('./config/setup');
const teardown = require('./config/teardown');

const userData = {
  bio: 'world famous salt chef undercover as a web developer',
  firstName: 'Richard',
  lastName: 'Chen',
  pictureUrl: 'https://loremflickr.com/300/300',
  username: 'trickyricky',
};

describe('exercise 04', () => {
  let values;
  beforeEach(async () => (values = await setup('04')));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    const user = await db.user.create(userData);
    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables: { id: user.id },
    });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      user: {
        id: user.id,
        firstName: user.firstName,
      },
    });
  });
});
