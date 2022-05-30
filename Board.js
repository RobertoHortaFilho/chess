import { Pieces } from './pieces.js'

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

    
    let colorInvert = false
    for (let i = 0; i < BOARDSIZE; i ++ ){
        colorInvert = !colorInvert
        for (let j = 0; j < BOARDSIZE; j++){
            let slot = document.createElement('div')
            slot.className = 'slot'
            slot.id = i + '-' + j 
            slot.style.backgroundColor = colorInvert ? '#746A9C' : '#E8D5C5';
            slot.addEventListener('click',_onClick)
            colorInvert = !colorInvert;
            tiles[i][j] = slot;
            board.appendChild(tiles[i][j])
        }
    }

    const pieces = Pieces(tiles)

    //


    function _onClick(){
        const tile = event.target
        const classes = tile.className.split(' ')
        //console.log(classes)
        if (classes.includes('horse')){ //adicionar as outras peças
            if (classes.includes('selected')){
                tile.classList.remove('selected')
                onMouse.piece = '';
                onMouse.element = undefined;
                disableOthersSelected()
            }else{
                onMouse.piece = classes[1]
                onMouse.element = tile
                disableOthersSelected()
                tile.classList.add('selected')
                pieces.horseMove()
                
            }
        }else{
            if (onMouse.piece != '' && onMouse.element){
                //pode mover para la
                if (classes.includes('move')){
                    onMouse.element.classList.remove(onMouse.piece)
                    tile.classList.add(onMouse.piece)
                    onMouse.piece = ''
                    onMouse.element = undefined
                    disableOthersSelected()
                }
            }
        }
        
        //console.log(onMouse)
        //console.log(document.getElementsByClassName('move'))
    }

    function disableOthersSelected(){
        const selecteds = document.getElementsByClassName('selected')
        for (let selectd of selecteds){
            selectd.classList.remove('selected')
        }
        disableOthersMove()
    }
    function disableOthersMove(){
        const moveds = document.querySelectorAll('.move')
        for (let moved of moveds){
            moved.classList.remove('move')
        }
    }




    function createHorse(position){
        tiles[position[0]][position[1]].classList.add("horse")
    }
    function createTower(position){
        tiles[position[0]][position[1]].classList.add("tower")
    }

    window.disableOthers = disableOthersMove
    

    
    return {
        tiles,
        createHorse,
        createTower,
    }
}

export  {BoardFactory}