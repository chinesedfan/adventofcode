const fs = require('fs');
const run = require('./day09').run;

// addr, fname
const args = process.argv.slice(2);
fs.readFile(args[1], (err, buf) => {
    if (err) throw err;
    boot(args[0], buf.toString());
});

const inputs = [];
process.on('message', (pkg) => {
    inputs.push(pkg);
});

function boot(addr, data) {
    const numbers = data.split(',').map((x) => +x);

    const g = run([...numbers]);
    const outputs = [];

    let a = g.next(addr);
    let pkg;
    do {
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
        a = g.next(input);
    } while (!a.done);
}

function send(addr, x, y) {
   process.send({addr, x, y});
}

