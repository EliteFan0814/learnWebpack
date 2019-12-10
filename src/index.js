// ES module 语法引入模块 
import Header from './header.js'
import Sidebar from './sidebar.js'
import Content from './content.js'
import Pic from './pic.png'
import './index.scss'
import './testHMR.css'
// import style from  './index.scss'
import number from './number.js'
import counter from './counter.js'

import createImg from './createImg.js'

import "core-js/stable";
import "regenerator-runtime/runtime";
// 另外还有 CommonJS 模块引入规范 CMD AMD等模块引入规范
// CommonJS规范
// let Header = require('./header')
new Header()
new Sidebar()
new Content()

console.log('打印出来Pic', Pic)
let img = new Image()
img.src = Pic
img.width = 50
// img.classList.add(style.avatar)
let root = document.getElementById('root')
root.append(img)

createImg()

let iconItem = document.createElement('div')
// iconItem.classList.add(style['icon-History'])
root.append(iconItem)
iconItem.innerHTML = '<div class="iconfont icon-History"></div>'

var btn = document.createElement('button')
btn.innerHTML = '新增'
document.body.appendChild(btn)
btn.onclick = function () {
  var div = document.createElement('div')
  div.innerHTML = 'item'
  div.setAttribute('class', 'mydiv')
  document.body.appendChild(div)
}

counter()
number()
if(module.hot){
  console.log('module',module)
  module.hot.accept('./number',()=>{
    document.body.removeChild(document.getElementById('number'))
    number()
  })
}