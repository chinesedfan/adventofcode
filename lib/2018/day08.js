'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const numbers = data.split(' ').map((x) => +x);
    const nodes = [];
    const stack = [];
    let i = 0;
    while (i < numbers.length) {
        const n = {
            c: numbers[i++],
            m: numbers[i++],
            children: [],
            metaData: []
        };

        if (n.c) {
            stack.push(n);
        } else {
            n.metaData = numbers.slice(i, i + n.m);
            i += n.m;
            nodes.push(n);

            while (stack.length) {
                const p = _.last(stack);
                if (p.children.length != p.c) {
                    p.children.push(n);
                    if (p.children.length == p.c) {
                        p.metaData = numbers.slice(i, i + p.m);
                        i += p.m;
                        nodes.push(p);
                        stack.pop();
                    } else {
                        break;
                    }
                } else {
                    throw new Error('full children but still in stack');
                }
            }
        }
    }

    console.log(_.sumBy(nodes, (n) => _.sum(n.metaData)));
};
