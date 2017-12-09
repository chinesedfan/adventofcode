'use strict';
const _ = require('lodash');
const rLine = /^(\w+) \((\d+)\)(?: -> (\w+(?:, \w+)*))?$/;

module.exports = function(part, data) {
    // init
    const map = {};
    _.each(data.split('\n'), (line) => {
        const matches = rLine.exec(line);

        const name = matches[1];
        const weight = parseInt(matches[2]);
        const children = matches[3] ? matches[3].split(', ') : [];
        map[name] = {name, weight, children};
    });

    // prepare
    _.each(map, (item) => {
        // convert string to item
        item.children = _.map(item.children, (child) => map[child]);
        // set parent
        _.each(item.children, (child) => {
            child.parent = item;
        });
    });

    const r = _(map).keys().filter((name) => !map[name].parent).value()[0];
    if (part == 1) {
        console.log(r);
    } else {
        getWeightSum(map[r]);
    }
};

function getWeightSum(r) {
    if (_.isEmpty(r.children)) {
        r.sum = r.weight;
        return r.sum;
    }

    const childrenSum = _.map(r.children, (item) => getWeightSum(item));
    if (_.some(childrenSum, (s) => s < 0)) return -1;

    const groupedChildren = _.groupBy(r.children, (item) => item.sum);
    const sums = _(groupedChildren).keys().map((s) => parseInt(s)).value();
    // at most 2 kinds
    if (sums.length == 2) {
        const g0 = groupedChildren[sums[0]];
        const g1 = groupedChildren[sums[1]];
        if (g0.length == 1) {
            console.log(g0[0].weight + sums[1] - sums[0]);
        } else {
            console.log(g1[0].weight + sums[0] - sums[1]);
        }

        r.sum = -1;
        return r.sum;
    }

    r.sum = _.sum(childrenSum) + r.weight;
    return r.sum;
}
