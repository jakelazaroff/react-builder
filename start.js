const express = require("express");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hot = require("webpack-hot-middleware");
const config = require("./webpack.config");

module.exports = function main() {
  const app = express();

  const compiler = webpack(config);
  app.use(middleware(compiler, {}));
  app.use(hot(compiler));

  app.use("/assets", express.static("public"));

  app.listen(3000);
};
