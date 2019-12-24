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

    const def = (part == 1 ? 0 : 1); // part 1 is black, and part 2 is white
    const g = run([...numbers]);
    let a;
    while (1) {
        a = g.next();
        if (a.done) break;
        if (a.value !== 'input') throw new Error('should input now');
        const input = visited[key(p)] || def;

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

    print(visited, def);
};

function key(p) {
    return p.x + '#' + p.y;
}

function print(game, def) {
    const result = [];
    for (let i = 0; i < 20; i++) {
        result[20 - i] = [];
        for (let j = 0; j < 60; j++) {
            const k = key({x: j - 10, y: i - 10});
            const ch = (k in game ? game[k] : def) === 0 ? '.' : '#';
            result[20 - i].push(ch);
        }
    }

    console.log(result.map((r) => r.join('')).join('\n'));
}
