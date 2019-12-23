module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'user',
    {
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {},
  );
