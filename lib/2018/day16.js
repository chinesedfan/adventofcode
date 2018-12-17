'use strict';
const _ = require('lodash');
const rrs = ['addr', 'mulr', 'banr', 'borr', 'setr', 'gtrr', 'eqrr'];
const ris = ['addi', 'muli', 'bani', 'bori', 'seti', 'gtri', 'eqri'];
const irs = ['gtir', 'eqir'];
const rlen = 4;

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

    const poss = {}; // code -> [name]
    const result = samples.filter(({before, after, instr}) => {
        const [code, a, b, c] = instr;
        const isar = a >= 0 && a < rlen;
        const isbr = b >= 0 && b < rlen;

        let names = [];
        if (isar && isbr) {
            names = rrs.concat(ris).concat(irs);
        } else if (isar) {
            names = ris;
        } else if (isbr) {
            names = irs;
        }

        const valid = names.filter((name) => {
            const real = [...before];
            exec(real, [name, ...instr.slice(1)]);
            return real.every((x, j) => x === after[j]);
        });
        poss[instr[0]] = poss[instr[0]] ? _.intersection(poss[instr[0]], valid) : valid;
        return valid.length >= 3;
    }).length;

    // for each uniqe, delete it in others
    while (1) {
        const confirmed = {};
        _.forEach(poss, (names) => {
            if (names.length === 1) {
                confirmed[names[0]] = 1;
            }
        });

        let changed = false;
        _.forEach(poss, (names, code) => {
            if (names.length === 1) return;

            const old = names.length;
            poss[code] = names.filter((name) => !confirmed[name]);
            if (poss[code].length < old) changed = true;
        });

        if (!changed) break;
    }
    const map = _.mapValues(poss, (x) => x[0]);

    if (part == 1) {
        console.log(result);
    } else {
        const regs = [0, 0, 0, 0];
        instrs.forEach((instr) => {
            exec(regs, [map[instr[0]], ...instr.slice(1)]);
        });
        console.log(regs[0]);
    }
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
