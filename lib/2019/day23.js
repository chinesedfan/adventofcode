const path = require('path');
const child_process = require('child_process');

const COUNT = 50;

// special format: day part input
// echo 1 | YEAR=2019 node index.js 23 1 test/day23.txt
const args = process.argv.slice(2);
const cps = [];
const idles = Array(50).fill(false);
let nat, natUsed = false;

module.exports = function(part, data) {
    process.on('uncaughtException', console.log);

    const bindedOnMessage = onMessage.bind(this, part);
    for (let i = 0; i < COUNT; i++) {
        cps[i] = spawn(i);
        // cps[i].stdout.on('data', buf => console.log(buf.toString()));
        cps[i].stderr.on('data', buf => console.log(`[${i}]`, buf.toString()));
        cps[i].on('error', console.log)
        cps[i].on('message', bindedOnMessage);
        cps[i].on('uncaughtException', console.log)
    }
};

function spawn(addr) {
    console.log(`spawn ${addr} with ${args[2]}`);

    return child_process.spawn('node', [path.resolve(__dirname, './day23-sub.js'), addr, args[2]], {
        stdio: ['ipc']
    });
}

function onMessage(part, {type, payload}) {
    // console.log('message', type, payload)

    switch (type) {
    case 'pkg':
        const {addr, x, y} = payload;
        if (addr === 255) {
            if (nat && nat.y === payload.y) {
                console.log('y twice in row', payload.y);
                exit();
            }

            nat = payload;
            natUsed = false;
            console.log('nat updated', payload);
            if (part == 1) exit();

            tryToResume();
        } else {
            cps[addr].send({addr, x, y});
        }
        break;
    case 'idle':
        const {addr: idx, flag} = payload;
        idles[idx] = flag;
        tryToResume();
        break;
    default:
        console.log(`unknown type: ${type}`);
        break;
    }
}
function tryToResume() {
    if (nat && !natUsed && idles.every(Boolean)) {
        console.log('nat resume');
        cps[0].send(nat);
        natUsed = true;
    }
}
function exit() {
    cps.forEach(cp => cp.kill());
    process.exit(1);
}
