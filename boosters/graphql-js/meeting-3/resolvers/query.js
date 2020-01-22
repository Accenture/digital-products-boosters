const db = require('../models');

exports.repository = (object, args, context) =>
  db.repository.findOne({ where: { id: args.id } });

exports.user = (object, args, context) =>
  db.user.findOne({ where: { id: args.id } });

exports.users = (object, args, context) => db.user.findAll();
