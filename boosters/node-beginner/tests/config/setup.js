const db = require('../../src/models').db;

exports.createDB = async () => {
  try {
    return await db.sync({ force: true });
  } catch (err) {
    console.error(err);
    return { err };
  }
};

exports.seedDB = database => async data => db.models[database].bulkCreate(data);
