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

describe('exercise 02 - gen method on Repository class', () => {
  let values;
  beforeEach(async () => (values = await setup()));
  afterAll(teardown);

  xit('should return repository if id is for public repository', async () => {
    const { db } = values;
    await db.repository.create(randomRepositoryData);
    const currentUser = await db.user.create(currentUserData);
    const otherUser = await db.user.create(otherUserData);
    repositoryData.userId = otherUser.id;
    const repository = await db.repository.create(repositoryData);

    const result = await db.repository.gen(repository.id, currentUser);

    expect(result.id).toEqual(repository.id);
    expect(result.name).toEqual(repository.name);
    expect(result.userId).toEqual(repository.userId);
  });

  xit('should return repository if id is for private repository owned by user', async () => {
    const { db } = values;
    await db.repository.create(randomRepositoryData);
    const currentUser = await db.user.create(currentUserData);
    repositoryData.isPrivate = true;
    repositoryData.userId = currentUser.id;
    const repository = await db.repository.create(repositoryData);

    const result = await db.repository.gen(repository.id, currentUser);

    expect(result.id).toEqual(repository.id);
    expect(result.name).toEqual(repository.name);
    expect(result.userId).toEqual(repository.userId);
  });

  xit('should return null if id is for private repository not owned by user', async () => {
    const { db } = values;
    await db.repository.create(randomRepositoryData);
    const currentUser = await db.user.create(currentUserData);
    const otherUser = await db.user.create(otherUserData);
    repositoryData.isPrivate = true;
    repositoryData.userId = otherUser.id;
    const repository = await db.repository.create(repositoryData);

    const result = await db.repository.gen(repository.id, currentUser);

    expect(result).toBe(null);
  });
});
