'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const result = _.reduce(data, (sum, ch, i) => {
        const prev = data[i ? i - 1 : data.length - 1];
        if (ch === prev) {
            sum += parseInt(ch);
        }
        return sum;
    }, 0);
    console.log(result);
};
