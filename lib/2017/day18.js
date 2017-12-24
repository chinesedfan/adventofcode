'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-z])(?: ([a-z]|[-]?\d+))?/;
let lastPlayed;

module.exports = function(part, data) {
    const lines = data.split('\n');
    const regs = {};
    let ip = 0;

    while (ip < lines.length) {
        ip = exec(regs, ip, lines[ip], part);
    }
};

function exec(regs, ip, instr, part) {
    const matches = rInstr.exec(instr);
    if (!matches) throw new Error('invlaid instr', instr);

    switch (matches[1]) {
    case 'snd':
        lastPlayed = getVal(regs, matches[2]);
        break;
    case 'set':
        regs[matches[2]] = getVal(regs, matches[3]);
        break;
    case 'add':
        regs[matches[2]] += getVal(regs, matches[3]);
        break;
    case 'mul':
        regs[matches[2]] *= getVal(regs, matches[3]);
        break;
    case 'mod':
        regs[matches[2]] %= getVal(regs, matches[3]);
        break;
    case 'rcv':
        if (getVal(regs, matches[2]) > 0) {
            if (part == 1) {
                console.log('lastPlayed=' + lastPlayed);
                return Infinity;
            }
            regs[matches[2]] = lastPlayed;
        }
        break;
    case 'jgz':
        if (getVal(regs, matches[2]) > 0) return ip + getVal(regs, matches[3]);
        break;
    default:
        throw new Error('invlaid op', matches[1]);
    }
    return ip + 1;
}
function getVal(regs, r) {
    return /[a-z]/.test(r) ? (regs[r] || 0) : parseInt(r);
}
