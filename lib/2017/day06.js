'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const stateMap = {};
    const banks = _.map(data.split(/\s+/), (token) => parseInt(token));
    let count = 0;
    let key = banks.join('#');

    while (!(key in stateMap)) {
        stateMap[key] = count;

        const max = _.max(banks);
        const rest = max % banks.length;
        const delta = Math.floor(max / banks.length);

        const index = _.findIndex(banks, (x) => x == max);
        for (let i = 0; i < banks.length; i++) {
            const j = (index + 1 + i) % banks.length;
            if (j == index) banks[j] = 0;
            banks[j] += delta;
            if (i < rest) banks[j]++;
        }

        key = banks.join('#');
        count++;
    }

    console.log(part == 1 ? count : count - stateMap[key]);
};
