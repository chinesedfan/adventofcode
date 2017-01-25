'use strict';
const _ = require('lodash');
const reg = /Disc #(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+)\.$/;

module.exports = function(part, data) {
    const limit = part == 1 ? 272 : 35651584; // change if need
    let str = data.replace('\n', '');
    while (str.length < limit) {
        str = generate(str);
    }

    str = str.substr(0, limit);
    let res = checksum(str);
    while (res.length < str.length) {
        str = res;
        res = checksum(str);
    }
    console.log(res);
}

function generate(str) {
    return str + '0' + _(str).map((c) => {
        return c == '1' ? '0' : '1';
    }).reverse().join('');
}
function checksum(str) {
    if (str.length & 1) return str;

    return _.map(str, (c, i) => {
        if (i & 1) {
            return str[i] == str[i - 1] ? '1' : '0';
        } else {
            return '';
        }
    }).join('');
}
