'use strict';
const _ = require('lodash');
const reg = /^(\d+)-(\d+)$/;

module.exports = function(part, data) {
    let merged = [];
    _(data.split('\n')).map((line) => {
        const matches = reg.exec(line);
        return {
            beg: parseInt(matches[1]),
            end: parseInt(matches[2])
        };
    }).each((interval) => {
        const begPosition = findPosition(merged, interval.beg);
        const endPosition = findPosition(merged, interval.end);

        let deleteCount = endPosition.index - begPosition.index;
        if (endPosition.include) deleteCount++;

        merged.splice(begPosition.index, deleteCount, {
            beg: begPosition.include ? merged[begPosition.index].beg : interval.beg,
            end: endPosition.include ? merged[endPosition.index].end : interval.end
        });
    });

    let min = 0;
    _(merged).sortBy((interval) => interval.beg).each((interval) => {
        // console.log(interval.beg, interval.end);
    }).some((interval) => {
        if (min < interval.beg) return true;

        min = interval.end + 1;
        return false;
    });

    console.log(min);
};

function findPosition(list, value) {
    let index = 0;
    let include = false;

    for (let i = 0; i < list.length; i++) {
        if (value >= list[i].beg && value <= list[i].end) {
            index = i;
            include = true;
            break;
        } else if (value < list[i].beg) {
            break;
        } else if (value > list[i].end) {
            index++;
        }
    }
    return {
        index: index,
        include: include
    };
}
