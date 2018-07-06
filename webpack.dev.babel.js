import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import commonConf from './webpack.common.babel'

process.env.API_ROOT = 'http://192.168.1.138:8080/api'

export default merge(commonConf, {
  mode: 'development',
  devtool: 'eval-source-map',
  externals: 'hls.js', // Remove hls warning.
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
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
