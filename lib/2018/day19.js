'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const lines = data.split('\n');
    const bind = +lines[0].replace('#ip ', '');
    const instrs = lines.slice(1).map((line) => {
        const tokens = line.split(' ');
        return [tokens[0], +tokens[1], +tokens[2], +tokens[3]];
    });

    const regs = [part == 1 ? 0 : 1, 0, 0, 0, 0, 0];
    let ip = 0;
    while (ip < instrs.length) {
        regs[bind] = ip;
        const old = regs[0];
        exec(regs, instrs[ip]);
        // output each place where regs[0] is changed
        // it will help you find out what the program is doing
        if (regs[0] != old) {
            console.log(ip, regs);
            // replace following with your `quick`
            if (part == 2) {
                regs[0] = quick(regs[5]);
                break;
            }
        }
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

/**
 * Translate the program with our high-level language
 * @param  {number} n
 * @return {number} sum of n's factors
 */
function quick(n) {
    const factors = [];
    for (let i = 1, max = Math.sqrt(n); i <= max; i++) {
        if (n % i) continue;

        factors.push(i);
        factors.push(n / i);
    }
    return _.sum(factors);
}
