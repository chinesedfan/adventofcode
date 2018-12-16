'use strict';
const _ = require('lodash');
const names = [
    'addr', 'addi',
    'mulr', 'muli',
    'banr', 'bani',
    'borr', 'bori',
    'setr', 'seti',
    'gtir', 'gtri', 'gtrr',
    'eqir', 'eqri', 'eqrr',
];

module.exports = function(part, data) {
    const lines = data.split('\n');
    const samples = [];

    let i = 0;
    while (lines[i]) {
        samples.push({
            before: JSON.parse(lines[i++].substr('Before: '.length)),
            instr: lines[i++].split(' ').map((x) => +x),
            after: JSON.parse(lines[i++].substr('After: '.length))
        });
        i++;
    }
    const instrs = lines.slice(i + 2).map((l) => l.split(' ').map((x) => +x));

    const result = samples.filter(({before, after, instr}) => {
        return names.filter((name) => {
            const real = [...before];
            exec(real, [name, ...instr.slice(1)]);
            return real.every((x, j) => x === after[j]);
        }).length >= 3;
    }).length;
    console.log(result);
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
        regs[c] = regs[a] + b;
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
