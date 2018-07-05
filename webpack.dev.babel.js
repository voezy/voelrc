import webpack from 'webpack'
import merge from 'webpack-merge'
import commonConf from './webpack.common.babel'

export default merge(commonConf, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: 'hls.js', // Remove hls warning.
  devServer: {
    contentBase: './static',
    host: '0.0.0.0',
    disableHostCheck: true,
    // 转发API接口请求
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  }
})
