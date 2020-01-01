const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    let done;
    const visited = {};
    const delta = [[0, 1], [0, -1], [-1, 0], [1, 0]]; // nswe
    const q = [];
    for (let i = 0; i < 4; i++) {
        const state = [i + 1];
        state.p = delta[i];
        q.push(state);
    }
    while (q.length && !done) {
        const inputs = q.shift();
        if (visited[key(...inputs.p)]) continue;
        visited[key(...inputs.p)] = 1;

        const outputs = probe(numbers, [...inputs]);
        // console.log('try', q.length, inputs, '=>', outputs)
        switch (outputs[outputs.length - 1]) {
        case 0:
            break;
        case 1:
            for (let i = 0; i < 4; i++) {
                const state = [...inputs, i + 1];
                state.p = [inputs.p[0] + delta[i][0], inputs.p[1] + delta[i][1]];
                q.push(state);
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
function key(x, y) {
    return x + '#' + y;
}
