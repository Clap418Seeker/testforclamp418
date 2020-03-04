import * as random from './random.js';
import * as readlineSync from 'readline-sync';
export class Person {
    _stats = {};

    health = 0;
    ai = true;
    _moves = [];
    target = null;
    currentMove = null;
    isDead = false;

    constructor(stats, ai) {
        this._stats = stats;
        if (stats.maxHealth == null) {
            this.health = readlineSync.default.question(`Введите количество здоровья ${this._stats.name} `);
        } else {
            this.health = stats.maxHealth;
        }
        this._moves = stats.moves.map(x => new Action(x));
        this.ai = ai;
    }

    display = (index) =>{
        const showPersonStat = `${index}. ${this._stats.name}` + ((this.health > 0) 
            ? ` (здоровье: ${this.displayHealth})`
            : ' (мертв)');
        console.log(showPersonStat); 
    }
    get displayHealth() { return Math.round(this.health * 10) / 10; } 
    get activeMoves() { return this._moves.filter(x => x._cooldown == 0); }
    get hasMoves() { return this.activeMoves.length > 0; }

    move(targets) {
        if (this.isDead) return;
        if (!this.hasMoves) { 
            console.log(`${this._stats.name} пропускает ход`);
            this._moves.forEach(x => x.tik());
            return; 
        }

        this.currentMove = this.ai 
            ? this.aiMove(targets) 
            : this.userMove(targets); 
    }

    aiMove(targets) {
        let moves = this.activeMoves;
        if (targets.length > 1) {
            const targetIndex = random.getRandom(0, targets.length - 1);
            this.target = targets[targetIndex];
        } else {
            this.target = targets[0];
        }

        const selectMoveIndex = random.getRandom(0, moves.length - 1);
        return moves[selectMoveIndex];
    }

    userMove(targets) {
        let moves = this.activeMoves;
        if (targets.length > 1) {
            console.log('Цели:');
            targets.forEach((x, i) => x.display(i));
            const targetIndex = readlineSync.default.question('Кого атаковать? ');
            this.target = targets[targetIndex];
        } else {
            this.target = targets[0];
        }

        console.log('Действия:');
        moves.forEach((x, i) => x.show(i));
        this._moves.filter(x => !x.ready).forEach((x) => x.show());
        const selectMoveIndex = readlineSync.default.question('Ваше действие? ');
        return moves[selectMoveIndex];
    }

    run() {
        if (this.isDead) return;
        let [pArm, mArm] = this.target.target == this 
            ? [this.target.currentMove._stats.physicArmorPercents, this.target.currentMove._stats.magicArmorPercents]
            : [0, 0];
        
        const damage = this.currentMove.use(pArm, mArm);
        console.log(`${this._stats.name} -> ${this.target._stats.name} [${this.currentMove._stats.name} (${damage})]`);
        this.target.doDamage(damage);
    }

    doDamage(damage) {
        this.health -= damage;
    }

    prepare() {
        this._moves.filter(x => x != this.currentMove).forEach(x => x.tik());
        this.target = null;
        this.currentMove = null;
        this.isDead = this.health <= 0;
    }

}

class Action {
    _stats = {};
    _cooldown = 0;
    constructor(stat) {
        this._stats = stat;
    }

    get display() { return `${this._stats.name} [p: ${this._stats.physicalDmg}, m: ${this._stats.magicDmg}, pArm: ${this._stats.physicArmorPercents}, mArm: ${this._stats.magicArmorPercents}]`; }
    get ready() { return this._cooldown == 0; }
    show(index) {
        const ready = this.ready;
        const color = ready ? 'green' : 'red';
        const indexStr = ready ? `${index}. ` : '';
        const cooldown = !ready ? ` (осталось: ${this._cooldown}) ходов` : '' 
        console.log('%c%s', `color: ${color};`,indexStr + this.display + cooldown);
    }

    use(physicArmorPercents, magicArmorPercents) {
        this._cooldown = this._stats.cooldown;
        return this._stats.physicalDmg * (1 - (physicArmorPercents / 100)) + this._stats.magicDmg * (1 - (magicArmorPercents / 100))
    }

    tik() {
        if (this._cooldown > 0) this._cooldown--;
    }
}