function show(game) {
    const len = game.length - 1;
    paint(len, "┌", "┬", "─", "┐");
    let line = "│";
    for(let row = 0; row < len + 1; row++) {
        const mapStr = game[row].map(x => x 
            ? x === 1 
                ? "X"
                : "O"
            : " "
        );  
        let rowStr = `${line}${mapStr.join(line)}${line}`;
        console.log(rowStr);
        if (row != len)
            paint(len, "├","┼", "─","┤");
    }
    paint(len, "└", "┴", "─", "┘");
}

function paint(len, ...pattern) {
    let start = pattern[0];
    let middle = pattern[0];
    let char = pattern[0];
    let end = pattern[0];
    if (pattern.length > 1) {
        middle = pattern[1];
        char = pattern[2];
        end = pattern[3];
    }
    let draw = start + Array(len).fill(char + middle).join('') + char + end;
    console.log(draw);
}

module.exports = show;