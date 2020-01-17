module.exports = ({ collaboratorsData, db, repositoryId }) =>
  collaboratorsData.reduce(async (promise, collaboratorData) => {
    const { collaborations, users } = await promise;
    const user = await db.user.create(collaboratorData);
    const collaboration = await db.collaboration.create({
      userId: user.id,
      repositoryId,
    });

    return Promise.resolve({
      collaborations: [...collaborations, collaboration],
      users: [...users, user],
    });
  }, Promise.resolve({ collaborations: [], users: [] }));
