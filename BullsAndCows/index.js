const random = require('./random');
const readlineSync = require('readline-sync');
const game = require('./game');
const tryingCount = 15;

const num = ""+random.getRandom(100, 999999);
for(let i = 0; i < tryingCount; i++) {
    let userAnswer = readlineSync.question('Число? ');
    let result = game.checkNumbers(num, userAnswer);

    console.log(`совпавших цифр не на своих местах - ${result[1].length} (${result[1].join(', ')}), цифр на своих местах - ${result[0].length} (${result[0].join(', ')})`)
    if (result[0].length == num.length) {
        console.log("Отгадали!");
        process.exit(0);
    }
}

console.log(`Попытки закончились - ${num}`);