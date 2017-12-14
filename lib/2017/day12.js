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
    const max = _.keys(map).length;

    // count
    let connected = {};
    let group = 0;
    for (let i = 0; i < max; i++) {
        if (connected[i]) continue;

        let q = [i];
        while (q.length) {
            const n = q.shift();
            if (connected[n]) continue;

            connected[n] = 1;
            q = q.concat(map[n] || []);
        }
        if (part == 1) {
            console.log(_.keys(connected).length);
            break;
        }

        group++;
    }
    if (part == 2) console.log(group);
};
