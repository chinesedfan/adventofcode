// special format: day part input
const args = process.argv.slice(2);
const cps = [];

module.exports = function(part, data) {
    process.on('message', onMessage);

    for (let i = 0; i < 50; i++) {
        cps[i] = spawn(i);
    }
};

function spawn(addr) {
    return spawn('node', ['./day23-sub.js', addr, args[2]], {
        stdio: ['ipc']
    });
}

function onMessage({type, payload}) {
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
