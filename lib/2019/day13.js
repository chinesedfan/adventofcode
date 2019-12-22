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

    const game = {};
    let x, y;
    outputs.forEach((n, i) => {
        switch (i % 3) {
        case 0:
            x = n;
            break;
        case 1:
            y = n;
            break;
        case 2:
            update(game, x, y, n);
            break;
        }
    });

    const result = Object.keys(game).filter((k) => game[k] === 2);

    console.log(result.length);
};

function update(game, x, y, n) {
    let result = game[key(x, y)] || 0;
    switch (n) {
    case 1: // wall
    case 2: // block
    case 3: // paddle
        if (result === 0) {
            result = n;
        }
        break;
    case 4: // ball
        if (result === 0 || result === 2) {
            result = n;
        }
        break;
    case 0: // empty
    default:
        break;
    }

    game[key(x, y)] = result;
}

function key(x, y) {
    return x + '#' + y;
}
