const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    const dirs = [
        {x: 0, y: 1}, // up
        {x: 1, y: 0}, // right
        {x: 0, y: -1}, // down
        {x: -1, y: 0}, // left
    ];

    const visited = {};
    const p = {x: 0, y: 0};
    let di = 0;

    const g = run([...numbers]);
    let a;
    while (1) {
        a = g.next();
        if (a.done) break;
        if (a.value !== 'input') throw new Error('should input now');
        const input = visited[key(p)] || 0; // default is black

        a = g.next(input);
        if (a.value === 'input') throw new Error('should output now');
        // set color
        visited[key(p)] = +a.value;

        a = g.next();
        if (a.value === 'input') throw new Error('should output now');
        // direction
        if (+a.value) {
            di++;
            if (di >= dirs.length) di = 0;
        } else {
            di--;
            if (di < 0) di = dirs.length - 1;
        }
        p.x += dirs[di].x;
        p.y += dirs[di].y;
    }

    console.log(Object.keys(visited).length);
};

function key(p) {
    return p.x + '#' + p.y;
}
