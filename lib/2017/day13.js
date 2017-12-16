'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const scannerList = _.map(data.split('\n'), (line) => {
        const tokens = line.split(': ');
        return {
            index: parseInt(tokens[0]),
            length: parseInt(tokens[1])
        };
    });

    if (part == 1) {
        console.log(getSeverity(scannerList));
    } else {
        let delay = 0;
        while (isCaught(scannerList, delay)) delay++;
        console.log(delay);
    }
};

function getSeverity(scannerList) {
    return _(scannerList).map((item) => {
        const roundLength = (item.length - 1) * 2;
        return (item.index % roundLength == 0) ? item.index * item.length : 0;
    }).sum();
}

function isCaught(scannerList, delay) {
    return _.some(scannerList, (item) => {
        const roundLength = (item.length - 1) * 2;
        return (item.index + delay) % roundLength == 0;
    });
}
