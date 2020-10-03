const spawn = require('child_process').spawn;
const path = require('path');

const debug = require('debug');
['origin', 'input', 'main', 'update'].forEach(k => debug[k] = debug(k));

let state = newState();

// the child process
let app;

startGame();
process.on('uncaughtException', (err) => {
    app.kill();
    if (!err.isGameError || !err.isExpected) {
        console.log(err.stack);
        return;
    }

    debug.main(err.message);
    if (state.index < Math.pow(2, takenItems.length)) {
        // restart with next state
        state = newState(state);

        startGame();
    } else {
        //
    }
});

function startGame() {
    debug.main('start game');

    app = spawn('node', ['index.js', '25', '-f', 'test/day25.txt', '-i', 'lib/2019/day25-input.txt'], {
        env: {
            ...process.env, // or can't find `node`
            YEAR: 2019,
        },
        cwd: path.resolve(__dirname, '../../')
    });
    app.stdout.on('data', (data) => {
        let bufferList = [];
        let start = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 10) {
                bufferList.push(data.slice(start, i));
                dispatchLine(Buffer.concat(bufferList).toString());

                bufferList = [];
                start = i + 1;
            }
            if (i === data.length - 1) {
                bufferList.push(data.slice(start));
            }
        }
    });
}

const rCheckResult = /Alert! Droids on this ship are (heavier|lighter) than the detected value!/;
const sSCRoom = '== Security Checkpoint ==';
const sInput = 'Command?';
function dispatchLine(line) {
    debug.origin(line);

    let matches;
    if (matches = rCheckResult.exec(line)) {
        state.checkResult = matches[1];

        throw newError(`[${state.index}] check result is: ${state.checkResult}`, true);
    } else if (line === sSCRoom) {
        state.isSCRoom = true;
        dropItems(state.index);
    } else if (line === sInput) {
        if (!state.isSCRoom) return;

        if (!state.drops.length) {
            // to the floor
            debug.input('west');
            app.stdin.write('west\n');
        } else {
            const item = state.drops.shift();
            debug.input(item);
            app.stdin.write(item + '\n');
        }
    }
}

const takenItems = [
    'asterisk',
    'festive hat',
    'monolith',
    'mug',
    'prime number',
    'sand',
    'spool of cat6',
    'tambourine'
];
function dropItems(index) {
    for (let i = 0; i < takenItems.length; i++) {
        if (index & (1 << i)) {
            const input = `drop ${takenItems[i]}`;
            state.drops.push(input);
        }
    }
}

function newState(prevState) {
    return {
        // index of all possible drop ways
        index: prevState ? prevState.index + 1 : 0,
        // in the security checkpoint room
        isSCRoom: false,
        // want to drop them
        drops: [],
        // check result of floor
        checkResult: '',
    };
}

function newError(message, expected = false) {
    const err = new Error(message);
    err.isGameError = true;
    err.isExpected = expected;
    return err;
}
