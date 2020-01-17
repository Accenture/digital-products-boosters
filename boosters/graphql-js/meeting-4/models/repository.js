module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define(
    'repository',
    {
      name: DataTypes.STRING,
      userId: DataTypes.UUID,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      isPrivate: DataTypes.BOOLEAN,
    },
    {},
  );
  Repository.associate = function(models) {
    Repository.belongsTo(models.user);

    // respository.getCollaborations() gets collaborations
    // ordering - repository.getCollaborations({ order: [['COLUMN_NAME', 'COLUMN_DIRECTION']] }) where COLUMN_DIRECTION is either ASC or DESC
    // where clause - repository.getCollaborations({ where: { timeStampField: { [db.sequelize.Op.gt]: TIMESTAMP_VALUE } } })
    // limit clause - repository.getCollaborations({ limit: NUMBER_TO_LIMIT })
    Repository.hasMany(models.collaboration);
    Repository.belongsToMany(models.user, {
      as: 'collaborators',
      through: models.collaboration,
    });
  };

  return Repository;
};
