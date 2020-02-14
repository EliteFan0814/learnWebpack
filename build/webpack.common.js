const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: {
    main: './src/index.js',
    main2: './src/index2.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist'), // 出口目录
  },
  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images',
            limit: 2048
          }
        }
      },
      {
        test: /\.(eot|woff|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              corejs: 3
            }]
          ],
          plugins: ['@babel/plugin-syntax-dynamic-import'] // 为了使用 import 这个实验性质的异步加载函数
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{
      from: './src/font',
      to: 'font'
    }]),
    new webpack.ProvidePlugin({
      $:'jquery'
    })
  ],
  optimization: {
    // 代码分割，和webpack无关
    // 同步代码：只需要在webpack.common.js中做optimization的配置
    //异步代码：不需要做任何配置
    splitChunks: {
      chunks: 'async', // all打包所有 initial打包同步 async打包异步引入的
      minSize: 30000,
      maxSize: 0,
      minChunks: 1, // 最小引用次数
      maxAsyncRequests: 5, //最大异步打包数量
      maxInitialRequests: 3, // 最大同步打包数量
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级
          // filename:'myVendors.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true, //如果一个模块已经被打包过就不再重复打包
        }
      }
    }
  }
}