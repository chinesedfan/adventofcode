'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const reg = /(\d+)\s+(\d+)\s+(\d+)/;
    const numbers = _.map(data.split('\n'), (line) => {
        const matches = reg.exec(line);
        if (!matches) return [0, 0, 0];

        return [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];
    });

    if (part == 1) {
        console.log(_.filter(numbers, (arr) => {
            return isTriangle.apply(this, arr);
        }).length);
    } else {
        console.log(_.reduce(numbers, (sum, arr, i) => {
            if (i % 3) return sum;

            return sum + isTriangle(arr[0], numbers[i + 1][0], numbers[i + 2][0])
                    + isTriangle(arr[1], numbers[i + 1][1], numbers[i + 2][1])
                    + isTriangle(arr[2], numbers[i + 1][2], numbers[i + 2][2]);
        }, 0));
    }
};

function isTriangle(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
}
