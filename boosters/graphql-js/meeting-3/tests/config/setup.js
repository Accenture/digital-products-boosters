const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const fs = require('fs');

module.exports = async (exerciseNumber, currentUserData) => {
  try {
    const db = require('../../models');
    await db.repository.truncate();
    await db.user.truncate();

    const server = require('../../config/server');
    let currentUser, EXERCISE_QUERY;
    if (currentUserData) {
      currentUser = await db.user.create(currentUserData);
    }
    server.context = () => ({ currentUser });
    const testClient = createTestClient(server);

    if (exerciseNumber) {
      const filePath = `./tests/${exerciseNumber}_exercise.graphql`;
      const exerciseQuery = fs.readFileSync(filePath);
      EXERCISE_QUERY = gql`
        ${exerciseQuery}
      `;
    }

    return { currentUser, db, EXERCISE_QUERY, testClient };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
