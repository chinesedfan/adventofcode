'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const res = _.filter(data.split('\n'), (l) => {
        const tokens = l.replace(/[\[\]]/g, ',').split(',');
        return _.every(tokens, (t, i) => {
            return !(i % 2) || !hasABBA(t);
        }) && _.some(tokens, (t, i) => {
            return !(i % 2) && hasABBA(t);
        });
    }).length;

    console.log(res);
};

function hasABBA(str) {
    return _.some(str, (c, i) => {
        if (i < 3) return false;

        return str[i - 3] == str[i] && str[i - 2] == str[i - 1] && str[i - 1] != str[i];
    });
}
