const path = require("path");

module.exports = {
  // generateCSSFiles: false,
  // devtool: false,
  // useCoreJs: false,
  entry: "./src/index.ts",
  outputFilenameFormat: "[name].js",
  // outputImageNameFormat: "[name][ext][query]",
  // outputFilename: "main.js",
  // outputFolder: "public",
  // pages: [
  //   {
  //     template: path.resolve(__dirname, "src/index.html"),
  //     //    chunk: ["index"],
  //     filename: "index.html",
  //   },
  // ],
  // assetsFolder: "assets",
  // mapPlugins: {},
  libraries: ["typescript"],
  // node: {}
  target: "node", // Possible values are node, web, etc. Switch to `node` to support a Node Js environment. Visit https://webpack.js.org/configuration/target/ to learn more
  copy: {
    patterns: [{ from: "./src/static", to: "./static" }, "./.env"],
  },
};
