"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Repos", "userId", {
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Repos", "userId");
  },
};
