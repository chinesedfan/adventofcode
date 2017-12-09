'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let lines = _.map(data.split('\n'), (line) => line.split(/\s+/));
    if (part == 2) {
        lines = _.map(lines, (tokens) => _.map(tokens, (word) => _.sortBy(word).join()));
    }
    console.log(getValidCount(lines));
};

function getValidCount(lines) {
    return _.filter(lines, (list) => _.uniq(list).length == list.length).length;
}
