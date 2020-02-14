const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chxxk.js',
        path: path.resolve(__dirname, '../dist'), // 出口目录
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({})
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({})
        ]
    }
}

module.exports = merge(commonConfig, prodConfig)