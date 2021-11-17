const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
// production モード以外の場合、変数 enabledSourceMap は true
const enabledSourceMap = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'), //絶対パス。第一引数(__dirname)で現在のフォルダ階層を示す
    filename: 'js/main.js', //出力されるjsの名称変更。__dirnameの後ろのため、先頭に'./'とはつけない
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              //  production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
              //  production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        //webpack5ではfile-loaderやurl-loaderを使わないでも'type:','generator:'の記述で画像が正しく表現できる
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]', //options: とは異なり'.[ext]'とは記述しない
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
      {
        test: /\.pug/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.pug', //①templateの内容を親にしてjsやCSSが読み込まれる
      //②templateの内容をHTMLから.pugに変更した
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/access.pug',
      filename: 'access.html',
    }),

    new CleanWebpackPlugin(),
  ],
  //source-map タイプのソースマップを出力
  devtool: 'source-map',
  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/, //正規表現で指定
  },
};
