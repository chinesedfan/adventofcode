'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const lines = data.split('\n');
    const bind = +lines[0].replace('#ip ', '');
    const instrs = lines.slice(1).map((line) => {
        const tokens = line.split(' ');
        return [tokens[0], +tokens[1], +tokens[2], +tokens[3]];
    });

    // use to print more readable codes
    // instrs.forEach((instr, i) => console.log(i + ':', print(instr)));
    // return;

    const regs = [0, 0, 0, 0, 0, 0];
    let ip = 0;
    const r0s = {};
    let count = 0;
    while (ip < instrs.length) {
        // we can see the only check of r0 occurs this ip
        if (ip == 28) {
            if (part == 1) {
                console.log(regs[3]);
                break;
            } else {
                count++;
                // it takes me ~5min to find, about 11500+ candidates
                if (!(count % 100)) console.log('======================== count=' + count);
                if (r0s[regs[3]]) {
                    break;
                }
                r0s[regs[3]] = 1;
                console.log(regs[3]);
            }
        }
        regs[bind] = ip;
        exec(regs, instrs[ip]);
        ip = regs[bind];
        ip++;
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

function print(instr) {
    let [name, a, b, c] = instr;

    if (name[2] !== 'i') {
        a = 'r' + a;
    }
    if (name[3] !== 'i') {
        b = 'r' + b;
    }
    c = 'r' + c;

    switch (name) {
    case 'addr':
    case 'addi':
        return printBetter(a, b, c, '+');
    case 'mulr':
    case 'muli':
        return printBetter(a, b, c, '*');
    case 'banr':
    case 'bani':
        return printBetter(a, b, c, '&');
    case 'borr':
    case 'bori':
        return printBetter(a, b, c, '|');
    case 'setr':
    case 'seti':
        a = a.slice(1); // special case
        return `${c} = ${a}`;
    case 'gtir':
    case 'gtri':
    case 'gtrr':
        return `${c} = ${a} > ${b} ? 1 : 0`;
    case 'eqir':
    case 'eqri':
    case 'eqrr':
        return `${c} = ${a} == ${b} ? 1 : 0`;
    }
}
function printBetter(a, b, c, op) {
    if (c == a) {
        return `${c} ${op}= ${b}`;
    } else if (c == b) {
        return `${c} ${op}= ${a}`;
    } else {
        return `${c} = ${a} ${op} ${b}`;
    }
}
