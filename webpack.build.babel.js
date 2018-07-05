import merge from 'webpack-merge'
import commonConf from './webpack.common.babel'

export default merge(commonConf, {
  mode: 'production',
  devtool: 'cheap-module-source-map' // 去掉source map
})
