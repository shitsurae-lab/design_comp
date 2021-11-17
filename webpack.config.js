const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'), //絶対パス。第一引数(__dirname)で現在のフォルダ階層を示す
    filename: 'js/main.js', //出力されるjsの名称変更。__dirnameの後ろのため、先頭に'./'とはつけない
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
      {
        test: /\.(jpg|png)$/,
        //webpack5ではfile-loaderやurl-loaderを使わないでも'type:','generator:'の記述で画像が正しく表現できる
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]', //options: とは異なり'.[ext]'とは記述しない
        },
        use: [
          // {
          //   loader: 'file-loader',
          //   //option's'の表記
          //   options: {
          //     //'esModules'ではない
          //     esModule: false,
          //     name: 'images/[name].[ext]', //ランダムな文字列にならないよう、nameを指定する
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html', //templateの内容を親にしてjsやCSSが読み込まれる
    }),
    new CleanWebpackPlugin(),
  ],
};
