const path = require("path");
// same as import path from "path", but this is not modern JS so you cannot use the new version of code.
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          // 밑에서부터 위로 코드가 실행 됨.
          // 잘 호환되는 css가 불러와지면 딱 그 부분 텍스트만 추출해서 어딘가로 보낼거임.
          {
            loader: "css-loader",
            // 이걸 통해서 css를 이해할 수 있게 됨
          },
          {
            loader: "postcss-loader",
            // css를 받아서, 우리가 얘한테 주는 plugin을 받아서 css를 변환해줌
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
          },
          {
            loader: "sass-loader",
            // sass 혹은 scss를 받아서 일반 css로 바꿔줄 수 있음
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
  // 이것은 plugin이기 때문에 여기에 설치해준 것.
  // plugin을 여러개 넣을 것을 대비해, 배열로 만듦.
};

module.exports = config;
