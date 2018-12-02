'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const numbers = data.split('\n').map((x) => +x);

    let result;
    if (part === 1) {
        result = _.sum(numbers);
    } else {
        let cache = {};
        let i = 0;
        let sum = 0;
        while (1) {
            const n = numbers[i];
            sum += n;
            if (cache[sum]) {
                result = sum;
                break;
            } else {
                cache[sum] = 1;
                i++;
                if (i == numbers.length) i = 0;
            }
        }
    }

    console.log(result);
};
