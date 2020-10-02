const run = require('./day09').run;

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];
// special argument: -i <preload-file>
// YEAR=2019 node index.js 25 -f test/day25.txt -i lib/2019/day25-input.txt
const args = process.argv.slice(2);
args.forEach((x, i) => {
    if (x === '-i') {
        const file = args[i + 1];
        const content = fs.readFileSync(file, 'utf8');
        inputs = content.split('').map(ch => ch.charCodeAt(0));
        console.log(inputs.length)
    }
});

module.exports = async function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    const g = run([...numbers]);
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
