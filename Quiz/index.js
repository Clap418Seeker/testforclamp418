const fs = require('fs');
const random = require('./random');
const readlineSync = require('readline-sync');
const folderPath = `${__dirname}\\questions\\`;
const files = fs.readdirSync(folderPath);

getRandomNumbers = () => {
    let arr = [];
    while(arr.length < 5){
        let r = random.getRandom(0, files.length - 1);
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
};

let randomFileNumbers = getRandomNumbers();
let goodAnswer = 0;
for (let i = 0; i < 5; i++) {
    let fileName = folderPath + files[randomFileNumbers[i]];
    console.log(fileName);
    const data = fs.readFileSync(fileName, 'utf8');
    let lines = data.split('\n');
    console.log(lines[0]);
    for(let l = 2; l< lines.length; l++) {
        console.log(`${l - 1}. ${lines[l]}`);
    }
    let answer = readlineSync.question('Ваш ответ? ');
    console.log(`${answer} ?? ${lines[1]}`);
    if (+answer == +(lines[1])) {
        goodAnswer++;
    }
}
console.log(`Всего правильных ответов: ${goodAnswer}`);
