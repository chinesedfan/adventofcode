'use strict';
const crypto = require('crypto');
const _ = require('lodash');

module.exports = function(part, data) {
    const door = data.replace(/\n/, '');
    let index = 0;

    let pwd = ['-', '-', '-', '-', '-', '-', '-', '-'];
    let count = 0;

    while (count < pwd.length) {
        const code = md5(door + index);
        if (code.indexOf('00000') == 0) {
            if (part == 1) {
                pwd[count++] = code[5];
            } else {
                const pos = parseInt(code[5]);
                if (!isNaN(pos) && pos < pwd.length && pwd[pos] == '-') {
                    pwd[pos] = code[6];
                    count++;
                }
            }
            console.log(pwd.join(''));
        }
        index++;
    }
};

function md5(content) {
    const hash = crypto.createHash('md5');
    hash.update(content);
    return hash.digest('hex');
}
