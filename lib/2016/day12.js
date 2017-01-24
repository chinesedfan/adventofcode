'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-d]|\d+)(?: ([a-d]|[-]?\d+))?/;

module.exports = function(part, data) {
    const lines = data.split('\n');
    let ip = 0;
    let regs = {
        a: 0,
        b: 0,
        c: part == 1 ? 0 : 1,
        d: 0
    };

    while (ip < lines.length) {
        ip = exec(regs, ip, lines[ip]);
    }
    console.log(ip + ':', regs.a, regs.b, regs.c, regs.d);
};

function exec(regs, ip, instr) {
    const matches = rInstr.exec(instr);
    if (!matches) throw new Error('invlaid instr', instr);

    let value;
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
        if (getVal(regs, matches[2])) return ip + parseInt(matches[3]);
        break;
    default:
        throw new Error('invlaid op', matches[1]);
    }
    return ip + 1;
}
function getVal(regs, r) {
    return /[a-d]/.test(r) ? regs[r] : r;
}
