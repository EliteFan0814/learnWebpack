const path = require('path');
// 此处需要安装style-loader css-loader extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // JS 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 css 文件
        test: /\.css$/,
        // 先使用 css-loader 将 css 文件转化成 js 可识别的文件，再通过
        // style-loader 将 css 样式注入 js ，这样不太好，我们还是希望
        // 单独拿出 css 文件
        // loaders: ['style-loader', 'css-loader'],

        // 使用 webpack 的 plugin 扩展功能，使 css 文件单独导出
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 loader
          use:['css-loader']
        })
      }
    ]
  },
  plugins:[
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename:`[name]_[contenthash:8].css`
    })
  ]
};
