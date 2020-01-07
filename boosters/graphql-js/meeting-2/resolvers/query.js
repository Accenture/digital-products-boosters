const db = require('../models');

exports.myArrayField = () => ['item'];

exports.myBooleanField = () => true;

exports.myIntegerField = () => 13;

exports.myTextField = () => 'bookclub rulz';

exports.testField = (object, args) => 'Hello World!';

exports.users = () => db.user.findAll();
