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
    (part === 1 ? f1 : f2)(numbers, lines);
};

function f1(numbers, lines) {
    const result = lines.reduce((sum, line, r) => {
        for (let c = 0; c < line.length; c++) {
            if (check(lines, r, c)) sum += r * c;
        }
        return sum;
    }, 0);

    console.log(result);
}
function f2(numbers, lines) {
    // printRoutine(lines);

    // L,10,L,8,R,8,L,8,R,6,
    // L,10,L,8,R,8,L,8,R,6,
    // R,6,R,8,R,8,R,6,R,6,L,8,L,10,
    // R,6,R,8,R,8,R,6,R,6,L,8,L,10,
    // R,6,R,8,R,8,R,6,R,6,L,8,L,10,
    // R,6,R,8,R,8,
    // L,10,L,8,R,8,L,8,R,6
    const A = 'L,10';
    const B = 'L,8,R,8';
    const C = 'L,8,R,6';
    const D = 'R,6';
    const E = 'R,8,R,8';
    const F = 'R,6,R,6,L,8';
    const main = 'A,B,C,A,B,C,D,E,F,A,D,E,F,A,D,E,F,A,D,E,A,B,C';

    const inputs = [main, A, B, C, D, E, F].reduce((agg, str) => {
        return agg.concat(getCharCodes(str), [10]);
    }, []);
    inputs.push('y'.charCodeAt(0), 10);

    const outputs = [];

    numbers[0] = 2; // changed numbers!!!
    const g = run([...numbers]);
    let a = g.next();
    do {
        if (a.value === 'input') {
            console.log(inputs.length)
            if (!inputs.length) throw new Error('I have no input');
            a = g.next(inputs.shift());
        } else {
            outputs.push(+a.value);
        }
    } while (!a.done);

    console.log(outputs);
}
function printRoutine(lines) {
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
function getCharCodes(str) {
    return str.split('').map(ch => ch.charCodeAt(0));
}
