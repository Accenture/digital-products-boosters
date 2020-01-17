const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const fs = require('fs');

module.exports = async exerciseNumber => {
  try {
    const server = require('../../config/server');
    const testClient = createTestClient(server);
    const db = require('../../models');
    await db.repository.truncate();
    await db.user.truncate();

    const filePath = `./tests/${exerciseNumber}_exercise.graphql`;
    const exerciseQuery = fs.readFileSync(filePath);
    const EXERCISE_QUERY = gql`
      ${exerciseQuery}
    `;
    return { db, EXERCISE_QUERY, testClient };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
