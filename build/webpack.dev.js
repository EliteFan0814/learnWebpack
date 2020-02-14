const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './src',
        open: true,
        hot: true,
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '../dist'), // 出口目录
      },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ['style-loader', // 将 JS 字符串生成为 style 节点
                    {
                        loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
                        options: {
                            importLoaders: 2,
                            modules: true // 开启 css modules 模块化
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
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        // 开发环境使用 tree shaking 按需加载需要的函数 此选项默认在 生产环境 启用
        usedExports: true,
    }
}

module.exports = merge(commonConfig, devConfig)