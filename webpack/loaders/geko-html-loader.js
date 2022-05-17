/**
 * geko-html-loader
 * Trata templates HTML de acordo com as necessidades da Geko Software LTDA.
 */
const webpack_config = require(__dirname + "/../webpack.common.js"); // Lê alias definidos no webpack
const fs = require("fs");

module.exports = function (source) {
  // const options = this.getOptions();
  return getPartial(source);
};

function getPartial(source, map, meta) {
  /**
   * This pattern returns 1 match and 3 groups
   * - [0] Full Math
   * - [1] Fullpath  = alias + relative path
   * - [2] Alias
   * - [3] Relative path
   */
  let pattern = /<import>((@[A-z]+)\/(([A-z0-9_-]+[.\/])+html))<\/import>/gm;
  let matches = pattern.exec(source);

  if (matches === null) {
    // console.log("HTML FINAL " + source);
    return source;
  }
  let alias = webpack_config.resolve.alias;
  let partial_full_path = alias[matches[2]] + "/" + matches[3];
  let html_partial = getFileContent(partial_full_path);
  let result = source.replace(matches[0], html_partial);

  return getPartial(result);
}

function getFileContent(full_path_file) {
  try {
    const data = fs.readFileSync(full_path_file, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}
