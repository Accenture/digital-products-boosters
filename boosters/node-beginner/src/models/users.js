module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    'user',
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      username: Sequelize.STRING,
    },
    {},
  );
  user.associate = function(models) {
    User.hasMany(models.repo);
  };
  return user;
};
