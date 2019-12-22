const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    const g = run([...numbers]);
    let outputs = [];

    let a;
    let input;
    do {
        a = g.next(input);
        if (a.value === 'input') {
            throw new Error('I have no input');
        } else {
            outputs.push(+a.value);
        }
    } while (!a.done);

    const lines = String.fromCharCode(...outputs).split('\n');
    const result = lines.reduce((sum, line, r) => {
        for (let c = 0; c < line.length; c++) {
            if (check(lines, r, c)) sum += r * c;
        }
        return sum;
    }, 0);

    console.log(result);
};

function check(lines, r, c) {
    return isPath(lines, r, c)
        && isPath(lines, r, c - 1) && isPath(lines, r, c + 1)
        && isPath(lines, r - 1, c) && isPath(lines, r + 1, c);
}
function isPath(lines, r, c) {
    return r >= 0 && r < lines.length
        && c >= 0 && c < lines[0].length
        && lines[r][c] === '#';
}
