'use strict';
const _ = require('lodash');
const crypto = require('crypto');
const SIZE = 4;

module.exports = function(part, data) {
    const passcode = data.replace('\n', '');
    // bfs
    let q = [{
        x: 0,
        y: 0,
        path: ''
    }];
    while (q.length && !checkTop(q, passcode)) {}
};

function md5(content) {
    const hash = crypto.createHash('md5');
    hash.update(content);
    return hash.digest('hex');
}
function checkTop(q, passcode) {
    const item = q.shift();
    if (item.x == SIZE - 1 && item.y == SIZE - 1) {
        console.log(item.path.length, item.path);
        return false;
    }

    const hash = md5(passcode + item.path);
    item.y && isOpen(hash[0]) && q.push({
        x: item.x,
        y: item.y - 1,
        path: item.path + 'U'
    });
    item.y < SIZE - 1 && isOpen(hash[1]) && q.push({
        x: item.x,
        y: item.y + 1,
        path: item.path + 'D'
    });
    item.x && isOpen(hash[2]) && q.push({
        x: item.x - 1,
        y: item.y,
        path: item.path + 'L'
    });
    item.x < SIZE - 1 && isOpen(hash[3]) && q.push({
        x: item.x + 1,
        y: item.y,
        path: item.path + 'R'
    });
    return false;
}
function isOpen(c) {
    return /[b-f]/.test(c);
}
