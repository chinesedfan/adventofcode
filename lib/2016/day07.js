'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const res = _.filter(data.split('\n'), (l) => {
        const tokens = l.replace(/[\[\]]/g, ',').split(',');
        return part == 1 ? supportTLS(tokens) : supportSSL(tokens);
    }).length;

    console.log(res);
};

function supportTLS(tokens) {
    return _.every(tokens, (t, i) => {
        return !(i % 2) || !hasABBA(t);
    }) && _.some(tokens, (t, i) => {
        return !(i % 2) && hasABBA(t);
    });
}
function hasABBA(str) {
    return _.some(str, (c, i) => {
        if (i < 3) return false;

        return str[i - 3] == str[i] && str[i - 2] == str[i - 1] && str[i - 1] != str[i];
    });
}

function supportSSL(tokens) {
    return _.some(tokens, (str, j) => {
        if (j % 2) return false;

        return _.some(str, (c, i) => {
            if (i < 2) return false;

            const isABA = str[i - 2] == str[i] && str[i - 1] != str[i];
            if (!isABA) return false;

            const bab = str[i - 1] + str[i] + str[i - 1];
            return _.some(tokens, (h, k) => {
                return (k % 2) && ~h.indexOf(bab);
            });
        });
    });
}
