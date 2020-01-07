const db = require('../models');

exports.myArrayField = () => ['item'];

exports.myBooleanField = () => true;

exports.myIntegerField = () => 13;

exports.myTextField = () => 'bookclub rulz';

exports.repository = (object, args) =>
  db.repository.findOne({ where: { id: args.id } });

exports.testField = (object, args) => 'Hello World!';

exports.user = (object, args) => db.user.findOne({ where: { id: args.id } });

exports.users = () => db.user.findAll();
