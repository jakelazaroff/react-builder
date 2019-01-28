const path = require("path");

const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const APP_ROOT = process.cwd();

module.exports = {
  mode: "development",
  devtool: "eval",
  entry: [
    "webpack-hot-middleware/client",
    path.resolve(__dirname, "client.js")
  ],
  resolve: {
    modules: [
      path.resolve(APP_ROOT, "src"),
      path.resolve(APP_ROOT, "node_modules")
    ],
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_ROOT, "public", "index.html")
    }),
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true
    })
  ]
};
