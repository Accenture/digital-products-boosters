const db = require('../models');

exports.createUser = async (object, args) => {
  const user = await db.user.create(args.input);
  return { user };
};
