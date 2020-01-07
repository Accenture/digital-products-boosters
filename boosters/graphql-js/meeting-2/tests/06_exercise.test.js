const setup = require('./config/setup');
const teardown = require('./config/teardown');

const userData = {
  bio: 'world famous salt chef undercover as a web developer',
  firstName: 'Richard',
  lastName: 'Chen',
  pictureUrl: 'https://loremflickr.com/300/300',
  username: 'trickyricky',
};

const repositoryData = {
  name: 'elixir',
  userId: null,
};

describe('exercise 06', () => {
  let values;
  beforeEach(async () => (values = await setup('06')));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    const user = await db.user.create(userData);
    repositoryData.userId = user.id;
    const repository = await db.repository.create(repositoryData);
    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables: { id: repository.id },
    });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      repository: {
        id: repository.id,
        name: repository.name,
      },
    });
  });
});
