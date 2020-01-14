exports.base64Decode = value => Buffer.from(value, 'base64').toString();
exports.base64Encode = value => Buffer.from(value, 'utf8').toString('base64');
