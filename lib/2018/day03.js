'use strict';
const reg = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

module.exports = function(part, data) {
    const lines = data.split('\n');
    const cache = {};

    lines.forEach((l) => {
        l.replace(reg, (match, id, left, top, width, height) => {
            for (let i = 0; i < +width; i++) {
                for (let j = 0; j < +height; j++) {
                    const k = `${+left + i}#${+top + j}`;
                    cache[k] = (cache[k] || 0) + 1;
                }
            }
            return match;
        });
    });

    if (part === 1) {
        let count = 0;
        Object.keys(cache).forEach((k) => {
            if (cache[k] > 1) count++;
        });

        console.log(count);
    } else {
        // not efficient, but easy to implement
        let unique = 1;
        lines.forEach((l) => {
            l.replace(reg, (match, id, left, top, width, height) => {
                let overlap = false;
                for (let i = 0; i < +width; i++) {
                    for (let j = 0; j < +height; j++) {
                        const k = `${+left + i}#${+top + j}`;
                        if (cache[k] > 1) overlap = true;
                    }
                }
                if (!overlap) unique = id;
                return match;
            });
        });

        console.log(unique);
    }
};
