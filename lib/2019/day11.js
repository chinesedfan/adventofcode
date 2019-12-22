const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    const dirs = [
        {x: 0, y: 1}, // up
        {x: 1, y: 0}, // right
        {x: 0, y: -1}, // down
        {x: -1, y: 0}, // left
    ];

    const grid = {};
    const visited = {};
    const p = {x: 0, y: 0};
    let di = 0;

    const g = run([...numbers]);
    const outputs = [];

    let a;
    let input;
    do {
        a = g.next(input);
        if (a.value === 'input') {
            input = grid[key(p)] || 0; // default is black
        } else {
            grid[key(p)] = +a.value;
            outputs.push(+a.value);
        }
    } while (!a.done);

    outputs.forEach((n, i) => {
        if (i & 1) {
            // direction
            if (n) {
                di++;
                if (di >= dirs.length) di = 0;
            } else {
                di--;
                if (di < 0) di = dirs.length - 1;
            }
        } else {
            // color
            visited[key(p)] = 1;
            p.x += dirs[di].x;
            p.y += dirs[di].y;
        }
    });

    console.log(Object.keys(visited).length);
};

function key(p) {
    return p.x + '#' + p.y;
}
