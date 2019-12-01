// 引入 nodojs 的核心模块
const path = require('path')

module.exports = {
    mode: 'development',
    // entry: './src/index.js', 此句等价于下面
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
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
            }
        ]
    },

}