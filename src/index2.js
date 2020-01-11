// import "core-js/stable";
// import "regenerator-runtime/runtime";
import {
  a
} from './testMethods.js'

// 同步加载 lodash
// import _ from 'lodash'
// let element = document.createElement('div')
// element.innerHTML = _.join(['f', 'p', 'c'], '-')
// document.body.appendChild(element)

a()

// 异步加载 lodash
function getComponent() {
  return import( /* webpackChunkName:"myLodash" */ 'lodash').then(({
    default: _
  }) => {
    let element = document.createElement('div')
    element.innerHTML = _.join(['f', 'p', 'c'], '-')
    return element
  })
}
// 使用 async 方式
// async function getComponent() {
//   const {
//     default: _
//   } = await import( /* webpackChunkName:"myLodash" */ 'lodash')
//   let element = document.createElement('div')
//   element.innerHTML = _.join(['f', 'p', 'c'], '-')
//   return element
// }

document.addEventListener('click', () => {
  getComponent().then(rel => {
    document.body.appendChild(rel)
  })
})

console.log('module',module)