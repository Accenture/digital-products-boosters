module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'repo',
    {
      name: {
        type: Sequelize.STRING,
      },
    },
    {},
  );
