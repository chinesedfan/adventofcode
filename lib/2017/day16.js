'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const cmds = data.split(',').map((cmd) => {
        let matches;
        if (matches = /s(\d+)/.exec(cmd)) {
            return {
                fn: spin,
                args: [parseInt(matches[1])]
            };
        } else if (matches = /x(\d+)\/(\d+)/.exec(cmd)) {
            return {
                fn: exchange,
                args: [parseInt(matches[1]), parseInt(matches[2])]
            };
        } else if (matches = /p(\w)\/(\w)/.exec(cmd)) {
            return {
                fn: partner,
                args: [matches[1], matches[2]]
            };
        }
        throw new Error('invalid input');
    });
    let ps = _.range(16).map((i) => String.fromCharCode('a'.charCodeAt(0) + i));
    let loop = part == 1 ? 1 : 1000000000;

    while (loop--) ps = dance(ps, cmds);
    console.log(ps.join(''));
};

function dance(ps, cmds) {
    _.each(cmds, (cmd) => {
        ps = cmd.fn.apply(this, [ps].concat(cmd.args));
    });
    return ps;
}

function spin(list, n) {
    return list.slice(list.length - n).concat(list.slice(0, list.length - n));
}
function exchange(list, i, j) {
    return _.map(list, (x, index) => {
        if (index == i) return list[j];
        if (index == j) return list[i];
        return x;
    });
}
function partner(list, a, b) {
    return _.map(list, (x) => {
        if (x == a) return b;
        if (x == b) return a;
        return x;
    });
}
