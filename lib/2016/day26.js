'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-d]|-?\d+)(?: ([a-d]|-?\d+))?/;
const output = [];

module.exports = function(part, data) {
    const instrs = _.map(data.split('\n'), (line) => rInstr.exec(line));
    let ip = 0;
    let regs = {
        a: 0,
        b: 0,
        c: 0,
        d: 0
    };

    while (ip < instrs.length) {
        ip = exec(regs, instrs, ip);
    }
};

function exec(regs, instrs, ip) {
    const matches = instrs[ip];
    if (!matches) throw new Error('invlaid instr ' + instrs[ip]);

    switch (matches[1]) {
    case 'cpy':
        regs[matches[3]] = getVal(regs, matches[2]);
        break;
    case 'inc':
        regs[matches[2]]++;
        break;
    case 'dec':
        regs[matches[2]]--;
        break;
    case 'jnz':
        if (getVal(regs, matches[2])) return ip + getVal(regs, matches[3]);
        break;
    case 'out':
        const val = getVal(regs, matches[2]);
        const ch = String.fromCharCode(val);
        if (ch == '\n') {
            console.log(output.join(''));
            output.length = 0;
        } else {
            output.push(ch);
        }
        break;
    default:
        throw new Error('invlaid op ' + matches[1]);
    }
    return ip + 1;
}
function getVal(regs, r) {
    return /[a-d]/.test(r) ? regs[r] : parseInt(r);
}
