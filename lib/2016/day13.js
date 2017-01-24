'use strict';
const crypto = require('crypto');
const _ = require('lodash');

module.exports = function(part, data) {
    const fav = parseInt(data);
    let cache = {};
    const src = initDot(cache, 1, 1, 0);
    const dst = {
        x: 31,
        y: 39
    }; // change here

    // bfs
    let q = [src], cur, next;
    while (q.length) {
        cur = q.shift();

        if (cur.x) {
            next = initDot(cache, cur.x - 1, cur.y, cur.step + 1);
            if (checkDot(fav, q, next, dst)) break;
        }

        if (cur.y) {
            next = initDot(cache, cur.x, cur.y - 1, cur.step + 1);
            if (checkDot(fav, q, next, dst)) break;
        }

        next = initDot(cache, cur.x + 1, cur.y, cur.step + 1);
        if (checkDot(fav, q, next, dst)) break;

        next = initDot(cache, cur.x, cur.y + 1, cur.step + 1);
        if (checkDot(fav, q, next, dst)) break;
    }
}

function initDot(cache, x, y, step) {
    const key = x + '-' + y;
    if (!cache[key]) {
        cache[key] = {
            x: x,
            y: y,
            step: step
        };
    }
    return cache[key];
}
function checkDot(fav, q, dot, dst) {
    if (dot.visited) return false;

    if (dot.x == dst.x && dot.y == dst.y) {
        console.log(dot.step);
        return true;
    } else {
        if (isSpace(dot, fav)) q.push(dot);
        return false;
    }
}
function isSpace(dot, fav) {
    const x = dot.x;
    const y = dot.y;
    let sum = x * x + 3 * x + 2 * x * y + y + y * y + fav;
    let count = 0;
    while (sum) {
        if (sum & 1) count++;
        sum >>= 1;
    }
    dot.visited = true;
    return !(count & 1);
}