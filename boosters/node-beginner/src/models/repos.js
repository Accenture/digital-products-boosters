module.exports = (sequelize, Sequelize) => {
  const repo = sequelize.define(
    'repo',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      isPrivate: Sequelize.BOOLEAN,
    },
    {},
  );
  repo.associate = function(models) {
    repo.belongsTo(models.user);
  };
  return repo;
};
