// 引入 nodojs 的核心模块
const path = require('path')
// 引入 htmlwebpackplugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入 cleanWebpackPlugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// 引入 webpack
const webpack = require('webpack')
// 引入 copyWebpackPlugin
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
    main2: './src/index2.js',
    // main: ['@babel/polyfill', './src/index.js'],
    // main2: ['@babel/polyfill', './src/index2.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // 出口目录
    //publicpath:'https://www.fpc.com/' // 增加public路径
  },
  module: {
    rules: [
      // 图片打包工具
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          // loader: 'file-loader',
          // 也可以使用 url-loader
          loader: 'url-loader',
          // 打包配置选项
          options: {
            // 打包后的命名P
            name: '[name]_[hash].[ext]',
            outputPath: 'images',
            // url-loader limit 如果图片小超过2048个字节，就
            // 打包到 images 文件夹内，小于的话转为base64直接存储到目标js文件
            limit: 2048
          }
        }
      },
      // 字体文件打包工具
      {
        test: /\.(eot|woff|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      // scss打包工具
      {
        test: /\.scss$/,
        use: ['style-loader', // 将 JS 字符串生成为 style 节点
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
            options: {
              importLoaders: 2,
              //modules: true, // 模块化 css 
            }
          },
          'postcss-loader', // 添加前缀
          'sass-loader', // 将 Sass 编译成 CSS，默认使用 Node Sass
        ],
      },
      // css打包工具
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
      // 使用babel进行 js 转义
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
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{
      from: 'src/font',
      to: 'font'
    }])
  ],
}