const db = require('../../models');

module.exports = database => data => async () => db[database].bulkCreate(data);
