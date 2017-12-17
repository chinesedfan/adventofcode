'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const skip = parseInt(data);
    if (part == 1) {
        f1(skip);
    } else {
        f2(skip);
    }
};

function f1(skip) {
    const buffer = [0];
    let cur = 0;
    let value = 1;
    while (value <= 2017) {
        const forward = skip % buffer.length;
        cur = (cur + forward) % buffer.length;

        buffer.splice(++cur, 0, value);
        value++;
    }
    console.log(buffer[cur + 1]);
}

function f2(skip) {
    let result = 0;
    let cur = 0;
    let value = 1;
    while (value <= 50000000) {
        const forward = skip % value;
        cur = (cur + forward) % value;

        if (++cur == 1) result = value;
        value++;
    }
    console.log(result);
}
