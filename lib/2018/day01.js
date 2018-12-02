'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const result = _.sum(data.split('\n').map((x) => +x));
    console.log(result);
};
