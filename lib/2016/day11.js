'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const floors = _.map(data.split('\n'), (line) => {
        const arr = [];
        line.replace(/(\S+)( generator|(?:-compatible microchip))/g, (match, key, type) => {
            arr.push({
                key,
                type: type == ' generator' ? 'G' : 'M'
            });
        });
        return arr;
    });
    console.log(JSON.stringify(floors));
};
