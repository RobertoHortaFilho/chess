function Pieces(boardTiles, inCheck){
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
                if (pieceColor[0] == 'king'){
                    inCheck()
                    return false
                }
                return true
            }
        }
        return false
    }

    function horseMove(tile, color = 'white'){
        const horse = tile
        const pos = horse.id.split('-')
        const x = parseInt(pos[0])
        const y = parseInt(pos[1])
        
        //right
        if (y + 2 < BOARDSIZE){
            if (x + 1 < BOARDSIZE){
                const move = tiles[x+1][y+2]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color )) move.classList.add('attack');
            }
            if (x - 1 >= 0){
                const move = tiles[x-1][y+2]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color)) move.classList.add('attack');
            }
        }
        //left
        if (y - 2 >= 0){
            if (x + 1 < BOARDSIZE){
                const move = tiles[x+1][y-2]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color )) move.classList.add('attack');
            }
            if (x - 1 >= 0){
                const move = tiles[x-1][y-2]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color )) move.classList.add('attack');
            }
        }
        //top
        if (x - 2 >= 0){
            if (y + 1 < BOARDSIZE){
                const move = tiles[x-2][y+1]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color )) move.classList.add('attack');
            }
            if (y - 1 >= 0){
                const move = tiles[x-2][y-1]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color )) move.classList.add('attack');
            }
        }
        //botton
        if (x + 2 < BOARDSIZE){
            if (y + 1 < BOARDSIZE){
                const move = tiles[x+2][y+1]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color )) move.classList.add('attack');
            }
            if (y - 1 >= 0){
                const move = tiles[x+2][y-1]
                if (cleanTile(move)) move.classList.add("move");
                else if (attackerTile(move, color )) move.classList.add('attack');
            }
        }

    }

    function pawnsMove(tile, color = 'white'){
        const pawns = tile
        const pos = pawns.id.split('-')
        const x = parseInt(pos[0])
        const y = parseInt(pos[1])
        if ((x - 1 < 0 && color == 'white') || (x+1 > BOARDSIZE && color == 'black')) return;
        console.log('color', color)
        let move
        if (color == 'white' ) {
            move = tiles[x-1][y]
            const atk1 = tiles[x-1][y+1];
            const atk2 = tiles[x-1][y-1];
            if (attackerTile(atk1, color)) {atk1.classList.add('attack');}
            if (attackerTile(atk2, color)) {atk2.classList.add('attack');}
        }else{
            move = tiles[x+1][y]
            const atk1 = tiles[x+1][y+1];
            const atk2 = tiles[x+1][y-1];
            if (attackerTile(atk1, color)) {atk1.classList.add('attack');}
            if (attackerTile(atk2, color)) {atk2.classList.add('attack');}
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

    function kingMove(tile, color = 'white'){
        const king = tile
        const pos = king.id.split('-')
        let x = parseInt(pos[0])
        let y = parseInt(pos[1])
        let move

        //diagonals

        if (x+1 < BOARDSIZE && y+1 <BOARDSIZE){
            move = tiles[x + 1][y + 1]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack'); 
        }

        if ( x-1 >= 0 && y-1 >= 0){    
            move = tiles[x - 1][y - 1]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack');
        }

        if ( x+1 < BOARDSIZE && y-1 >= 0){
            move = tiles[x + 1][y - 1]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack');
        }

        if ( x-1 >= 0 && y+1 < BOARDSIZE){
            move = tiles[x - 1][y + 1]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack');
        }

        //across
        if ( x-1 >= 0){
            move = tiles[x - 1][y]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack');
        }

        if ( x+1 < BOARDSIZE){
            move = tiles[x + 1][y]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack'); 
        }

        if (y + 1 < BOARDSIZE){
            move = tiles[x][y + 1]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack');
        }

        if (y - 1 >= 0){
            move = tiles[x][y - 1]
            if (cleanTile(move)) move.classList.add('move');
            else if (attackerTile(move, color )) move.classList.add('attack');
        }
    }

    function bishopMove(tile, color = 'white'){
        const bishop = tile
        const pos = bishop.id.split('-')
        //right botton
        let x = parseInt(pos[0]) + 1
        let y = parseInt(pos[1]) + 1
        while (x < BOARDSIZE && y < BOARDSIZE){
            let move = tiles[x][y]
            if (!cleanTile(move)) {
                if (attackerTile(move, color )) move.classList.add('attack');
                break;}
            move.classList.add('move');
            x++;
            y++;
        }
        //left top
        x = parseInt(pos[0]) - 1
        y = parseInt(pos[1]) - 1
        while (x >= 0 && y >= 0){
            let move = tiles[x][y]
            if (!cleanTile(move)) {
                if (attackerTile(move, color )) move.classList.add('attack');
                break;}
            move.classList.add('move');
            x--;
            y--;
        }
        //right top
        x = parseInt(pos[0]) - 1
        y = parseInt(pos[1]) + 1
        while (x >= 0 && y < BOARDSIZE){
            let move = tiles[x][y]
            if (!cleanTile(move)) {
                if (attackerTile(move, color )) move.classList.add('attack');
                break;}
            move.classList.add('move');
            x--;
            y++;
        }
        //left botton
        x = parseInt(pos[0]) + 1
        y = parseInt(pos[1]) - 1
        while (x < BOARDSIZE && y >= 0){
            let move = tiles[x][y]
            if (!cleanTile(move)) {
                if (attackerTile(move, color )) move.classList.add('attack');
                break;}
            move.classList.add('move');
            x++;
            y--;
        }
        
    }

    function towerMove(tile, color = 'white'){
        const tower = tile
        const pos = tower.id.split('-')
        
        //x = linhas
        //y = colunas
        let x = parseInt(pos[0]) + 1

        for (let i = x; i < BOARDSIZE ; i++){
            let move = tiles[i][pos[1]];
            if (!cleanTile(move)) {
                if (attackerTile(move, color )) move.classList.add('attack');
                break;}
            move.classList.add('move');
        }

        x = parseInt(pos[0]) - 1
        for (let i = x; i >= 0 ; i--){
            let move = tiles[i][pos[1]];
            if (!cleanTile(move)) {
                if (attackerTile(move, color )) move.classList.add('attack');
                break;}
            move.classList.add('move');
        }


        let y = parseInt(pos[1]) - 1
        for (let i = y; i >= 0; i--){
           let move = tiles[pos[0]][i];
           if (!cleanTile(move)) {
            if (attackerTile(move, color )) move.classList.add('attack');
            break;}
           move.classList.add('move')
        }
        y = parseInt(pos[1]) + 1
        for (let i = y; i < BOARDSIZE; i++){
           let move = tiles[pos[0]][i];
           if (!cleanTile(move)) {
            if (attackerTile(move, color )) move.classList.add('attack');
            break;}
           move.classList.add('move')
        }
    }

    const pieceMovement = {
        horse : horseMove,
        bishop : bishopMove,
        tower : towerMove,
        king : kingMove,
        pawns : pawnsMove,
        queen : (tile, color = 'white') =>{bishopMove(tile, color = 'white'); towerMove(tile, color = 'white')}
    }

    return pieceMovement

}


export { Pieces }