'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const cps = _.map(data.split('\n'), (line, i) => {
        const matches = /(\d+)\/(\d+)/.exec(line);
        return {
            id: i,
            start: parseInt(matches[1]),
            end: parseInt(matches[2])
        };
    });

    const longest = part == 2;
    const result = _(cps).map((item) => [
        dfs(cps, item, false, longest),
        dfs(cps, item, true, longest)
    ]).flatten().sortBy(['maxLength', 'maxStrength']).last().maxStrength;

    console.log(result);
};

function dfs(cps, r, rotated, longest) {
    let maxStrength = 0;
    let maxLength = 0;
    // the first port should start with 0-pin
    if ((rotated ? r.end : r.start) != 0) return {maxStrength, maxLength};

    const s = [{
        ids: [r.id],
        end: rotated ? r.start : r.end, // each component can be rotated
        strength: r.start + r.end
    }];

    while (s.length) {
        const state = s.pop();
        if (longest) {
            if (state.ids.length > maxLength) {
                maxLength = state.ids.length;
                maxStrength = state.strength;
            } else if (state.ids.length == maxLength) {
                maxStrength = Math.max(maxStrength, state.strength);
            }
        } else {
            maxStrength = Math.max(maxStrength, state.strength);
        }

        const candidates = _.filter(cps, (item) => (item.start == state.end || item.end == state.end)
                && state.ids.indexOf(item.id) < 0);
        _.each(candidates, (item) => {
            s.push({
                ids: state.ids.concat([item.id]),
                end: item.start == state.end ? item.end : item.start,
                strength: state.strength + item.start + item.end
            });
        });
    }

    return {
        maxStrength,
        maxLength
    };
}
