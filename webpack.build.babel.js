import merge from 'webpack-merge'
import commonConf from './webpack.common.babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default merge(commonConf, {
  mode: 'production',
  devtool: 'cheap-module-source-map', // 去掉source map
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.production.html'
    })
  ]
})
