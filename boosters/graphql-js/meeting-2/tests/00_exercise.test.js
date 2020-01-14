const setup = require('./config/setup');
const teardown = require('./config/teardown');

describe('exercise 00', () => {
  let values;
  beforeEach(async () => (values = await setup('00')));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { EXERCISE_QUERY, testClient } = values;
    const response = await testClient.query({ query: EXERCISE_QUERY });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      myTextField: 'bookclub rulz',
    });
  });
});
