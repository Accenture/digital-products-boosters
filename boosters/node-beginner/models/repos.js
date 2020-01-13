"use strict";
const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const Repos = sequelize.define(
    "Repos",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      isPrivate: DataTypes.BOOLEAN
    },
    {}
  );
  Repos.associate = function(models) {
    Repos.belongsTo(models.Users);
  };
  Repos.beforeCreate(repo => (repo.id = uuid()));
  return Repos;
};
