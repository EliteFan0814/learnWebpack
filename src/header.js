function Header(){
    let dom = document.getElementById('root')
    let header = document.createElement('div')
    header.innerText = 'header'
    dom.append(header)
}
// ES Module 规范
export default Header
// CommonJS 规范
// module.exports = Header
