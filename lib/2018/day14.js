'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const target = +data;
    let first = {
        index: 1,
        val: 3
    };
    let second = {
        index: 2,
        val: 7
    };
    first.next = second;
    second.next = first;

    let head = first;
    let tail = second;
    let len = 2;

    while (1) {
        const sum = first.val + second.val;
        if (sum >= 10) {
            tail = push(head, tail, 1, ++len);
        }
        tail = push(head, tail, sum % 10, ++len);

        first = move(first, 1 + first.val);
        second = move(second, 1 + second.val);
        // what's the meaning of `after x recipes`
        if (first.index === target && len > first.index + 10) break;
    }

    let p = first;
    const result = [];
    _.range(0, 10).map(() => {
        result.push(p.next.val);
        p = p.next;
    });
    console.log(result.join(''));
};

function push(head, tail, val, index) {
    const node = {
        index,
        val,
        next: head
    };
    tail.next = node;
    return node;
}
function move(head, offset) {
    while (offset--) head = head.next;
    return head;
}
