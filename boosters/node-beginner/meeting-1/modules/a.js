console.log("a starting");
exports.loaded = false;

const b = require("./b");
console.log("in a, b.loaded = %j", b.loaded);

module.exports = {
  bWasLoaded: b.loaded,
  loaded: true,
};

console.log("a done");
