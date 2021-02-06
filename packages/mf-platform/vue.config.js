const webpackConfig = require('./webpack.config')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bsappvue/mf-platform-vue/'
    : '//localhost:9100/',
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
    historyApiFallback: true,
    contentBase: './',
    compress: true,
    proxy: {
      '^/api': {
        target: 'http://114.115.200.169:8081',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
