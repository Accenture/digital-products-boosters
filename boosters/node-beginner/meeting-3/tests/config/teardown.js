const db = require("../../models");

module.exports = async () => {
  await db.Users.truncate({ cascade: true });
  db.sequelize.close();
};
