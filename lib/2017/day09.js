'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let score = 0;
    let totalScore = 0;
    let totalGarbage = 0;

    let needIgnore = false;
    let inGarbage = false;

    _.each(data, (c) => {
        if (needIgnore) {
            needIgnore = false;
            return;
        }

        switch (c) {
        case '{':
            if (inGarbage) {
                totalGarbage++;
            } else {
                score++;
            }
            break;
        case '}':
            if (inGarbage) {
                totalGarbage++;
            } else {
                totalScore += score;
                score--;
            }
            break;
        case '<':
            if (inGarbage) {
                totalGarbage++;
            } else {
                inGarbage = true;
            }
            break;
        case '>':
            inGarbage = false;
            break;
        case '!':
            needIgnore = true;
            break;
        default:
            if (inGarbage) {
                totalGarbage++;
            }
            break;
        }
    });
    console.log(part == 1 ? totalScore : totalGarbage);
};
