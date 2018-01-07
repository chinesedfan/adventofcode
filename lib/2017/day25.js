'use strict';
const _ = require('lodash');

const rTotal = new RegExp(`Begin in state (\\w+).
Perform a diagnostic checksum after (\\d+) steps.`, 'm');
const rRule = new RegExp(`In state (\\w+):
  If the current value is 0:
    - Write the value (0|1).
    - Move one slot to the (left|right).
    - Continue with state (\\w+).
  If the current value is 1:
    - Write the value (0|1).
    - Move one slot to the (left|right).
    - Continue with state (\\w+).`, 'mg');

module.exports = function(part, data) {
    let current, step;
    data.replace(rTotal, (match, s, st) => {
        current = s;
        step = parseInt(st);
    });

    const rules = {};
    data.replace(rRule, (match, s, w0, m0, s0, w1, m1, s1) => {
        rules[s] = {
            0: {write: w0, move: m0, state: s0},
            1: {write: w1, move: m1, state: s1}
        };
    });

    const tape = {};
    let cursor = 0;
    while (step--) {
        const r = rules[current];
        const val = tape[cursor] || 0;

        const {write, move, state} = r[val];
        tape[cursor] = write;
        cursor += move == 'right' ? 1 : -1;
        current = state;
    }

    const c1 = _(tape).values().filter((v) => v == 1).value().length;
    console.log(c1);
};
