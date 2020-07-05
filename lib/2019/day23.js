const path = require('path');
const child_process = require('child_process');

// special format: day part input
const args = process.argv.slice(2);
const cps = [];

module.exports = function(part, data) {
    process.on('message', onMessage);
    process.on('uncaughtException', console.log);

    for (let i = 0; i < 50; i++) {
        cps[i] = spawn(i);
        cps[i].stdout.on('data', buf => console.log(buf.toString()));
        cps[i].stderr.on('data', buf => console.log(`[${i}]`, buf.toString()));
        cps[i].on('error', console.log)
        cps[i].on('uncaughtException', console.log)
    }
};

function spawn(addr) {
    console.log(`spawn ${addr} with ${args[2]}`);

    return child_process.spawn('node', [path.resolve(__dirname, './day23-sub.js'), addr, args[2]], {
        stdio: ['ipc']
    });
}

function onMessage({type, payload}) {
    console.log('message', type, payload)

    switch (type) {
    case 'pkg':
        const {addr, x, y} = payload;
        cps[addr].send({addr, x, y});
        break;
    default:
        console.log(`unknown type: ${type}`);
        break;
    }
}
