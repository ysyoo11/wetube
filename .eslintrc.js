module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "spaced-comment": "off",
    "no-else-return": "off",
    "no-use-before-define": "off",
    "no-empty": "off",
    camelcase: "off",
    "no-undef": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "consistent-return": "off",
    // "import/no-unresolved": "[2, {commonjs: true, amd: true}]",
    // "import/named": "2",
    // "import/namespace": "2",
    // "import/default": "2",
    // "import/export": "2",
    "import/no-cycle": "off",
  },
};
