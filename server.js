const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const hot = require("webpack-hot-middleware");
const config = require("./webpack.config");
const compiler = webpack(config);

const express = require("express");
const app = express();

app.use(middleware(compiler, {}));
app.use(hot(compiler));

app.listen(3000);
