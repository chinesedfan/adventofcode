const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    test(numbers);
};

function test(numbers) {
    // there has multiple test cases
    // and the springdroid can always jumps to height=3 (ground=0 and initial=1)
    // which means jumping over 3 tiles (changing from i to i + 4)
    const instrs = [
        'NOT D J',
        'WALK'
    ];
    const inputs = getCharCodes(instrs.join('\n') + '\n');
    const outputs = [];
    let hasRead = false;

    const g = run([...numbers]);
    let a = g.next();
    do {
        if (a.value === 'input') {
            if (!hasRead) {
                print(outputs);
                hasRead = true;
            }

            if (!inputs.length) throw new Error('I have no input');
            a = g.next(inputs.shift());
        } else {
            outputs.push(+a.value);
            a = g.next();
        }
    } while (!a.done);

    // print and program
    print(outputs);
}

function getCharCodes(str) {
    return str.split('').map(ch => ch.charCodeAt(0));
}
function print(outputs) {
    console.log(outputs.map(x => String.fromCharCode(x)).join(''));
    outputs.length = 0;
}
