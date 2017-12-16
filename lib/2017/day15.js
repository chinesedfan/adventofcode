'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    // sample
    // console.log(getResult(65, 8921, part));
    console.log(getResult(277, 349, part));
};

function getResult(a, b, part) {
    const total = part == 1 ? 40000000 : 5000000;
    let result = 0;
    let step = 0;
    while (step++ < total) {
        do {
            a = getNextValue(a, 16807);
        } while (part == 2 && (a % 4));
        do {
            b = getNextValue(b, 48271);
        } while (part == 2 && (b % 8));

        if (getLast16Bits(a) === getLast16Bits(b)) result++;
    }
    return result;
}
function getNextValue(value, factor) {
    return value * factor % 2147483647;
}
function getLast16Bits(value) {
    // much faster than
    // return _.padStart(value.toString(2), 32, '0').slice(16);
    return value % 65536;
}
