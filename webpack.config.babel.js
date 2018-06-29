import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
  VueLoaderPlugin
} from 'vue-loader'

export default {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'src/js/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[ext]'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new VueLoaderPlugin(),
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
        pathRewrite: {'^/api': ''},
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
