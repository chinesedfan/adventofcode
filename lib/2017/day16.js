'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let ps = _.range(16).map((i) => String.fromCharCode('a'.charCodeAt(0) + i));

    _.each(data.split(','), (cmd) => {
        let matches;
        if (matches = /s(\d+)/.exec(cmd)) {
            ps = spin(ps, parseInt(matches[1]));
        } else if (matches = /x(\d+)\/(\d+)/.exec(cmd)) {
            ps = exchange(ps, parseInt(matches[1]), parseInt(matches[2]));
        } else if (matches = /p(\w)\/(\w)/.exec(cmd)) {
            ps = partner(ps, matches[1], matches[2]);
        }
    });
    console.log(ps.join(''));
};

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
