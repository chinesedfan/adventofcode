'use strict';
const _ = require('lodash');
const reg = /^\/dev\/grid\/node-x(\d+)-y(\d+)\s+\d+T\s+(\d+)T\s+(\d+)T\s+\d+%$/;

module.exports = function(part, data) {
    const nodes = _(data.split('\n')).map((line) => {
        const matches = reg.exec(line);
        return matches && {
            x: parseInt(matches[1]),
            y: parseInt(matches[2]),
            used: parseInt(matches[3]),
            avil: parseInt(matches[4])
        };
    }).filter();

    const pairs = _(nodes).reduce((count, a, i) => {
        return count + _(nodes).filter((b, j) => a.used && b.avil >= a.used).value().length;
    }, 0);
    console.log(pairs);
};
