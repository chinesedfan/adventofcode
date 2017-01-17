'use strict';
const _ = require('lodash');
const reg = /^(\D+)(\d+)\[([a-z]{5})\]$/;

module.exports = function(part, data) {
    console.log(_(data.split('\n')).map(getSector).sum());
};

function getSector(line) {
    const matches = reg.exec(line);
    if (!matches) return 0;

    const checksum = _(matches[1].split(''))
        .filter((c) => {
            return c >= 'a' && c <= 'z';
        })
        .groupBy()
        .toArray()
        .sortBy([
            (group) => -group.length,
            (group) => group[0]
        ])
        .map((group) => group[0])
        .slice(0, 5)
        .join('');
    if (checksum != matches[3]) return 0;

    return parseInt(matches[2]);
}
