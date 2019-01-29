const path = require("path");

const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const APP_ROOT = process.cwd();

module.exports = {
  mode: "development",
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client",
    path.resolve(__dirname, "client.js")
  ],
  output: {
    globalObject: "this",
    pathinfo: true
  },
  resolve: {
    modules: [path.resolve(APP_ROOT, "src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ["thread-loader", "eslint-loader"]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_ROOT, "public", "index.html")
    })
  ]
};
