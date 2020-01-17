module.exports = async () => {
  const db = require('../../models');
  await db.sequelize.close();
};
