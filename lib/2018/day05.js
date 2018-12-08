'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const stack = [];

    for (let i = 0; i < data.length; i++) {
        const match = /[a-z]/.test(data[i]) ? data[i].toUpperCase() : data[i].toLowerCase();
        const prev = stack[stack.length - 1];
        if (prev === match) {
            stack.pop();
        } else {
            stack.push(data[i]);
        }
    }

    console.log(stack.length);
};
