const spawn = require('child_process').spawn;
const path = require('path');

const rooms = {};
const q = [];

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

    if (q.length) {
        // restart with next path
        state = q.shift();

        startGame();
    } else {
        // print collected rooms
        for (const k in rooms) {
            console.log(room2str(rooms[k]));
        }
    }
});

function startGame() {
    app = spawn('node', ['index.js', '25', '-f', 'test/day25.txt'], {
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

const rTitle = /^== (.+) ==$/;
const rChoice = /^- (.+)$/;
const sDoors = 'Doors here lead:';
const sItems = 'Items here:';
const sInput = 'Command?';
let nextExpect; // message | doors | items
function dispatchLine(line) {
    let matches;

    if (rTitle.test(line)) {
        if (state.visited[line]) {
            throw newError('visited room: ' + line, true);
        }
        state.visited[line] = true;
        state.room = rooms[line] || newRoom(line);
        rooms[line] = state.room;

        nextExpect = 'message';
    } else if (line === sDoors) {
        nextExpect = 'doors';
    } else if (line === sItems) {
        nextExpect = 'items';
    } else if (line === sInput) {
        let choice;
        if (state.inputIndex < state.inputs.length) {
            // use saved input
            choice = state.inputs[state.inputIndex++];
        } else {
            // choose a new door
            if (state.doorIndex >= state.room.doors.length) {
                throw newError('no more doors', true);
            }
            choice = state.room.doors[state.doorIndex];

            state.inputs.push(choice);
            state.inputIndex = state.inputs.length;
        }
        app.stdin.write(choice + '\n');
    } else if (matches = rChoice.exec(line)) {
        if (nextExpect === 'doors') {
            state.room.doors.push(matches[1]);
            if (state.room.doors.length === 1) {
                state.doorIndex = 0;
            } else {
                const nstate = newState(state);
                nstate.doorIndex = state.room.doors.length - 1;
                q.push(nstate);
            }
        } else if (nextExpect === 'items') {
            state.room.items.push(matches[1]);
        } else {
            throw newError('unknown choice: ' + line);
        }
    } else if (state.room) {
        state.room.messages.push(line);
    }
}

function newState(prevState) {
    return {
        // lines have been input
        inputs: prevState ? [...prevState.inputs] : [],
        // now should use which input
        inputIndex: 0,
        // room title -> boolean
        visited: prevState ? {...prevState.visited} : {},
        // the current room
        room: prevState ? prevState.room : null,
        // now should choose which door (already inputIndex >= inputs.length)
        doorIndex: 0,
    };
}

function newRoom(title) {
    return {
        title,
        messages: [],
        doors: [],
        items: [],
    };
}
function room2str(room) {
    const { title, messages, doors, items } = room;
    return [
        title,
        ...messages,
        ...doors.map(x => `- ${x}`),
        ...items.map(x => `- ${x}`)
    ].join('\n');
}

function newError(message, expected = false) {
    const err = new Error(message);
    err.isGameError = true;
    err.isExpected = expected;
    return err;
}
