const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'), //絶対パス。第一引数(__dirname)で現在のフォルダ階層を示す
    filename: 'main.js', //出力されるjsの名称変更
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html', //templateの内容を親にしてjsやCSSが読み込まれる
    }),
    new CleanWebpackPlugin(),
  ],
};
