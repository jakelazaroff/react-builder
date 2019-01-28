#! /usr/bin/env node

function main(args) {
  const [, , command] = args;
  if (command === "init") {
    const init = require("./init");
    init(args[3]);
  } else if (command === "start") {
    const start = require("./start");
    start();
  }
}

main(process.argv);
