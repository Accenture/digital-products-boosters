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

describe('exercise 04', () => {
  let values;
  beforeEach(async () => (values = await setup('04')));
  afterAll(teardown);

  it('should return the expected response', async () => {
    const { db, EXERCISE_QUERY, testClient } = values;
    const repository = await db.repository.create(repositoryData);
    const { users } = await createCollaborationsAndUsers({
      collaboratorsData,
      db,
      repositoryId: repository.id,
    });

    const orderBy = {
      field: 'COLLABORATOR_JOINED_AT',
      direction: 'ASC',
    };
    let after,
      collaborators,
      collaboratorsConnection,
      expectedCollaborators,
      pageInfo,
      response;
    let variables = { id: repository.id, first: 2, orderBy };

    // first page
    variables = { ...variables, after };
    response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    expect(response.errors).toBe(undefined);
    ({ collaboratorsConnection } = response.data.repository);
    ({ collaborators, pageInfo } = collaboratorsConnection);

    expect(collaborators.length).toEqual(variables.first);
    expectedCollaborators = users.slice(0, 2).map(({ id }) => ({ id }));
    expect(collaborators).toEqual(expectedCollaborators);
    expect(pageInfo).toBeDefined();
    expect(pageInfo.endCursor).toBeDefined();
    after = pageInfo.endCursor;

    // second page
    variables = { ...variables, after };
    response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    ({ collaboratorsConnection } = response.data.repository);
    ({ collaborators, pageInfo } = collaboratorsConnection);

    expectedCollaborators = users.slice(2, 4).map(({ id }) => ({ id }));
    expect(collaborators).toEqual(expectedCollaborators);
    after = pageInfo.endCursor;

    // final page
    variables = { ...variables, after };
    response = await testClient.query({
      query: EXERCISE_QUERY,
      variables,
    });

    ({ collaboratorsConnection } = response.data.repository);
    ({ collaborators, pageInfo } = collaboratorsConnection);

    expectedCollaborators = users.slice(4).map(({ id }) => ({ id }));
    expect(collaborators).toEqual(expectedCollaborators);
  });
});
