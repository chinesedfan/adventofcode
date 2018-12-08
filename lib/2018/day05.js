'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let result;
    if (part === 1) {
        result = getFinalLength(data);
    } else {
        result = _('abcdefghijklmnopqrstuvwxyz'.split(''))
            .map((c) => getFinalLength(data, c, c.toUpperCase()))
            .min();
    }

    console.log(result);
};

function getFinalLength(data, low, upper) {
    const stack = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i] === low || data[i] === upper) continue;

        const match = /[a-z]/.test(data[i]) ? data[i].toUpperCase() : data[i].toLowerCase();
        const prev = stack[stack.length - 1];
        if (prev === match) {
            stack.pop();
        } else {
            stack.push(data[i]);
        }
    }

    return stack.length;
}
