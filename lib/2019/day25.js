const run = require('./day09').run;

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = async function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    const g = run([...numbers]);
    let inputs = [];
    let outputs = [];

    let a;
    let input;
    do {
        a = g.next(input);
        if (a.value === 'input') {
            print(outputs);

            if (inputs.length) {
                input = inputs.shift();
            } else {
                inputs = await readFromUser();
                input = inputs.shift();
            }
        } else {
            outputs.push(+a.value);
        }
    } while (!a.done);
};

function print(outputs) {
    if (!outputs.length) return;

    console.log(outputs.map(ch => String.fromCharCode(ch)).join(''));
    outputs.length = 0;
}
function readFromUser() {
    return new Promise((resolve) => {
        rl.question('>', (answer) => {
            answer += '\n';
            resolve(answer.split('').map(ch => ch.charCodeAt(0)));
        });
    });
}
