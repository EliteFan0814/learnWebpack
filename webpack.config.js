// 引入 nodojs 的核心模块
const path = require('path')

module.exports = {
    mode: 'development',
    // entry: './src/index.js', 此句等价于下面
    entry: {
        main: './src/index.js'
    },
    module:{
        rules:[
            {
                test: /\.png$/,
                use:{
                    loader:'file-loader'
                }
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}