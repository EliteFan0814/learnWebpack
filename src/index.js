// ES module 语法引入模块 
import Header from './header.js'
import Sidebar from './sidebar.js'
import Content from './content.js'
import Pic from './pic.png'
import './index.scss'
// import style from  './index.scss'

import createImg from './createImg.js'
// 另外还有 CommonJS 模块引入规范 CMD AMD等模块引入规范
// CommonJS规范
// let Header = require('./header')
new Header()
new Sidebar()
new Content()

console.log('打印出来Pic',Pic)
let img = new Image()
img.src = Pic
// img.classList.add(style.avatar)
let root = document.getElementById('root')
root.append(img)

createImg()

let iconItem = document.createElement('div')
// iconItem.classList.add(style['icon-History'])
root.append(iconItem)
iconItem.innerHTML = '<div class="iconfont icon-History"></div>'