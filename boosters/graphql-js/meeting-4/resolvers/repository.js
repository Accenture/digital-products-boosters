const db = require('../models');
const { base64Decode, base64Encode } = require('../services');

exports.id = object => object.id;

exports.name = object => object.name;

exports.user = object => object.getUser();
