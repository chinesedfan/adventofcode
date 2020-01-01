const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    let done;
    const q = [[1], [2], [3], [4]];
    while (q.length && !done) {
        const inputs = q.shift();
        const outputs = probe(numbers, [...inputs]);
        switch (outputs[outputs.length - 1]) {
        case 0:
            break;
        case 1:
            for (let i = 1; i <= 4; i++) {
                q.push([...inputs, i]);
            }
            break;
        case 2:
            done = true;
            console.log(inputs.length);
            break;
        default:
            throw new Error('unknow last output');
        }
    }
};

function probe(numbers, inputs) {
    const outputs = [];
    const g = run([...numbers]);

    let a;
    let input;
    while (1) {
        a = g.next(input);
        if (a.done) throw new Error('never done');

        if (a.value === 'input') {
            if (!inputs.length) break;
            input = inputs.shift();
        } else {
            outputs.push(+a.value);
        }
    }

    return outputs;
}
