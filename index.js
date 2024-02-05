
const colorBox = document.querySelector('.color-box');
const hexBox = document.querySelector('.hex-box');

console.log(colorBox.innerHTML)

const colorPick = document.getElementById('color');
const modePick = document.getElementById('mode');

function handleSubmit(event) {
  event.preventDefault();

  const hex = colorPick.value.slice(1)

  const baseURL = "https://www.thecolorapi.com/scheme"
  const parameters = `?hex=${hex}&mode=${modePick.value}&count=5&format=json`


  fetch(`${baseURL}${parameters}`)
    .then(response => response.json())
    .then(data => {
      // clears up the colorbox and hexbox element. Because I have elements in it.
      colorBox.innerHTML = ''
      hexBox.innerHTML = ''

      // foor loop to add the elements and add the styles to the elements.
      for (let i = 0; i < data.count; i++) {
        // adds
      colorBox.innerHTML += `<div class="color-rainbow"></div>`
      colorBox.children[i].style.backgroundColor = data.colors[i].hex.value

      hexBox.innerHTML += `<div class="hex-color">${data.colors[i].hex.value}</div>`
      }
    })
  }

addEventListener('submit', handleSubmit)

function rgbToHex(data) {

  const rgbArray = data.match(/\d+/g);

  const hexColor = "#" +
    ("0" + parseInt(rgbArray[0], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgbArray[1], 10).toString(16)).slice(-2) +
    ("0" + parseInt(rgbArray[2], 10).toString(16)).slice(-2);

    return hexColor;
}


function handleCopy(event) {
  const hexValue = event.target.innerText
  const convertedHex = hexValue ? hexValue : rgbToHex((event.target.style.backgroundColor))


  console.log(convertedHex)

  navigator.clipboard.writeText(convertedHex)

}

colorBox.addEventListener('click', handleCopy)
hexBox.addEventListener('click', handleCopy)
