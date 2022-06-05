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
        console.log(classes)
        if (classes.length > 1 && classes[1] != 'move'){ //adicionar as outras peças
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
                pieces[onMouse.piece.split('-')[0]]() //executa os possiveis movimentos da peça selecionada 
                
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


    // "horse" "tower" "bishop" "king" "queen" "pawns"
    // setAtribute
    // getAtribute

    function createHorse(position, color='white'){
        tiles[position[0]][position[1]].classList.add(`horse-${color}`)
    }
    function createTower(position, color='white'){
        tiles[position[0]][position[1]].classList.add(`tower-${color}`)
    }
    function createBishop(position, color='white'){
        tiles[position[0]][position[1]].classList.add(`bishop-${color}`)
    }
    function createKing(position, color='white'){
        tiles[position[0]][position[1]].classList.add(`king-${color}`)
    }
    function createQueen(position, color='white'){
        tiles[position[0]][position[1]].classList.add(`queen-${color}`)
    }
    function createPawns(position, color='white'){
        tiles[position[0]][position[1]].classList.add(`pawns-${color}`)
    }

    function createBoard(){
        for (let i = 0;  i < BOARDSIZE; i++){
            createPawns([6,i],'white')
            createPawns([1,i],'black')
        }
        createTower([7,0],'white')
        createTower([7,7],'white')

        createTower([0,0],'black')
        createTower([0,7],'black')

        createHorse([7,1],'white')
        createHorse([7,6],'white')

        createHorse([0,1],'black')
        createHorse([0,6],'black')

        createBishop([7,2],'white')
        createBishop([7,5],'white')

        createBishop([0,2],'black')
        createBishop([0,5],'black')
        
        createKing([7,4],'white')
        createQueen([7,3],'white')

        createKing([0,4],'black')
        createQueen([0,3],'black')

    }

    
    //debug
    createBoard()
    window.createBoard = createBoard
    
    return {
        tiles,
        createHorse,
        createTower,
        createBishop,
        createKing,
        createQueen,
        createQueen,
        createPawns,
    }
}

export  {BoardFactory}