'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const offsets = _.map(data.split('\n'), (line) => parseInt(line));
    console.log(getSteps(offsets, part));
};

function getSteps(offsets, part) {
    let index = 0;
    let steps = 0;
    while (index < offsets.length) {
        const j = offsets[index];
        if (part == 1) {
            offsets[index]++;
        } else {
            if (offsets[index] >= 3) {
                offsets[index]--;
            } else {
                offsets[index]++;
            }
        }
        index += j;
        steps++;
    }
    return steps;
}
