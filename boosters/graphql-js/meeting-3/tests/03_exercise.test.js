const setup = require('./config/setup');
const teardown = require('./config/teardown');

const currentUserData = {
  bio: 'world famous salt chef undercover as a web developer',
  firstName: 'Richard',
  lastName: 'Chen',
  pictureUrl: 'https://loremflickr.com/300/300',
  username: 'trickyricky',
};

const otherUserData = {
  bio: 'loves to give warm fuzzies',
  firstName: 'Kristina',
  lastName: 'Durr',
  pictureUrl: 'https://loremflickr.com/300/300',
  username: 'alwaysbeworkingevenduringquarterly',
};

const randomRepositoryData = {
  name: 'ember',
  userId: 'b9d78ac5-db65-44f7-9df6-ed464b71e077',
};

const repositoryData = {
  name: 'elixir',
  userId: null,
};

describe('exercise 03', () => {
  let values;
  beforeEach(async () => (values = await setup('03', currentUserData)));
  afterAll(teardown);

  it('should return response with repository if id is for public repository', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    await db.repository.create(randomRepositoryData);
    const otherUser = await db.user.create(otherUserData);
    repositoryData.userId = otherUser.id;
    const repository = await db.repository.create(repositoryData);

    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables: { id: repository.id },
    });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      repository: {
        name: repository.name,
      },
    });
  });

  it('should return response with repository if id is for private repository owned by user', async () => {
    const { currentUser, db, EXERCISE_QUERY, testClient } = values;
    await db.repository.create(randomRepositoryData);
    repositoryData.isPrivate = true;
    repositoryData.userId = currentUser.id;
    const repository = await db.repository.create(repositoryData);

    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables: { id: repository.id },
    });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      repository: {
        name: repository.name,
      },
    });
  });

  it('should return response with null if id is for private repository not owned by user', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    await db.repository.create(randomRepositoryData);
    const otherUser = await db.user.create(otherUserData);
    repositoryData.isPrivate = true;
    repositoryData.userId = otherUser.id;
    const repository = await db.repository.create(repositoryData);

    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables: { id: repository.id },
    });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      repository: null,
    });
  });
});
