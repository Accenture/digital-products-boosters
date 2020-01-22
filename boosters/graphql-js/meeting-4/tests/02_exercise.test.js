const setup = require('./config/setup');
const teardown = require('./config/teardown');
const createCollaborationsAndUsers = require('./config/createCollaborationsAndUsers');
const { base64Encode } = require('../services');

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
    firstName: 'Danjin',
    lastName: 'Sun',
    username: 'yarnskrt4life',
  },
  {
    firstName: 'Maggie',
    lastName: 'Casey',
    username: 'margarita',
  },
];

xdescribe('exercise 02', () => {
  let values;
  beforeEach(async () => (values = await setup('02')));
  afterAll(teardown);

  it('should return the expected response', async () => {
    const orderBy = {
      field: 'COLLABORATOR_JOINED_AT',
      direction: 'ASC',
    };

    const { db, EXERCISE_QUERY, testClient } = values;
    const repository = await db.repository.create(repositoryData);
    const { collaborations, users } = await createCollaborationsAndUsers({
      collaboratorsData,
      db,
      repositoryId: repository.id,
    });

    const variables = { id: repository.id, orderBy };
    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    expect(response.errors).toBe(undefined);
    const { edges } = response.data.repository.collaboratorsConnection;

    const nodes = edges.map(edge => edge.node);
    expect(nodes).toEqual([
      { id: users[0].id },
      { id: users[1].id },
      { id: users[2].id },
    ]);

    const cursors = edges.map(edge => edge.cursor);
    expect(cursors).toEqual([
      base64Encode(collaborations[0].createdAt.toISOString()),
      base64Encode(collaborations[1].createdAt.toISOString()),
      base64Encode(collaborations[2].createdAt.toISOString()),
    ]);
  });

  it('should return the expected response', async () => {
    const orderBy = {
      field: 'COLLABORATOR_JOINED_AT',
      direction: 'DESC',
    };

    const { db, EXERCISE_QUERY, testClient } = values;
    const repository = await db.repository.create(repositoryData);
    const { collaborations, users } = await createCollaborationsAndUsers({
      collaboratorsData,
      db,
      repositoryId: repository.id,
    });

    const variables = { id: repository.id, orderBy };
    const response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    expect(response.errors).toBe(undefined);
    const { edges } = response.data.repository.collaboratorsConnection;

    const nodes = edges.map(edge => edge.node);
    expect(nodes).toEqual([
      { id: users[2].id },
      { id: users[1].id },
      { id: users[0].id },
    ]);

    const cursors = edges.map(edge => edge.cursor);
    expect(cursors).toEqual([
      base64Encode(collaborations[2].createdAt.toISOString()),
      base64Encode(collaborations[1].createdAt.toISOString()),
      base64Encode(collaborations[0].createdAt.toISOString()),
    ]);
  });
});
