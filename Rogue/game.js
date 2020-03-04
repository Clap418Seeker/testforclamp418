import {Person} from './person.js';
export class Game {
    _persons = [];
    get _endGame() { return this._persons.filter(x => x.health > 0 ).length > 1; }

    constructor(mages, monsters) {
        let magesPersons = mages ? mages.map(x => new Person(x, false)) : [];
        let monstersPersons = monsters ? monsters.map(x => new Person(x, true)) : [];
        this._persons = magesPersons.concat(monstersPersons);
    }

    run() {
        let turn = 0;
        do {
            //console.log(`Turm ${turn++}`);
            this._persons.forEach(x => x.prepare());
            this._persons.forEach(x => x.move(this.getTargets(x)));
            this._persons.forEach(x => x.run());
            this._persons.forEach((x, i) => x.display(i));
            console.log("=============== End Turn ====================");
        } while (this._endGame);

        let winner = this._persons.find(x => x.health > 0);
        if (winner)
            console.log(`Победил: ${winner._stats.name}!`);
        else 
            console.log('Все умерли :(');
    }


    getTargets(self) {
        return this._persons.filter(x => x.health > 0 && x.hasMoves && x != self);
    }
}