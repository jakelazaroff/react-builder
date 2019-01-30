const fs = require("fs");
const os = require("os");
const path = require("path");
const cp = require("child_process");

const PACKAGE_JSON = {
  version: "0.1.0",
  scripts: {
    start: "builder start",
    build: "builder build"
  }
};

const DEV_DEPENDENCIES = [
  "@types/react",
  "@types/react-dom",
  "typescript",
  "file:../builder"
];

const DEPENDENCIES = ["react", "react-dom"];

module.exports = function(name) {
  const BUILDER_ROOT = __dirname,
    APP_ROOT = path.resolve(process.cwd(), name),
    TEMPLATES = path.resolve(BUILDER_ROOT, "templates");

  fs.mkdirSync(APP_ROOT);

  console.log("Writing config files…");
  const package = {
    ...PACKAGE_JSON,
    name
  };

  fs.writeFileSync(
    path.join(APP_ROOT, "package.json"),
    JSON.stringify(package, null, 2) + os.EOL
  );

  fs.copyFileSync(
    path.join(TEMPLATES, "tsconfig.json"),
    path.join(APP_ROOT, "tsconfig.json")
  );

  // fs.copyFileSync(
  //   path.join(TEMPLATES, ".eslintrc"),
  //   path.join(APP_ROOT, ".eslintrc")
  // );

  fs.copyFileSync(
    path.join(TEMPLATES, "types.d.ts"),
    path.join(APP_ROOT, "types.d.ts")
  );

  fs.copyFileSync(
    path.join(TEMPLATES, ".gitignore"),
    path.join(APP_ROOT, ".gitignore")
  );

  // console.log("Installing development dependencies…");
  // const addDev = cp.spawnSync("yarn", ["add", "--dev", ...DEV_DEPENDENCIES], {
  //   cwd: APP_ROOT
  // });

  // if (addDev.status !== 0) {
  //   console.error(addDev.stderr.toString(), addDev.stdout.toString());
  //   return;
  // }

  // console.log("Installing production dependencies…");
  // const addProd = cp.spawnSync("yarn", ["add", ...DEPENDENCIES], {
  //   cwd: APP_ROOT
  // });

  // if (addProd.status !== 0) {
  //   console.error(addProd.stderr.toString(), addProd.stdout.toString());
  //   return;
  // }

  console.log("Copying example project…");
  copyDir(path.join(TEMPLATES, "src"), path.join(APP_ROOT));
  copyDir(path.join(TEMPLATES, "public"), path.join(APP_ROOT));

  console.log("✨ Done!");
};

function copyDir(source, target) {
  const directory = path.join(target, path.basename(source));
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  for (const file of fs.readdirSync(source)) {
    const current = path.join(source, file);
    if (fs.lstatSync(current).isDirectory()) {
      copyDir(current, directory);
    } else {
      fs.copyFileSync(current, path.join(directory, file));
    }
  }
}
