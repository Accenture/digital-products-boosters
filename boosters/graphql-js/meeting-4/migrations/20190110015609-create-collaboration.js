module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('collaborations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      repositoryId: {
        allowNull: false,
        type: Sequelize.UUID,
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

    return queryInterface.addConstraint(
      'collaborations',
      ['repositoryId', 'userId'],
      {
        type: 'unique',
        name: 'index_collaborations_on_repository_id_and_user_id',
      },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collaborations');
  },
};
