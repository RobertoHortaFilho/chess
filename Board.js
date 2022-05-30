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
                slot.id = i + '-' + j 
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
                horseMove()
                
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

    function cleanTile(tile){
        const classes = tile.className.split(' ')
        if (classes.includes('horse') ||
            classes.includes('tower')){
            return false
        }

        return true
    }

    function horseMove(){
        const horse = document.getElementsByClassName('selected')[0]
        const pos = horse.id.split('-')
        const x = parseInt(pos[0])
        const y = parseInt(pos[1])
        //right
        if (y + 2 < BOARDSIZE){
            if (x + 1 < BOARDSIZE){
                let move = tiles[x+1][y+2]
                if (cleanTile(move)) move.classList.add("move")
            }
            if (x - 1 >= 0){
                let move = tiles[x-1][y+2]
                if (cleanTile(move)) move.classList.add("move")
            }
        }
        //left
        if (y - 2 >= 0){
            if (x + 1 < BOARDSIZE){
                let move = tiles[x+1][y-2]
                if (cleanTile(move)) move.classList.add("move")
            }
            if (x - 1 >= 0){
                let move = tiles[x-1][y-2]
                if (cleanTile(move)) move.classList.add("move")
            }
        }
        //top
        if (x - 2 >= 0){
            if (y + 1 < BOARDSIZE){
                let move = tiles[x-2][y+1]
                if (cleanTile(move)) move.classList.add("move")
            }
            if (y - 1 >= 0){
                let move = tiles[x-2][y-1]
                if (cleanTile(move)) move.classList.add("move")
            }
        }
        //botton
        if (x + 2 < BOARDSIZE){
            if (y + 1 < BOARDSIZE){
                let move = tiles[x+2][y+1]
                if (cleanTile(move)) move.classList.add("move")
            }
            if (y - 1 >= 0){
                let move = tiles[x+2][y-1]
                if (cleanTile(move)) move.classList.add("move")
            }
        }

    }

    function pawnsMove(){
        const pawns = document.getElementsByClassName('selected')[0]
        const pos = pawns.id.split('-')
        const x = parseInt(pos[0])
        const y = parseInt(pos[1])
        if (x - 1 < 0) return;
        const move = tiles[x-1][y]
        if (cleanTile(move)) move.classList.add('move');
    }

    function kingMove(){
        const king = document.getElementsByClassName('selected')[0]
        const pos = king.id.split('-')
        let x = parseInt(pos[0])
        let y = parseInt(pos[1])
        //diagonals
        let move = tiles[x + 1][y + 1]
        if (cleanTile(move)) move.classList.add('move')
        move = tiles[x - 1][y - 1]
        if (cleanTile(move)) move.classList.add('move')
        move = tiles[x + 1][y - 1]
        if (cleanTile(move)) move.classList.add('move')
        move = tiles[x - 1][y + 1]
        if (cleanTile(move)) move.classList.add('move')
        //across
        move = tiles[x - 1][y]
        if (cleanTile(move)) move.classList.add('move')
        move = tiles[x + 1][y]
        if (cleanTile(move)) move.classList.add('move')
        move = tiles[x][y + 1]
        if (cleanTile(move)) move.classList.add('move')
        move = tiles[x][y - 1]
        if (cleanTile(move)) move.classList.add('move')
    }

    function bishopMove(){
        const bishop = document.getElementsByClassName('selected')[0]
        const pos = bishop.id.split('-')
        //right botton
        let x = parseInt(pos[0]) + 1
        let y = parseInt(pos[1]) + 1
        while (x < BOARDSIZE && y < BOARDSIZE){
            let move = tiles[x][y]
            if (!cleanTile(move)) break;
            move.classList.add('move');
            x++;
            y++;
        }
        //left top
        x = parseInt(pos[0]) - 1
        y = parseInt(pos[1]) - 1
        while (x >= 0 && y >= 0){
            let move = tiles[x][y]
            if (!cleanTile(move)) break;
            move.classList.add('move');
            x--;
            y--;
        }
        //right top
        x = parseInt(pos[0]) - 1
        y = parseInt(pos[1]) + 1
        while (x >= 0 && y < BOARDSIZE){
            let move = tiles[x][y]
            if (!cleanTile(move)) break;
            move.classList.add('move');
            x--;
            y++;
        }
        //left botton
        x = parseInt(pos[0]) + 1
        y = parseInt(pos[1]) - 1
        while (x < BOARDSIZE && y >= 0){
            let move = tiles[x][y]
            if (!cleanTile(move)) break;
            move.classList.add('move');
            x++;
            y--;
        }
        
    }

    function towerMove(){
        const tower = document.getElementsByClassName('selected')[0]
        const pos = tower.id.split('-')
        
        //x = linhas
        //y = colunas
        let x = parseInt(pos[0]) + 1

        for (let i = x; i < BOARDSIZE ; i++){
            let move = tiles[i][pos[1]];
            if (!cleanTile(move)) break;
            move.classList.add('move');
        }

        x = parseInt(pos[0]) - 1
        for (let i = x; i >= 0 ; i--){
            let move = tiles[i][pos[1]];
            if (!cleanTile(move)) break;
            move.classList.add('move');
        }


        let y = parseInt(pos[1]) - 1
        for (let i = y; i >= 0; i--){
           let move = tiles[pos[0]][i];
           if (!cleanTile(move)) break;
           move.classList.add('move')
        }
        y = parseInt(pos[1]) + 1
        for (let i = y; i < BOARDSIZE; i++){
           let move = tiles[pos[0]][i];
           if (!cleanTile(move)) break;
           move.classList.add('move')
        }
        

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
        createTiles,
        createHorse,
        createTower,
    }
}

export  {BoardFactory}