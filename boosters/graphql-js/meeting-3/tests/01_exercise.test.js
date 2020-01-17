const setup = require('./config/setup');
const teardown = require('./config/teardown');

const currentUserData = {
  bio: 'world famous salt chef undercover as a web developer',
  firstName: 'Richard',
  lastName: 'Chen',
  pictureUrl: 'https://loremflickr.com/300/300',
  username: 'trickyricky',
};

describe('exercise 01', () => {
  let values;
  beforeEach(async () => (values = await setup('01', currentUserData)));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { currentUser, EXERCISE_QUERY, testClient } = values;
    const response = await testClient.query({ query: EXERCISE_QUERY });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      currentUser: {
        firstName: currentUserData.firstName,
        id: currentUser.id,
      },
    });
  });
});
