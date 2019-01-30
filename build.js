const webpack = require("webpack");
const config = require("./webpack.config");

process.env.NODE_ENV = "production";

module.exports = function main() {
  webpack(config("production"), (err, stats) => {
    console.log(stats);
  });
};
