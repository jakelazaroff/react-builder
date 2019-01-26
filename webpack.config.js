const path = require("path");

const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["webpack-hot-middleware/client", "./src/index.tsx"],
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules")
    ],
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html")
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
};
