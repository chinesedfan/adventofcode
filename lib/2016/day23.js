'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-d]|-?\d+)(?: ([a-d]|-?\d+))?/;
const jnzCache = {};

module.exports = function(part, data) {
    const instrs = _.map(data.split('\n'), (line) => rInstr.exec(line));
    let ip = 0;
    let regs = {
        a: part == 1 ? 7 : 12,
        b: 0,
        c: 0,
        d: 0
    };

    while (ip < instrs.length) {
        ip = exec(regs, instrs, ip);
    }
    console.log(ip + ':', regs.a, regs.b, regs.c, regs.d);
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
        // try to find multiply
        if (/[a-d]/.test(matches[2])) {
            if (jnzCache[ip]) {
                const k = matches[2];
                const step = jnzCache[ip][k] / (jnzCache[ip][k] - regs[k]);
                _.each(regs, (val, key) => {
                    regs[key] = jnzCache[ip][key] + (regs[key] - jnzCache[ip][key]) * step;
                });
                delete jnzCache[ip];
            } else {
                jnzCache[ip] = _.clone(regs);
            }
        }

        if (getVal(regs, matches[2])) return ip + getVal(regs, matches[3]);
        break;
    case 'tgl':
        const target = instrs[ip + getVal(regs, matches[2])];
        if (!target) break;

        if (typeof target[3] == 'undefined') {
            target[1] = target[1] == 'inc' ? 'dec' : 'inc';
        } else {
            target[1] = target[1] == 'jnz' ? 'cpy' : 'jnz';
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
