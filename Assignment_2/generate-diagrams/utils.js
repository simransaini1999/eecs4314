const fs = require("fs");
const config = require("./config");

const readInput = (file) => fs.readFileSync(file).toString();

const loadRawTAFile = () => {
  return readInput(config.env.raw);
};

// https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

exports.loadRawTAFile = loadRawTAFile;
exports.flatten = flatten;
