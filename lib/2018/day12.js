'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const lines = data.split('\n');
    let state = lines[0].split('')
        .slice('initial state: '.length)
        .map((c, i) => ({c, i}));
    const rules = lines.splice(2).reduce((m, l) => {
        const tokens = l.split(' => ');
        m[tokens[0]] = tokens[1];
        return m;
    }, {});

    let g = 0;
    const history = [state];
    const cache = {};
    cache[getStateStr(state)] = 0;

    while (1) {
        g++;
        state = getNextState(state, rules);
        const output = getStateStr(state);
        console.log(g, output);
        if (part == 1) {
            if (g >= 20) break;
        } else {
            if (output in cache) {
                const iters = 50000000000 - g;
                const step = g - cache[output];
                const loop = Math.floor(iters / step) + 1;
                const rest = iters % step;
                const offset = _.first(state).i - _.first(history[cache[output]]).i;

                state = history[cache[output] + rest];
                // don't mind breaking history at last
                state.forEach((o) => o.i += offset * loop);
                break;
            }
            cache[output] = g;
            history.push(state);
        }
    }
    console.log(_(state).filter(({c}) => c === '#').sumBy(({i}) => i));
};

function getNextState(state, rules) {
    // FIXME: `state` refers to the new list
    state = [...state];

    const left = _.first(state).i;
    const right = _.last(state).i;
    let x = 1;
    while (x < 5) state.unshift({c: '.', i: left - x++});
    x = 1;
    while (x < 5) state.push({c: '.', i: right + x++});

    state = _.range(2, state.length - 2)
        .map((i) => {
            const key = state.slice(i - 2, i + 3)
                .map((o) => o.c)
                .join('');
            return {
                i: state[i].i,
                c: rules[key] || '.'
            };
        });
    // not efficient but easy to write
    while (state[0].c === '.') state.shift();
    while (state[state.length - 1].c === '.') state.pop();

    return state;
}
function getStateStr(state) {
    return state.map(({c}) => c).join('');
}
