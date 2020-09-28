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

    const game = getGame(outputs);
    print(game);

    if (part == 1) {
        const result = Object.keys(game).filter((k) => game[k] === 2);

        console.log(result.length);
    } else {
        numbers[0] = +part;

        const os = runWithInputs(numbers, calInputs(game));
        print(getGame(os));
    }
};
function runWithInputs(numbers, inputs) {
    const g = run([...numbers]);
    let outputs = [];

    let a;
    let input;
    do {
        a = g.next(input);
        if (a.value === 'input') {
            input = inputs.shift();
        } else {
            outputs.push(+a.value);
        }
    } while (!a.done);

    return outputs;
}
function getGame(outputs) {
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
    return game;
}

function calInputs(game) {
    const inputs = [0];

    let [x, y] = game.ball;
    let dx = 1;
    let dy = 1;
    let match = false;
    while (game.block) {
        if (y >= game.paddle[1]) throw new Error('escaped');

        let input = 0;
        if (dy > 0 && y + dy === game.paddle[1]) {
            if (!match) {
                // match at the first touch
                match = true;
                move(inputs, game.paddle[0], x);
            }

            dy = -dy;
        } else if (hasSth(game, x, y + dy)) {
            if (hasSth(game, x + dx, y)) {
                countIfBlock(game, x, y + dy);
                countIfBlock(game, x + dx, y);
                dx = -dx;
                dy = -dy;
            } else {
                countIfBlock(game, x, y + dy);
                dy = -dy;
            }
        } else if (hasSth(game, x + dx, y)) {
            countIfBlock(game, x + dx, y);
            dx = -dx;
        } else if (hasSth(game, x + dx, y + dy)) {
            countIfBlock(game, x, y + dy);
            countIfBlock(game, x + dx, y);
            dx = -dx;
            dy = -dy;
        } else {
            x += dx;
            y += dy;
            if (match) {
                input = dx > 0 ? 1 : -1;
            }
            inputs.push(input);
        }
    }

    return inputs;
}
function move(inputs, x1, x2) {
    // x1 -> x2
    if (x1 > x2) {
        inputs.push(...Array(x1 - x2).fill(-1));
    } else {
        inputs.push(...Array(x2 - x1).fill(1));
    }
}
function hasSth(game, x, y) {
    const val = game[key(x, y)];
    return val === 1 || val === 2;
}
function countIfBlock(game, x, y) {
    if (game[key(x, y)] === 2) {
        game[key(x, y)] = 0;
        game.block--;
    }
}

function update(game, x, y, n) {
    let result = game[key(x, y)] || 0;
    switch (n) {
    case 1: // wall
    case 2: // block
        game.block = (game.block || 0) + 1;
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
    if (result === 3) {
        game.paddle = [x, y];
    } else if (result === 4) {
        game.ball = [x, y];
    }
}

function key(x, y) {
    return x + '#' + y;
}

function print(game) {
    const result = [];
    for (let i = 0; i < 45; i++) {
        result[i] = [];
        for (let j = 0; j < 30; j++) {
            const ch = game[key(i, j)] || '.';
            result[i].push(ch);
        }
    }

    console.log(result.map((r) => r.join('')).join('\n'));
}
