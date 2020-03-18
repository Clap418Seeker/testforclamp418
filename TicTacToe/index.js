const Game = require('./tictactoe');
const show = require('./show');
const readlineSync = require('readline-sync'); 
const game = new Game();

function showGame(_game, err) {
    process.stdout.write('\033c');
    show(_game.getGameData());
    if (err) {
        console.log(err);
    }
}

let turn = false;
let errMessage = null;
do {
    showGame(game, errMessage);
    errMessage = null;
    console.log(`Ходит игрок № ${game.currentPlayer}`);
    let col = readlineSync.questionInt("Column? >");
    let row = readlineSync.questionInt("Row? >");
    try {
        turn = game.turn(col, row);
    } catch (err) {
        errMessage = err.message;
    }
    
} while (!turn);
showGame(game);
console.log(`Победил игрок №${game.getWinner()}`);