const Sequelize = require('sequelize');
const userModel = require('./users');
const repoModel = require('./repos');
const path = require('path');
const db = new Sequelize({
  dialect: 'sqlite',
  storage: path.join('__dirname', '../', 'database_test.sqlite'),
});

module.exports.user = userModel(db, Sequelize);
module.exports.repo = repoModel(db, Sequelize);
module.exports.db = db;
