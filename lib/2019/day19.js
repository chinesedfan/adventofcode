const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    let count = 0;
    const grid = [];
    for (let i = 0; i < 50; i++) {
        grid[i] = [];
        for (let j = 0; j < 50; j++) {
            const output = getOutput(numbers, i, j);
            grid[i][j] = output === 0 ? '.' : '#';
            if (output) {
                count++;
            }
        }
    }

    console.log(grid.map((r) => r.join('')).join('\n'));
    console.log(count);
};

function getOutput(numbers, x, y) {
    const g = run([...numbers]);

    let a = g.next();
    a = g.next(x);
    a = g.next(y);
    if (a.value === 'input') throw new Error('should output now');

    // console.log(x, y, a.value);
    return +a.value;
}
