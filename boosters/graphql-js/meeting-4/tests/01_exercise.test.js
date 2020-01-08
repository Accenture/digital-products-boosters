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

describe('exercise 01', () => {
  let values;
  beforeEach(async () => (values = await setup('01')));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    const repository = await db.repository.create(repositoryData);
    const { users } = await createCollaborationsAndUsers({
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

    const nodes = response.data.repository.collaboratorsConnection.edges.map(
      edge => edge.node,
    );

    expect(nodes.length).toBe(users.length);
    expect(nodes).toContainEqual({ id: users[0].id });
    expect(nodes).toContainEqual({ id: users[1].id });
  });
});
