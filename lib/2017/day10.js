'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const marks = 256;
    let list = _.range(marks);
    let current = 0;
    let skip = 0;
    _.each(data.split(/,\s*/), (token) => {
        const len = parseInt(token);

        if (current + len < list.length) {
            list = list.slice(0, current)
                .concat(list.slice(current, current + len).reverse())
                .concat(list.slice(current + len));
        } else {
            // s2 - o - s1
            const s1 = list.length - current;
            const s2 = len - s1;

            const section = list.slice(current).concat(list.slice(0, s2)).reverse();
            list = section.slice(s1, s1 + s2)
                    .concat(list.slice(s2, list.length - s1))
                    .concat(section.slice(0, s1));
        }

        current = (current + len + skip) % list.length;
        skip++;
    });
    console.log(list[0] * list[1]);
};
