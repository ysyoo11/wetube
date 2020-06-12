const path = require("path");
// same as import path from "path", but this is not modern JS so you cannot use the new version of code.
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};

module.exports = config;
