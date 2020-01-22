module.exports = (sequelize, DataTypes) => {
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
  Repository.gen = async () => {
    //TODO: Implement me!
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
