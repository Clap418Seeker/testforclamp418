import {Game} from './game.js';
import * as persons from './stats.js';
var args = process.argv.slice(2);
let [mages, monsters] = [[],[]];
if (args[0] == 'ghoul') {
    mages = persons.mage;
    monsters = persons.monster;
} else {
    mages = [persons.mage[0]];
    monsters = [persons.monster[0]];
}

const game = new Game(mages, monsters);
game.run();

