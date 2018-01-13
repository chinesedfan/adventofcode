'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-h]|-?\d+)(?: ([a-h]|-?\d+))?/;
let mul = 0;

module.exports = function(part, data) {
    if (part == 1) {
        f1(data);
    } else {
        f2();
    }
};

function f1(data) {
    const instrs = _.map(data.split('\n'), (line) => rInstr.exec(line));
    let ip = 0;
    let regs = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0
    };

    while (ip < instrs.length) {
        ip = exec(regs, instrs, ip);
    }
    console.log(mul);
}

function exec(regs, instrs, ip) {
    const matches = instrs[ip];
    if (!matches) throw new Error('invlaid instr ' + instrs[ip]);

    switch (matches[1]) {
    case 'set':
        regs[matches[2]] = getVal(regs, matches[3]);
        break;
    case 'sub':
        regs[matches[2]] -= getVal(regs, matches[3]);
        break;
    case 'mul':
        mul++;
        regs[matches[2]] *= getVal(regs, matches[3]);
        break;
    case 'jnz':
        if (getVal(regs, matches[2]) != 0) {
            return ip + getVal(regs, matches[3]);
        }
        break;
    default:
        throw new Error('invlaid op ' + matches[1]);
    }
    return ip + 1;
}
function getVal(regs, r) {
    return /[a-z]/.test(r) ? (regs[r] || 0) : parseInt(r);
}

// Count composite numbers between b and c (include c)
//
// set b 65
// set c b // c = 65
// jnz a 2
//         jnz 1 5 // part 1, goto 9 directly
//     mul b 100
//     sub b -100000 // b = b * 100 + 100000
//     set c b
//     sub c -17000 // c = b + 17000
// set f 1
// set d 2
//     set e 2
//         set g d
//         mul g e
//         sub g b // g = d * e - b
//         jnz g 2
//             set f 0
//         sub e -1 // e++
//         set g e
//         sub g b // e - b
//         jnz g -8
//     sub d -1 // d++
//     set g d
//     sub g b // d - b
//     jnz g -13
// jnz f 2
//     sub h -1 // h++
// set g b
// sub g c
// jnz g 2 // b - c
//     jnz 1 3
// sub b -17 // b += 17
// jnz 1 -23 // goto 9
function f2() {
    let b = 65;
    b = b * 100 + 100000;
    let c = b + 17000;

    const candidates = _.map(_.range(b, c + 1, 17), (n) => ({n}));
    for (let i = 2, max = Math.floor(Math.sqrt(c)); i <= max; i++) {
        _.each(candidates, (item) => {
            if (item.composite || (item.n % i)) return;
            item.composite = true;
        });
    }

    const count = _.filter(candidates, (item) => item.composite).length;
    console.log(count);
}
