const merge = require('webpack-merge')
const base = require('./webpack.base.config.js')

const webpackConfig = merge(base, {
  devtool: 'source-map'
})

module.exports = webpackConfig
