import {BoardFactory} from './Board.js'



const chessGame = BoardFactory()
console.log(chessGame)
chessGame.createTiles()
chessGame.createHorse([3,4])
 


