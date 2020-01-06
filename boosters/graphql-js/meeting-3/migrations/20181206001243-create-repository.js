module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('repositories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      isPrivate: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    return queryInterface.addConstraint('repositories', ['userId', 'name'], {
      type: 'unique',
      name: 'index_repositories_on_name_and_user_id',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('repositories');
  },
};
