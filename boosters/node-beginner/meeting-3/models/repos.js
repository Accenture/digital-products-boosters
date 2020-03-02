"use strict";
const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const Repos = sequelize.define(
    "Repos",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isPrivate: DataTypes.BOOLEAN,
      userId: DataTypes.UUID,
    },
    {}
  );
  Repos.associate = function(models) {
    Repos.belongsTo(models.Users, { foreignKey: "userId" });
  };
  Repos.beforeCreate(repo => (repo.id = uuid()));
  return Repos;
};
