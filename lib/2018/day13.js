'use strict';
const _ = require('lodash');
const CROSS = ['l', 's', 'r'];

module.exports = function(part, data) {
    const lines = data.split('\n');
    const carts = [];
    lines.forEach((l, r) => {
        for (let c = 0; c < l.length; c++) {
            if (/[<>^v]/.test(l[c])) {
                carts.push({
                    r, c, dir: l[c], cross: 0
                });
            }
        }
    });

    let prev = {};
    while (1) {
        // important
        carts.sort((a, b) => {
            if (a.r != b.r) {
                return a.r - b.r;
            } else {
                return a.c - b.c;
            }
        });

        const cache = {};
        const x = carts.find((cart) => {
            move(lines, cart);

            const key = `${cart.r}#${cart.c}`;
            if ((prev[key] && willCrashWith(lines, prev[key], cart)) || cache[key]) return true;

            update(lines, cart);
            cache[key] = {...cart}; // make a copy but with the new `dir`
        });
        if (x) {
            console.log(`${x.c},${x.r}`);
            break;
        }

        prev = cache;
    }
};

function move(lines, cart) {
    switch (cart.dir) {
    case '<':
        cart.c--;
        break;
    case '>':
        cart.c++;
        break;
    case '^':
        cart.r--;
        break;
    case 'v':
        cart.r++;
        break;
    }
}
function update(lines, cart) {
    switch (lines[cart.r][cart.c]) {
    case '+':
        cart.dir = [{
            '<': 'v',
            '>': '^',
            '^': '<',
            'v': '>'
        }, {
            '<': '<',
            '>': '>',
            '^': '^',
            'v': 'v'
        }, {
            '<': '^',
            '>': 'v',
            '^': '>',
            'v': '<'
        }][cart.cross][cart.dir];

        cart.cross++;
        if (cart.cross === CROSS.length) cart.cross = 0;
        break;
    case '/':
        cart.dir = ({
            '<': 'v',
            '>': '^',
            '^': '>',
            'v': '<'
        })[cart.dir];
        break;
    case '\\':
        cart.dir = ({
            '<': '^',
            '>': 'v',
            '^': '<',
            'v': '>'
        })[cart.dir];
        break;
    case '-':
    default:
        break;
    }
}
function willCrashWith(lines, oldCart, newCart) {
    const opposite = {
        '<': '>',
        '>': '<',
        '^': 'v',
        'v': '^'
    };
    if (lines[oldCart.r][oldCart.c] === '+') {
        return opposite[oldCart.dir] === newCart.dir;
    } else {
        return true;
    }
}
