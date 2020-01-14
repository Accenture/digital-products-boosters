const setup = require('./config/setup');
const teardown = require('./config/teardown');
const createCollaborationsAndUsers = require('./config/createCollaborationsAndUsers');

const repositoryData = {
  name: 'elixir',
  userId: 'b9d78ac5-db65-44f7-9df6-ed464b71e077',
};

const collaboratorsData = [
  {
    firstName: 'Richard',
    lastName: 'Chen',
    username: 'trickyricky',
  },
  {
    firstName: 'Maggie',
    lastName: 'Casey',
    username: 'margarita',
  },
];

describe('exercise 00', () => {
  let values;
  beforeEach(async () => (values = await setup('00')));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    const repository = await db.repository.create(repositoryData);
    const { collaborations } = await createCollaborationsAndUsers({
      collaboratorsData,
      db,
      repositoryId: repository.id,
    });

    const variables = { id: repository.id };
    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    expect(response.errors).toBe(undefined);
    expect(response.data.repository.id).toBe(repository.id);

    const { collaboratorsConnection } = response.data.repository;
    expect(collaboratorsConnection).toBeDefined();
    expect(collaboratorsConnection.edges).toBeDefined();
    expect(collaboratorsConnection.edges).toBeInstanceOf(Array);
    const { edges } = collaboratorsConnection;

    expect(edges.length).toBe(collaborations.length);
    expect(edges).toContainEqual({
      joinedAt: collaborations[0].joinedAt.toISOString(),
    });
    expect(edges).toContainEqual({
      joinedAt: collaborations[1].joinedAt.toISOString(),
    });
  });
});
