'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const result = _(data.split('\n'))
            .map((line) => line.split(/\s+/))
            .map((tokens) => _.map(tokens, (t) => parseInt(t)))
            .map(part == 1 ? getDiff : getDivisionResult)
            .sum();
    console.log(result);
};

function getDiff(nums) {
    return _.max(nums) - _.min(nums);
}

function getDivisionResult(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i == j) continue;

            const r = nums[i] > nums[j] ? nums[i] / nums[j] : nums[j] / nums[i];
            if (Math.floor(r) == r) return r;
        }
    }
    return 1;
}
