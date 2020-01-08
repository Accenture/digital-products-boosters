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
  {
    firstName: 'Nate',
    lastName: 'Goodman',
    username: 'tomismyhero',
  },
  {
    firstName: 'Mark',
    lastName: 'Fletcher',
    username: 'markyfletch',
  },
];

describe('exercise 03', () => {
  let values;
  beforeEach(async () => (values = await setup('03')));
  afterAll(teardown);

  it('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    const repository = await db.repository.create(repositoryData);
    const { collaborations, users } = await createCollaborationsAndUsers({
      collaboratorsData,
      db,
      repositoryId: repository.id,
    });

    const orderBy = {
      field: 'COLLABORATOR_JOINED_AT',
      direction: 'ASC',
    };
    let after, edges, expectedNodes, nodes, response;
    let variables = { id: repository.id, first: 2, orderBy };

    // first page
    variables = { ...variables, after };
    response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    expect(response.errors).toBe(undefined);
    ({ edges } = response.data.repository.collaboratorsConnection);
    expect(edges.length).toEqual(variables.first);

    nodes = edges.map(edge => edge.node);
    expectedNodes = users.slice(0, 2).map(({ id }) => ({ id }));
    expect(nodes).toEqual(expectedNodes);

    const lastEdge = edges[1];
    after = lastEdge.cursor;
    expect(after).toEqual(
      base64Encode(collaborations[1].joinedAt.toISOString()),
    );

    // second page
    variables = { ...variables, after };
    response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    ({ edges } = response.data.repository.collaboratorsConnection);
    nodes = edges.map(edge => edge.node);
    expectedNodes = users.slice(2, 4).map(({ id }) => ({ id }));
    expect(nodes).toEqual(expectedNodes);
    after = edges[1].cursor;

    // final page
    variables = { ...variables, after };
    response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    ({ edges } = response.data.repository.collaboratorsConnection);
    nodes = edges.map(edge => edge.node);
    expectedNodes = users.slice(4).map(({ id }) => ({ id }));
    expect(nodes).toEqual(expectedNodes);
  });
});
