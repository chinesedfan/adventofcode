'use strict';
const _ = require('lodash');
const reg = /^(\D+)(\d+)\[([a-z]{5})\]$/;

module.exports = function(part, data) {
    if (part == 1) {
        console.log(_(data.split('\n')).map(getSector).sum());
    } else {
        _.each(data.split('\n'), printSector);
    }
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

function printSector(line) {
    const matches = reg.exec(line);
    if (!matches) return;

    const sector = parseInt(matches[2]);
    const decrypted = _.map(line, (c) => {
        if (c == '-') return c;
        return getChar(c, sector);
    }).join('');

    if (~decrypted.indexOf('pole')) {
        console.log(decrypted, sector);
    }
}
function getChar(c, offset) {
    const start = 'a'.charCodeAt(0);
    let index = c.charCodeAt(0) - start;
    index += offset;
    index %= 26;
    return String.fromCharCode(start + index);
}
