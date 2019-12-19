const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
    main2: './src/index2.js',
  },
  output: {
    filename: '[name].js',
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
        test: /\.scss$/,
        use: ['style-loader', // 将 JS 字符串生成为 style 节点
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
            options: {
              importLoaders: 2,
            }
          },
          'postcss-loader', // 添加前缀
          'sass-loader', // 将 Sass 编译成 CSS，默认使用 Node Sass
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader'
        ]
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
          plugins: ['@babel/plugin-syntax-dynamic-import']
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
    }])
  ],
  optimization: {
    // 代码分割，和webpack无关
    // 同步代码：只需要在webpack.common.js中做optimization的配置
    //异步代码：不需要做任何配置
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}