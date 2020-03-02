const db = require("../../models");

module.exports = (database, data) => async () => {
  return db[database].bulkCreate(data);
};
