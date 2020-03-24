﻿const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");
const request = require('supertest');
const controllers = require('../src/controller');

const appGenerator = require('../src/gameserver');
let step = 0;
const generateSessionId = () => 'TestSession' + step++;
let sessionId = null;


let lastError = null;

app = null;

Given("пустое поле", function() {
    sessionId = generateSessionId();
    app = appGenerator(sessionId);
    controllers.setState(null, sessionId);
});

Given("поле {string}", function(save) {
    sessionId = generateSessionId();
    app = appGenerator(sessionId);
    controllers.setState(parseSave(save), sessionId);
});

Given("ходит игрок {int}", function(player) {
    controllers.selectPlayer(player, sessionId);
});

When("игрок ходит в клетку {int}, {int}", function(x,y) {
    return request(app)
        .post('/move')
        .send({x, y})
        .expect(200)
        .then((res) => {
            lastError = null;
        })
        .catch((err) => {
            lastError = err;
        });
});

Then("поле становится {string}", function(save) {
    return request(app)
        .get('/getFIeld')
        .expect(200)
        .then((res) => {
            expect(serializeGame(res.body)).to.eql(save);
        });
});

Then("возвращается ошибка", function() {
    expect(lastError).to.not.be.null;
});

Then("победил игрок {int}", function(player) {
    expect(controllers.getWinner(sessionId)).to.eql(player);
});

Then("ничья", function() {
    expect(controllers.getWinner(sessionId)).to.eql(-1);
});

function parseSave(save) {
    const lines = save.split('|');
    return lines.map( x => x.split('').map(d => +d));
}

function serializeGame(game) {
    if (game.constructor === String) game = JSON.parse(game);
    const lines = game.map(x => x.join(''));
    return lines.join('|');
}