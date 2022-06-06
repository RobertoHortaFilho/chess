function Pieces(boardTiles){
    const tiles = boardTiles
    const BOARDSIZE = 8


    function cleanTile(tile){
        const classes = tile.className.split(' ')
        if (classes.length > 1){
            return false
        }

        return true
    }
    function attackerTile(tile, color = 'white'){
        const classes = tile.className.split(' ')
        if (classes.length > 1 && classes[1] != 'move'){
            const pieceColor = classes[1].split('-')
            if (color != pieceColor[1]){
                return true
            }
        }
        return false
    }

    function horseMove(color = 'white'){
        const horse = document.getElementsByClassName('selected')[0]
        const pos = horse.id.split('-')
        const x = parseInt(pos[0])
        const y = parseInt(pos[1])
        //right

            ///////////teste do attacker
        let teste = tiles[0][0]
        let cla = horse.className.split(' ')[1]
        let c = cla.split('-')[1]
        if (attackerTile(teste, c)){
            teste.classList.add('attack')
        }
            ///////////end

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

    function pawnsMove(color = 'white'){
        const pawns = document.getElementsByClassName('selected')[0]
        const pos = pawns.id.split('-')
        const x = parseInt(pos[0])
        const y = parseInt(pos[1])
        if ((x - 1 < 0 && color == 'white') || (x+1 > BOARDSIZE && color == 'black')) return;
        console.log('color', color)
        let move
        if (color == 'white' ) {
            move = tiles[x-1][y]
        }else{
            move = tiles[x+1][y]
        }
        if (cleanTile(move)) {move.classList.add('move');}else{return}

        //first move
        if ( x == 6 && color == 'white'){
            const doubleMove = tiles[x-2][y]
            if (cleanTile(doubleMove)) {
                doubleMove.classList.add('move')
            }
        }else if ( x == 1 && color == 'black'){
            const doubleMove = tiles[x+2][y]
            if (cleanTile(doubleMove)){
                doubleMove.classList.add('move')
            }
        }
    }

    function kingMove(color = 'white'){
        const king = document.getElementsByClassName('selected')[0]
        const pos = king.id.split('-')
        let x = parseInt(pos[0])
        let y = parseInt(pos[1])
        let move

        //diagonals

        if (x+1 < BOARDSIZE && y+1 <BOARDSIZE){
            move = tiles[x + 1][y + 1]
            if (cleanTile(move)) move.classList.add('move')    
        }

        if ( x-1 >= 0 && y-1 >= 0){    
            move = tiles[x - 1][y - 1]
            if (cleanTile(move)) move.classList.add('move')
        }

        if ( x+1 < BOARDSIZE && y-1 >= 0){
            move = tiles[x + 1][y - 1]
            if (cleanTile(move)) move.classList.add('move')
        }

        if ( x-1 >= 0 && y+1 < BOARDSIZE){
            move = tiles[x - 1][y + 1]
            if (cleanTile(move)) move.classList.add('move')    
        }

        //across
        if ( x-1 >= 0){
            move = tiles[x - 1][y]
            if (cleanTile(move)) move.classList.add('move')    
        }

        if ( x+1 < BOARDSIZE){
            move = tiles[x + 1][y]
            if (cleanTile(move)) move.classList.add('move')    
        }

        if (y + 1 < BOARDSIZE){
            move = tiles[x][y + 1]
            if (cleanTile(move)) move.classList.add('move')    
        }

        if (y - 1 >= 0){
            move = tiles[x][y - 1]
            if (cleanTile(move)) move.classList.add('move')
        }
    }

    function bishopMove(color = 'white'){
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

    function towerMove(color = 'white'){
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

    const pieceMovement = {
        horse : horseMove,
        bishop : bishopMove,
        tower : towerMove,
        king : kingMove,
        pawns : pawnsMove,
        queen : () =>{bishopMove(); towerMove()}
    }

    return pieceMovement

}


export { Pieces }