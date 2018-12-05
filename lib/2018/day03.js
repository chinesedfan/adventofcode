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

    let count = 0;
    Object.keys(cache).forEach((k) => {
        if (cache[k] > 1) count++;
    });

    console.log(count);
};
