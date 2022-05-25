function BoardFactory (){
    const tiles = []
    const BOARDSIZE = 8
    const board = document.querySelector(".board")
    const onMouse = {
        piece : '',
        element : undefined
    }
     


    // create slots in array
    for (let i = 0; i < BOARDSIZE; i ++ ){
        tiles[i] = []
        for (let j = 0; j < BOARDSIZE; j++){
            tiles[i][j] = undefined
        }
    }




    function createTiles(){
        let colorInvert = false
        for (let i = 0; i < BOARDSIZE; i ++ ){
            colorInvert = !colorInvert
            for (let j = 0; j < BOARDSIZE; j++){
                let slot = document.createElement('div')
                slot.className = 'slot'
                slot.style.backgroundColor = colorInvert ? '#746A9C' : '#E8D5C5';
                slot.addEventListener('click',_onClick)
                colorInvert = !colorInvert;
                tiles[i][j] = slot;
                board.appendChild(tiles[i][j])
            }
        }
        console.log("criado")
    }


    function _onClick(){
        const tile = event.target
        const classes = tile.classList
        if (classes.length > 1){
            onMouse.piece = classes[1]
            onMouse.element = tile
            //console.log(onMouse)
            tile.className = 'slot'
        }else{
            if (onMouse.piece != '' && onMouse.element){
                tile.classList.add(onMouse.piece)
                onMouse.piece = ''
                onMouse.element = undefined
            }
        }
        //console.log("fim")
    }

    function createHorse(position){
        tiles[position[0]][position[1]].classList.add("horse")
    }

    return {
        tiles,
        createTiles,
        createHorse,
    }
}

export  {BoardFactory}