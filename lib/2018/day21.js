'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const lines = data.split('\n');
    const bind = +lines[0].replace('#ip ', '');
    const instrs = lines.slice(1).map((line) => {
        const tokens = line.split(' ');
        return [tokens[0], +tokens[1], +tokens[2], +tokens[3]];
    });

    const regs = [0, 0, 0, 0, 0, 0];
    let ip = 0;
    while (ip < instrs.length) {
        regs[bind] = ip;
        exec(regs, instrs[ip]);
        ip = regs[bind];
        ip++;
    }
    console.log(regs[0]);
};

function exec(regs, instr) {
    const [name, a, b, c] = instr;
    switch (name) {
    case 'addr':
        regs[c] = regs[a] + regs[b];
        break;
    case 'addi':
        regs[c] = regs[a] + b;
        break;
    case 'mulr':
        regs[c] = regs[a] * regs[b];
        break;
    case 'muli':
        regs[c] = regs[a] * b;
        break;
    case 'banr':
        regs[c] = regs[a] & regs[b];
        break;
    case 'bani':
        regs[c] = regs[a] & b;
        break;
    case 'borr':
        regs[c] = regs[a] | regs[b];
        break;
    case 'bori':
        regs[c] = regs[a] | b;
        break;
    case 'setr':
        regs[c] = regs[a];
        break;
    case 'seti':
        regs[c] = a;
        break;
    case 'gtir':
        regs[c] = a > regs[b] ? 1 : 0;
        break;
    case 'gtri':
        regs[c] = regs[a] > b ? 1 : 0;
        break;
    case 'gtrr':
        regs[c] = regs[a] > regs[b] ? 1 : 0;
        break;
    case 'eqir':
        regs[c] = a === regs[b] ? 1 : 0;
        break;
    case 'eqri':
        regs[c] = regs[a] === b ? 1 : 0;
        break;
    case 'eqrr':
        regs[c] = regs[a] === regs[b] ? 1 : 0;
        break;
    }
}
