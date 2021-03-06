const fs = require('fs');
const run = require('./day09').run;

// addr, fname
const [ADDR, FNAME] = process.argv.slice(2);
fs.readFile(FNAME, (err, buf) => {
    if (err) throw err;
    boot(+ADDR, buf.toString());
});

const inputs = [];
process.on('message', (pkg) => {
    print(`receive: ${pkg.addr} -> ${ADDR}`);

    inputs.push(pkg);
});

function boot(addr, data) {
    const numbers = data.split(',').map((x) => +x);
    print(`addr=${addr} booted`);

    const g = run([...numbers]);
    const outputs = [];

    let a = g.next();
    a = g.next(addr);

    let pkg;
    const exec = () => {
        let input;
        if (a.value === 'input') {
            if (pkg) {
                input = pkg.y;
                pkg = null;
            } else if (inputs.length) {
                pkg = inputs.shift();
                input = pkg.x;
            } else {
                input = -1;
            }
        } else {
            outputs.push(+a.value);
            if (outputs.length === 3) {
                send(...outputs);
                outputs.length = 0;
            }
        }

        if (a.done) {
            print('exit');
            return;
        }

        // yield
        if (input === -1) {
            idle(true);
            setTimeout(() => {
                a = g.next(input);
                exec();
            }, 200);
        } else {
            a = g.next(input);
            exec();
        }
    };
    exec();
}

function print(...args) {
    console.log(`[${ADDR}]`, ...args);
}
function idle(flag) {
    process.send({
        type: 'idle',
        payload: {addr: ADDR, flag}
    });
}
function send(addr, x, y) {
    print(`send: ${ADDR} -> ${addr}`);

    process.send({
        type: 'pkg',
        payload: {addr, x, y}
    });
}
