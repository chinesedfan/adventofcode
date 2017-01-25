'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let rest = parseInt(data.replace('\n', ''));
    let res = 1;
    let factor = 2;

    while (rest > 1) {
        if (rest & 1) {
            res += factor;
        }

        rest >>= 1;
        factor <<= 1;
    }
    console.log(res);
};
