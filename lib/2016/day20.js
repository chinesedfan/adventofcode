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

    console.log(part == 1 ? minValid(merged) : countValid(merged));
};

function minValid(list) {
    let min = 0;
    _(list).sortBy((interval) => interval.beg).some((interval) => {
        if (min < interval.beg) return true;

        min = interval.end + 1;
        return false;
    });

    return min;
}
function countValid(list) {
    const min = 0, max = 4294967295;
    return _.reduce(list, (count, interval, i) => {
        if (i == 0) {
            return interval.beg - min;
        }

        count += interval.beg - list[i - 1].end - 1;
        if (i == list.length - 1) {
            count += max - interval.end;
        }
        return count;
    }, 0);
}

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
