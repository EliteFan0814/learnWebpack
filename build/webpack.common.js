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
          ]
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
}