"use strict";
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
  return Repos;
};
