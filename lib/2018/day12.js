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

    let result;
    if (part == 1) {
        const gmax = 20;
        for (let g = 0; g < gmax; g++) {
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
            console.log(g + 1, state.map(({c}) => c).join(''));
        }
        console.log(_(state).filter(({c}) => c === '#').sumBy(({i}) => i));
    } else {
    }
};
