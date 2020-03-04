const checkNumbers = (num, answer) => {
    let result = [[], []];
    const len = answer.length;
    for (let i = 0; i < len; i++) {
        let curNum = answer[i];       
        if (i < num.length && num[i] == curNum) {
            result[0].push(curNum);

        } else if (num.includes(curNum)) {
            result[1].push(curNum);
        }  
    }
    return result;
};

module.exports = {
    checkNumbers: checkNumbers
};