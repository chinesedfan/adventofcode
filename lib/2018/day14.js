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
    first.prev = second;
    first.next = second;
    second.prev = first;
    second.next = first;

    let head = first;
    let tail = second;
    let len = 2;

    let after = 0;
    while (1) {
        after++;

        const sum = first.val + second.val;
        if (sum >= 10) {
            tail = push(head, tail, 1, ++len);
        }
        tail = push(head, tail, sum % 10, ++len);

        first = move(first, 1 + first.val);
        second = move(second, 1 + second.val);

        if (part == 1) {
            // `after x recipes` means for the whole list
            if (len <= target + 10) continue;

            let p = move(head, target);
            const result = [];
            _.range(0, 10).map(() => {
                result.push(p.val);
                p = p.next;
            });
            console.log(result.join(''));
            break;
        } else {
            if (check(tail, target) || check(tail.prev, target)) break;
        }
    }
};

function push(head, tail, val, index) {
    const node = {
        index,
        val,
        prev: tail,
        next: head
    };
    head.prev = node;
    tail.next = node;
    return node;
}
function move(head, offset) {
    while (offset--) head = head.next;
    return head;
}
function check(tail, target) {
    // ignore cases when matched tail.index === 1
    while (target) {
        if (tail.val !== target % 10) return false;

        target = (target - target % 10) / 10;
        tail = tail.prev;
    }
    console.log(tail.index);
    return true;
}
