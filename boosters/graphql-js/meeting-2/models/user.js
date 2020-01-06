module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      bio: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      pictureUrl: DataTypes.STRING,
      updatedAt: DataTypes.DATE,
      username: DataTypes.STRING,
    },
    {
      getterMethods: {
        fullName() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
  );
  User.associate = function(models) {
    User.hasMany(models.repository);
  };
  return User;
};

// given a user object, you can get all the repositories with
// user.getRepositories()

// using a db object you can run the following
// get all users
// db.user.findAll()

// get user by id
// db.user.findOne({ where: { id: ID_GOES_HERE } });
