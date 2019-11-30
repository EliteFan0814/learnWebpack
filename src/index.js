// ES module 语法引入模块 
import Header from './header.js'
import Sidebar from './sidebar.js'
import Content from './content.js'
import Pic from './pic.png'

// 另外还有 CommonJS 模块引入规范 CMD AMD等模块引入规范
// CommonJS规范
// let Header = require('./header')
new Header()
new Sidebar()
new Content()

console.log('打印出来Pic',Pic)
let img = new Image()
img.src = Pic
let root = document.getElementById('root')
root.append(img)