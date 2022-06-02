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
        if (classes.includes('horse-white') || 
        classes.includes('bishop-white') ||
        classes.includes('tower-white') ||
        classes.includes('king-white') ||
        classes.includes('queen-white') ||
        classes.includes('pawns-white')
        ){ //adicionar as outras peças
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

    function createHorse(position){
        tiles[position[0]][position[1]].classList.add("horse-white")
    }
    function createTower(position){
        tiles[position[0]][position[1]].classList.add("tower-white")
    }
    function createBishop(position){
        tiles[position[0]][position[1]].classList.add("bishop-white")
    }
    function createKing(position){
        tiles[position[0]][position[1]].classList.add("king-white")
    }
    function createQueen(position){
        tiles[position[0]][position[1]].classList.add("queen-white")
    }
    function createPawns(position){
        tiles[position[0]][position[1]].classList.add("pawns-white")
    }

    function createWhiteSide(){
        for (let i = 0;  i < BOARDSIZE; i++){
            createPawns([6,i])
        }
        createTower([7,0])
        createTower([7,7])

        createHorse([7,1])
        createHorse([7,6])

        createBishop([7,2])
        createBishop([7,5])
        
        createKing([7,4])
        createQueen([7,3])

    }

    createWhiteSide()

    //debug
    window.createWhite = createWhiteSide
    
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