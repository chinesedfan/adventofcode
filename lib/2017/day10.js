'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const marks = 256;
    let list = _.range(marks);
    let current = 0;
    let skip = 0;

    // get length list
    let lengthList, round;
    if (part == 1) {
        lengthList = _.map(data.split(/,\s*/), (token) => parseInt(token));
        round = 1;
    } else {
        lengthList = _.map(data.trim().split(''), (token) => token.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
        round = 64;
    }
    // iteration
    while (round--) {
        _.each(lengthList, (len) => {
            if (current + len < list.length) {
                list = list.slice(0, current)
                    .concat(list.slice(current, current + len).reverse())
                    .concat(list.slice(current + len));
            } else {
                // s2 - o - s1
                const s1 = list.length - current;
                const s2 = len - s1;

                const section = list.slice(current).concat(list.slice(0, s2)).reverse();
                list = section.slice(s1, s1 + s2)
                        .concat(list.slice(s2, list.length - s1))
                        .concat(section.slice(0, s1));
            }

            current = (current + len + skip) % list.length;
            skip++;
        });
    }
    // ouput
    let result;
    if (part == 1) {
        result = list[0] * list[1];
    } else {
        const step = 16;
        result = _.reduce(list, (str, x, i) => {
            if ((i + 1) % step) {
                return str;
            } else {
                let code = _.reduce(list.slice(i + 1 - step, i + 1), (num, n) => num ^ n, 0);
                code = code.toString(16);
                // important
                if (code.length < 2) code = '0' + code;
                return str + code.toString(16);
            }
        }, '');
    }
    console.log(result);
    return result;
};
