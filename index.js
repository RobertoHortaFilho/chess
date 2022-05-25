const board = document.querySelector(".board")


let colorInvert = true
for (let  i = 0; i<64; i++){
    const slot = document.createElement('div')
    slot.className = 'slot horse'
    slot.style.backgroundColor = colorInvert ? '#746A9C' : '#E8D5C5';
    if (i % 8 != 7) colorInvert = !colorInvert
    board.appendChild(slot)
}