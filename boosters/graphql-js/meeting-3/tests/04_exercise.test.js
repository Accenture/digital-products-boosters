const setup = require('./config/setup');
const teardown = require('./config/teardown');

const currentUserData = {
  bio: 'world famous salt chef undercover as a web developer',
  firstName: 'Richard',
  lastName: 'Chen',
  pictureUrl: 'https://loremflickr.com/300/300',
  username: 'trickyricky',
};

const repositoryData1 = {
  name: 'elixir',
  userId: '991c3645-fe47-439f-9bfa-f858ec5a9c66',
};

const repositoryData2 = {
  name: 'ember',
  userId: 'b9d78ac5-db65-44f7-9df6-ed464b71e077',
};

describe('exercise 04 - gen method on Repository class', () => {
  let values;
  beforeEach(async () => (values = await setup()));
  afterAll(teardown);

  it('should efficiently load repositories via batching', async () => {
    const { db } = values;
    const currentUser = await db.user.create(currentUserData);
    const repository1 = await db.repository.create(repositoryData1);
    const repository2 = await db.repository.create(repositoryData2);
    const originalFindAll = db.repository.findAll.bind(db.repository);
    const originalFindOne = db.repository.findOne.bind(db.repository);
    const mockFindAll = jest.fn(originalFindAll);
    const mockFindOne = jest.fn(originalFindOne);
    db.repository.findAll = mockFindAll;
    db.repository.findOne = mockFindOne;

    const result1 = db.repository.gen(repository1.id, currentUser);
    const result2 = db.repository.gen(repository2.id, currentUser);

    const results = await Promise.all([result1, result2]);

    expect(mockFindOne).not.toHaveBeenCalled();
    expect(mockFindAll).toHaveBeenCalledTimes(1);

    expect(results[0].id).toEqual(repository1.id);
    expect(results[0].name).toEqual(repository1.name);
    expect(results[0].userId).toEqual(repository1.userId);

    expect(results[1].id).toEqual(repository2.id);
    expect(results[1].name).toEqual(repository2.name);
    expect(results[1].userId).toEqual(repository2.userId);
  });
});
