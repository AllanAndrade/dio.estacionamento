const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

// console.log("DIRNAME: " + path.resolve(__dirname, '/../src/typescript/')     );

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

// importa configurações de plugins
const multipleHtmlPlugins = require("./cfg_plugins/html_multiplos");

// inporta configuração de regras
const regra_typescript = require("./cfg_rules/typescript");
const regra_typescript_global = require("./cfg_rules/typescript_global");
const regra_html = require("./cfg_rules/html");
const regra_scss = require("./cfg_rules/scss");
const regra_images = require("./cfg_rules/images");

// console.log("PATH: " + path.resolve(__dirname, "../dist"));
// exporta configurações gerais (comuns a DEV e PROD)
module.exports = {
  entry: ["./src/ts/main.ts"],
  output: {
    filename: "[name].bundle.js",
    clean: true,
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash:8].js",
    sourceMapFilename: "[name].[hash:8].map",
    chunkFilename: "[id].[hash:8].js",
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ].concat(multipleHtmlPlugins),
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "loaders")],
  },
  module: {
    rules: [
      regra_typescript,
      regra_typescript_global,
      regra_html,
      regra_scss,
      regra_images,
    ],
  },

  resolve: {
    alias: {
      "@ts": path.resolve(__dirname, "../src/ts/"),
      "@scss": path.resolve(__dirname, "../src/scss/"),
      "@img": path.resolve(__dirname, "../src/img/"),
      "@html": path.resolve(__dirname, "../src/html/"),
      // jquery: "jquery/dist/jquery.min.js",
    },

    extensions: [".ts", ".js"], // Com isso, não é necessário informar as extensões nos requires / imports
  },

  watchOptions: {
    ignored: "**/node_modules",
  },
};
