const setup = require('./config/setup');
const teardown = require('./config/teardown');

describe('exercise 01', () => {
  let values;
  beforeEach(async () => (values = await setup('01')));
  afterEach(teardown);

  it('should return the expected response', async () => {
    const { EXERCISE_QUERY, testClient } = values;
    const response = await testClient.query({ query: EXERCISE_QUERY });

    expect(response.errors).toBe(undefined);
    expect(response.data).toEqual({
      myArrayField: ['item'],
      myBooleanField: true,
      myIntegerField: 13,
      myTextField: 'bookclub rulz',
    });
  });
});
