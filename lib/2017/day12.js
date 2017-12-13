'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    // init
    const map = {};
    _.each(data.split('\n'), (line) => {
        const tokens = line.split('<->');
        const f = parseInt(tokens[0]);
        const ts = _.map(tokens[1].split(', '), (t) => parseInt(t));
        map[f] = ts;
    });

    // count
    let connected = {};
    let q = [0];
    while (q.length) {
        const n = q.shift();
        if (connected[n]) continue;

        connected[n] = 1;
        q = q.concat(map[n] || []);
    }
    console.log(_.keys(connected).length);
};
