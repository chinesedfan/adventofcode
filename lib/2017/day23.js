'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-h]|-?\d+)(?: ([a-h]|-?\d+))?/;
let mul = 0;

module.exports = function(part, data) {
    const instrs = _.map(data.split('\n'), (line) => rInstr.exec(line));
    let ip = 0;
    let regs = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0
    };

    while (ip < instrs.length) {
        ip = exec(regs, instrs, ip);
    }
    console.log(mul);
};

function exec(regs, instrs, ip) {
    const matches = instrs[ip];
    if (!matches) throw new Error('invlaid instr ' + instrs[ip]);

    switch (matches[1]) {
    case 'set':
        regs[matches[2]] = getVal(regs, matches[3]);
        break;
    case 'sub':
        regs[matches[2]] -= getVal(regs, matches[3]);
        break;
    case 'mul':
        mul++;
        regs[matches[2]] *= getVal(regs, matches[3]);
        break;
    case 'jnz':
        if (getVal(regs, matches[2]) != 0) {
            return ip + getVal(regs, matches[3]);
        }
        break;
    default:
        throw new Error('invlaid op ' + matches[1]);
    }
    return ip + 1;
}
function getVal(regs, r) {
    return /[a-z]/.test(r) ? (regs[r] || 0) : parseInt(r);
}
