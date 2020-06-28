const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);
    const limit = part == 1 ? 50 : 1100;
    const size = 100;

    let count = 0;
    let prevStart = 0;
    const grid = [];
    for (let i = 0; i < limit; i++) {
        if (!(i % 100)) console.log('scan row=' + i);

        grid[i] = [];
        // the next start is larger than the previous one
        let j = prevStart;
        prevStart = -1;
        for (; j < (part == 1 ? limit : limit + size); j++) {
            const output = getOutput(numbers, i, j);
            grid[i][j] = output === 0 ? '.' : '#';
            if (output) {
                count++;
                prevStart = prevStart < 0 ? j : prevStart;
            } else {
                if (prevStart >= 0) break;
            }
        }
    }

    if (part == 1) {
        console.log(grid.map((r) => r.join('')).join('\n'));
        console.log(count);
    } else {
        find(grid, size);
    }
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

function find(grid, size) {
    // suppose # are continous in each row
    const rows = grid.map((line) => line.reduce((o, ch, i) => {
        if (ch === '#') {
            o.count++;
            o.start = Math.min(o.start, i);
            o.end = Math.max(o.end, i);
        }
        return o;
    }, {
        start: Infinity,
        end: -Infinity,
        count: 0
    }));

    let i = 0;
    while (i < rows.length) {
        const { end } = rows[i];
        if (valid(rows, i, end - size + 1, size)) break;

        i++;
    }
}

function valid(rows, row, col, size) {
    for (let i = 0; i < size; i++) {
        const { start, end, count } = rows[row + i];
        if (count < size
            || !between(start, end, col)
            || !between(start, end, col + size - 1)) return false;
    }
    console.log(col * 10000 + row);
    return true;
}
function between(start, end, col) {
    return col >= start && col <= end;
}
