const path = require('path');
const child_process = require('child_process');

const COUNT = 50;

// special format: day part input
// echo 1 | YEAR=2019 node index.js 23 1 test/day23.txt
const args = process.argv.slice(2);
const cps = [];
let idles = {};
let nat, prevNat = {};

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
            nat = payload;
            console.log('nat updated', payload);
            if (part == 1) exit();
        } else {
            idles = {};
            cps[addr].send({addr, x, y});
        }
        break;
    case 'idle':
        const {addr: idx, flag} = payload;
        if (flag) {
            tryToResume();
        } else {
            idles = {};
        }
        idles[idx] = flag;
        break;
    default:
        console.log(`unknown type: ${type}`);
        break;
    }
}
function tryToResume() {
    const keys = Object.keys(idles);
    if (keys.length < COUNT) return; // not collected yet

    if (nat && keys.every(k => idles[k])) {
        console.log('nat resume');
        cps[0].send(nat);

        if (prevNat[nat.y]) {
            console.log('y twice in row', nat.y);
            exit();
        }

        prevNat[nat.y] = 1;
        idles = {};
    }
}
function exit() {
    cps.forEach(cp => cp.kill());
    process.exit(1);
}
