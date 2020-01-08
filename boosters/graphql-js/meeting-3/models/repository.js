const DataLoader = require('dataloader');

module.exports = (sequelize, DataTypes) => {
  const { Op } = sequelize;

  const Repository = sequelize.define(
    'repository',
    {
      name: DataTypes.STRING,
      userId: DataTypes.UUID,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      isPrivate: DataTypes.BOOLEAN,
    },
    {},
  );
  Repository.associate = function(models) {
    Repository.belongsTo(models.user);
  };

  const batchGetRepositories = async keys => {
    const [{ currentUserId }] = keys;
    const ids = keys.map(key => key.id);
    const repositories = await Repository.findAll({
      where: {
        [sequelize.Op.or]: [
          { id: { [Op.in]: ids }, isPrivate: false },
          { id: { [Op.in]: ids }, isPrivate: true, userId: currentUserId },
        ],
      },
    });

    return ids.map(
      id => repositories.find(repository => repository.id === id) || null,
    );
  };

  const repositoryLoader = new DataLoader(keys => batchGetRepositories(keys));

  Repository.gen = async (id, currentUser) => {
    const key = { currentUserId: currentUser.id, id };
    const repository = await repositoryLoader.load(key);
    return repository;
  };

  return Repository;
};

// Check out http://docs.sequelizejs.com/manual/tutorial/querying.html#where

// Example OR clause
// Post.findOne({
//   where: {
//     [sequelize.Op.or]: [{authorId: 12}, {published: true}]
//   }
// });
// SELECT * FROM post WHERE authorId = 12 OR published = true LIMIT 1;

// Example IN clause
// Post.findOne({
//   where: {
//     authorId: {
//       [sequelize.Op.in]: [12, 13],
//     },
//   },
// });
// SELECT * FROM post WHERE authorId in (12, 13) LIMIT 1;
