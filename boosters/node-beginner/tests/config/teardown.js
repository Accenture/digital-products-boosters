const db = require("../../models");

module.exports = async () => {
  await Promise.all([db.Users.truncate(), db.Repos.truncate()]);
  db.sequelize.close();
};
