const db = require("../../models");

const create = (database, data) => async () => {
  return db[database].bulkCreate(data).catch(e => {
    e.errors.map(e => console.error(e.message));
  });
};

module.exports = create;
