const { base64Encode } = require('../services');

exports.cursor = object => base64Encode(object.joinedAt.toISOString());

exports.node = object => object.getUser();
