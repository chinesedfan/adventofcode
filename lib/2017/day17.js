'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const skip = parseInt(data);
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
};
