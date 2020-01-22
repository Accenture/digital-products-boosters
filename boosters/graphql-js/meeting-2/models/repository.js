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
  };
  return Repository;
};

// given a repository object, you can get its corresponding user object
// repository.getUser()

// using the db object you can run the following

// get all repositories
// db.repository.findAll()

// get repository by id
// db.repository.findOne({ where: { id: ID_GOES_HERE } });
