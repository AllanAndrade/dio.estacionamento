// const multipleHtmlPlugins = require('./webpack.config.html.multiplo');
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    liveReload: true,
    hot: false,
    host: "127.0.0.1",
    port: 12345,
    static: path.resolve(__dirname, "../dist"),
    watchFiles: path.resolve(__dirname, "../dist"),
  },
  watchOptions: {
    ignored: /node_modules/,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
});
