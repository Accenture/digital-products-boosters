const db = require('../../src/models').db;

module.exports = database => async data => {
  try {
    await db.sync({ force: true });
    if (data) await db.models[database].bulkCreate(data);
  } catch (err) {
    console.error(err);
    return { err };
  }
};
