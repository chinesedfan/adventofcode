'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const MAX_ROW = part == 1 ? 40 : 400000;

    let line = data.replace('\n', '');
    let row = 1, l, c, r;
    let count = _.filter(line, (ch) => ch != '^').length;
    while (row < MAX_ROW) {
        line = _.map(line, (ch, i) => {
            l = i ? line[i - 1] == '^' : false;
            c = line[i] == '^';
            r = i < line.length - 1 ? line[i + 1] == '^' : false;

            if (isTrap(l, c, r)) {
                return '^';
            } else {
                count++;
                return '.';
            }
        }).join('');
        row++;
    }
    console.log(count);
};

function isTrap(l, c, r) {
    return (l && c && !r) || (!l && c && r) || (l && !c && !r) || (!l && !c && r);
}
