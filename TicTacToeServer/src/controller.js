const util = require('util');
const Session = require('./game-session');
const Game = require('./game/tictactoe');
const GameError = require('./game/error');
const { SESSION_TIMEOUT } = require('./constants');

let sessions = new Session(() => new Game(), SESSION_TIMEOUT);

function getGame(sessionId) {
    if (!sessionId) throw new GameError(`Id игровой сессии не определен ${sessionId}`);
    return sessions[sessionId];
}

function getField(sessionId) {
    const game = getGame(sessionId);
    return game.getGameData();
}

function move(x, y, sessionId) {
    const game = getGame(sessionId);
    try {
        game.turn(x, y);
    } catch (err) {
        return err.message;
    }
}

function setState(state, sessionId) {
    sessions[sessionId] = new Game(state);
}

function selectPlayer(player, sessionId) {
    sessions[sessionId].currentPlayer = player
}

function getWinner(sessionId) {
    return sessions[sessionId].getWinner();
}

module.exports = {
    getField,
    move,
    setState,
    selectPlayer,
    getWinner
};

