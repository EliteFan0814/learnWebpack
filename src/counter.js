function counter() {
  var div = document.createElement('div')
  div.innerHTML = 1
  div.onclick = function () {
    div.innerHTML = parseInt(div.innerHTML) + 1
  }
  document.body.append(div)
}

export default counter