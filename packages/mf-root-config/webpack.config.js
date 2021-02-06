/* eslint-disable no-undef */
const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => ({
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'main.js',
    libraryTarget: 'umd',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchContentBase: true,
    publicPath: '/'
    // proxy: {
    //   '/api': {
    //     target: '',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.ejs',
      templateParameters: {
        isLocal: env && env.isLocal
      }
    }),
    new CopyPlugin([
      // copy map
      { from: env && env.isLocal ? 'src/importmap.json' : 'src/importmap.prod.json', to: '' }
      // 3rd lib
      // { from: "node_modules/systemjs/dist/system.min.js", to: "systemjs" },
      // {
      //   from: "node_modules/systemjs/dist/extras/amd.min.js",
      //   to: "systemjs/extras"
      // },
      // {
      //   from: "node_modules/systemjs/dist/extras/named-exports.min.js",
      //   to: "systemjs/extras"
      // }
    ])
    // new CleanWebpackPlugin()
  ],
  externals: ['single-spa', 'vue', 'vue-router', /^mf-/]
})
