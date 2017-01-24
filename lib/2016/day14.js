'use strict';
const crypto = require('crypto');
const _ = require('lodash');

module.exports = function(part, data) {
    const LIMIT = 64;
    const salt = data.replace(/\n/, '');
    let index = 0;
    let found = [];
    let cache = {}, list;
    let code, ch;

    while (found.length < LIMIT) {
        code = md5(salt + index);

        ch = hasDuplicated(code, 5);
        list = cache[ch];
        _.each(list, (item) => {
            if (index > item.index && index <= item.index + 1000 && !_.find(found, (f) => f == item.index)) {
                found.push(item.index);
                console.log(`${found.length}: ${item.code} ${item.index} - ${code} ${index}`);
            }
        });

        ch = hasDuplicated(code, 3);
        if (ch) {
            list = cache[ch];
            if (!list) {
                cache[ch] = list = [];
            }
            list.push({
                index: index,
                code: code
            });
            // console.log(`${ch}[${list.length}] ${code} ${index}`);
        }

        index++;
    }
};

function md5(content) {
    const hash = crypto.createHash('md5');
    hash.update(content);
    return hash.digest('hex');
}
function hasDuplicated(code, n) {
    return _.find(code, (c, i) => {
        if (i < n - 1) return false;

        return _.every(_.range(i - (n - 1), i), (j) => {
            return code[j] == code[i];
        });
    });
}
