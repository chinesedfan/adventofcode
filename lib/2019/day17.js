const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);
    // numbers[0] = part;

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
    (part === 1 ? f1 : f2)(lines);
};

function f1(lines) {
    const result = lines.reduce((sum, line, r) => {
        for (let c = 0; c < line.length; c++) {
            if (check(lines, r, c)) sum += r * c;
        }
        return sum;
    }, 0);

    console.log(result);
}
function f2(lines) {
    let p;
    for (let r = 0; r < lines.length; r++) {
        for (let c = 0; c < lines[r].length; c++) {
            if (lines[r][c] === '^') {
                p = [r, c];
                break;
            }
        }
    }

    const routes = [];
    const dirs = [
        {c: 0, r: -1}, // up
        {c: 1, r: 0}, // right
        {c: 0, r: 1}, // down
        {c: -1, r: 0} // left
    ];

    let next, ndi;
    let di = 0;
    while (1) {
        next = getNextPosition(dirs, p, di);
        if (isPath(lines, ...next)) {
            // keep moving
            routes[routes.length - 1]++;
            p = next;
            continue;
        }

        ndi = (di + 1) % dirs.length;
        next = getNextPosition(dirs, p, ndi);
        if (isPath(lines, ...next)) {
            di = ndi;
            p = next;
            routes.push('R', 1);
            continue;
        }

        ndi = (di + dirs.length - 1) % dirs.length;
        next = getNextPosition(dirs, p, ndi);
        if (isPath(lines, ...next)) {
            di = ndi;
            p = next;
            routes.push('L', 1);
            continue;
        }

        break;
    }

    console.log(routes.join(','));
}

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

function getNextPosition(dirs, [r, c], di) {
    return [
        r + dirs[di].r,
        c + dirs[di].c
    ];
}
