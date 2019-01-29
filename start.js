const fs = require("fs");
const path = require("path");
const url = require("url");

const express = require("express");
const proxy = require("http-proxy-middleware");
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hot = require("webpack-hot-middleware");

const config = require("./webpack.config");

module.exports = function main() {
  const package = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "package.json"))
  );

  const app = express();

  const compiler = webpack(config);
  app.use(middleware(compiler, {}));
  app.use(hot(compiler));

  app.use("/assets", express.static("public"));

  const rules = Object.entries(package.proxy || {});
  for (const rule of rules) {
    const [context, options] = createProxyRule(rule);
    app.use(proxy(context, options));
  }

  app.listen(3000);
};

const createProxyRule = ([source, destination]) => {
  const { protocol, host, path } = url.parse(destination);
  const target = protocol + "//" + host;

  return [
    source,
    {
      target,
      logLevel: "debug",
      pathRewrite: { ["^" + source]: path.replace(/\/$/, "") }
    }
  ];
};
