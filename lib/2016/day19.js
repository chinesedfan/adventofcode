'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    return part == 1 ? fn1(part, data) : fn2(part, data);
};

function fn1(part, data) {
    let rest = parseInt(data.replace('\n', ''));
    let res = 1;
    let factor = 2;

    // for each round, suppose `rest` elves have gifts
    // if `rest` is even, the `res` one keeps having gifts
    // if `rest` is odd, we should update `res`
    while (rest > 1) {
        if (rest & 1) {
            res += factor;
        }

        rest >>= 1;
        factor <<= 1;
    }
    console.log(res);
}

function fn2(part, data) {
    let rest = parseInt(data.replace('\n', ''));
    let arr = _.range(1, rest + 1);
    let index = 0, other;
    while (arr.length) {
        other = index + Math.floor(arr.length / 2);
        if (other >= arr.length) other -= arr.length;

        arr.splice(other, 1);
        if (arr.length == 1) {
            console.log(arr[0]);
            break;
        }

        if (other > index) index++;
        if (index >= arr.length) index = 0;
    }
}
