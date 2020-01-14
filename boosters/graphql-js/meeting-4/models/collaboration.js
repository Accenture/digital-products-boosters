module.exports = (sequelize, DataTypes) => {
  const Collaboration = sequelize.define(
    'collaboration',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      createdAt: DataTypes.DATE,
      repositoryId: DataTypes.UUID,
      updatedAt: DataTypes.DATE,
      userId: DataTypes.UUID,
    },
    {
      getterMethods: {
        joinedAt() {
          return this.createdAt;
        },
      },
    },
  );
  Collaboration.associate = function(models) {
    Collaboration.belongsTo(models.repository);
    Collaboration.belongsTo(models.user);
  };
  return Collaboration;
};
