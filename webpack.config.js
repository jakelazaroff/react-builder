const path = require("path");

const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const APP_ROOT = process.cwd();

module.exports = env => {
  const mode = env === "development" ? "development" : "production";
  const devtool = env === "development" ? "eval" : "source-map";

  const entry =
    env === "development"
      ? ["webpack-hot-middleware/client", path.resolve(__dirname, "client.js")]
      : path.resolve(APP_ROOT, "src", "index.tsx");

  const output = {
    globalObject: "this"
  };

  if (env === "development") {
    output.pathinfo = true;
  } else {
    output.path = path.resolve(APP_ROOT, "build");
    output.filename = "[name].[hash].js";
  }

  const rules = [
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
  ];

  const optimization =
    env === "development"
      ? {}
      : {
          splitChunks: {
            chunks: "all"
          }
        };

  const plugins = [
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(APP_ROOT, "public", "index.html")
    })
  ];

  if (env === "development")
    plugins.unshift(
      new HardSourceWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );

  const config = {
    mode,
    devtool,
    entry,
    output,
    resolve: {
      modules: [path.resolve(APP_ROOT, "src"), "node_modules"],
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules
    },
    optimization,
    plugins
  };

  return config;
};
