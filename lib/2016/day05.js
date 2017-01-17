'use strict';
const crypto = require('crypto');
const _ = require('lodash');

module.exports = function(part, data) {
    const door = data.replace(/\n/, '');
    let index = 0;
    let pwd = [];
    while (pwd.length < 8) {
        const code = md5(door + index);
        if (code.indexOf('00000') == 0) {
            pwd.push(code[5]);
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
