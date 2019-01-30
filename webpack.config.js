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
      // {
      //   enforce: "pre",
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader"
      // },
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
        test: /\.(png|jpg|gif|woff2?)$/,
        loader: "url-loader",
        options: {
          fallback: "file-loader",
          limit: 10000
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: false
            }
          },
          "url-loader"
        ]
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
