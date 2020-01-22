"use strict";
const uuid = require("uuid/v4");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bio: DataTypes.TEXT,
      username: DataTypes.STRING,
    },
    {}
  );
  Users.associate = function(models) {
    Users.hasMany(models.Repos, { foreignKey: "userId" });
  };
  Users.beforeCreate(user => (user.id = uuid()));

  return Users;
};
