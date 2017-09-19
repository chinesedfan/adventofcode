'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-d]|-?\d+)(?: ([a-d]|-?\d+))?/;

module.exports = function(part, data) {
    const instrs = _.map(data.split('\n'), (line) => rInstr.exec(line));
    let a = 1;
    while (!simulate(instrs, 100, a)) console.log('not', a++);
    console.log('a =', a);
};

function simulate(instrs, limit, a) {
    let ip = 0;
    const regs = {
        a,
        b: 0,
        c: 0,
        d: 0
    };
    const jnzCache = {};
    const output = [0];

    while (ip < instrs.length) {
        // no `tgl`, don't worry about changing instrs
        ip = exec(regs, instrs, ip, jnzCache, output);
        // clear if invalid
        if (!output.length) return false;
        // satisfy
        if (output.length > limit) return true;
    }
    return false;
}
function exec(regs, instrs, ip, jnzCache, output) {
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
        if (false && /[a-d]/.test(matches[2])) {
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
    case 'out':
        const val = getVal(regs, matches[2]);
        if (val == output[output.length - 1]) {
            output.push(val ? 0 : 1);
        } else {
            output.length = 0;
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
