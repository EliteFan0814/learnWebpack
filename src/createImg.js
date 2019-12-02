import Pic from './pic.png'

function createImg() {
    let img = new Image()
    img.src = Pic
    img.classList.add('avatar')
    let root = document.getElementById('root')
    root.append(img)
}

export default createImg