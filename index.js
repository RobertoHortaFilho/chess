import {BoardFactory} from './Board.js'



const chessGame = BoardFactory()
console.log(chessGame)
chessGame.createTiles()
chessGame.createHorse([3,4])
chessGame.createHorse([2,3])
chessGame.createHorse([4,2])
 


