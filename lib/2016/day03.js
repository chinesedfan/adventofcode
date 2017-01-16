'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const reg = /(\d+)\s+(\d+)\s+(\d+)/;
    const sum = _.filter(data.split('\n'), (line) => {
        const matches = reg.exec(line);
        if (!matches) return false;

        const a = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        const c = parseInt(matches[3]);
        return a + b > c && a + c > b && b + c > a;
    }).length;
    console.log(sum);
};
