function Pieces(boardTiles){
    const tiles = boardTiles
    const BOARDSIZE = 8


    function cleanTile(tile){
        const classes = tile.className.split(' ')
        if (classes.includes('horse') ||
            classes.includes('tower') ||
            classes.includes('bishop') ||
            classes.includes('king') ||
            classes.includes('queen') ||
            classes.includes('pawns')
            ){
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