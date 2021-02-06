const webpackConfig = require('./webpack.config')

module.exports = {
  filenameHashing: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bsappvue/mf-shared-dependencies-vue/'
    : '//localhost:9010/',
  // css在所有环境下，都不单独打包为文件。这样是为了保证最小引入（只引入js）
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['node_modules', '../../node_modules']
        }
      }
    }
  },
  configureWebpack: webpackConfig,
  devServer: {
    contentBase: './',
    compress: true
  }
}
