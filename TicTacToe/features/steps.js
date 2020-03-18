const { Given, When, Then } = require("cucumber");
const { expect, assert } = require("chai");
const Game = require('../tictactoe');
const GameError = require('../error');

let data = {};

Given("пустое поле", function() {
    data = {...data, game: new Game()};
});

Given("поле {string}", function(save) {
    data = {...data, game: new Game(parseSave(save))};
});

Given("ходит игрок {int}", function(player) {
    data.game.currentPlayer = player;
});

When("игрок ходит в клетку {int}, {int}", function(x,y) {
    data = {...data, invoke: () => {
            data.game.turn(x, y);
        }};
});

Then("поле становится {string}", function(save) {
    data.invoke();
    expect(serializeGame(data.game.getGameData())).to.eql(save);
});

Then("возвращается ошибка", function() {
    expect(data.invoke).to.throw(GameError);
    data.invoke = () => {};
});

Then("победил игрок {int}", function(player) {
    data.invoke();
    expect(data.game.getWinner()).to.eql(player);
});

function parseSave(save) {
    const lines = save.split('|');
    return lines.map( x => x.split('').map(d => +d));
}

function serializeGame(game) {
    const lines = game.map(x => x.join(''));
    return lines.join('|');
}