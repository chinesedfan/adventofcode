const run = require('./day09').run;

module.exports = function(part, data) {
    const numbers = data.split(',').map((x) => +x);

    let done;
    let ox;
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

        const outputs = probe(numbers, [...inputs]);
        visited[key(...inputs.p)] = outputs[outputs.length - 1];
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
            if (part == 1) {
                done = true;
            }
            ox = inputs.p;
            console.log(inputs.p);
            console.log(inputs.length);
            break;
        default:
            throw new Error('unknow last output');
        }
    }

    // part 2 only, bfs from ox
    visited[key(0, 0)] = 1; // fix the start point info
    const max = bfs([ox[0], ox[1], 0], visited);
    console.log(max);
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

function bfs(r, map) {
    const q = [r];
    const visited = {};
    let max = 0;
    while (q.length) {
        const [x, y, d] = q.shift();
        if (visited[key(x, y)]) continue;
        visited[key(x, y)] = 1;
        if (d > max) max = d;

        add(q, map, x - 1, y, d + 1);
        add(q, map, x + 1, y, d + 1);
        add(q, map, x, y - 1, d + 1);
        add(q, map, x, y + 1, d + 1);
    }
    return max;
}
function add(q, map, x, y, d) {
    if (map[key(x, y)]) { // except for unknown and 0
        q.push([x, y, d]);
    }
}
