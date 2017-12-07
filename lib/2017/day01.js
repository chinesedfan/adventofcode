'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const forward = part == 1 ? 1 : parseInt(data.length / 2);
    const result = _.reduce(data, (sum, ch, i) => {
        const next = data[(i + forward) % data.length];
        if (ch === next) {
            sum += parseInt(ch);
        }
        return sum;
    }, 0);
    console.log(result);
};
