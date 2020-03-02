console.log("b starting");
exports.loaded = false;

const a = require("./a");
console.log("in b, a.loaded = %j", a.loaded);

module.exports = {
  aWasLoaded: a.loaded,
  loaded: true,
};

console.log("b done");
