'use strict';
const _ = require('lodash');
const reg = /Disc #(\d+) has (\d+) positions; at time=(\d+), it is at position (\d+)\.$/;

module.exports = function(part, data) {
    const lines = data.split('\n');
    const discs = _.map(lines, (line) => {
        const matches = reg.exec(line);
        return {
            id: parseInt(matches[1]),
            total: parseInt(matches[2]),
            // ignore time, all is at 0
            current: parseInt(matches[4]),
        };
    });

    let time = 0, current, offset;
    while (1) {
        offset = 0;
        _.some(discs, (d, i) => {
            current = (d.current + i + 1) % d.total;

            if (current) {
                offset = d.total - current;
                return true;
            }
        });

        if (!offset) break;

        time += offset;
        _.each(discs, (d) => {
            d.current = (d.current + offset) % d.total;
        });
    }
    console.log(time);
};
