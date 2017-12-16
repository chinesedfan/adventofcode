'use strict';
const _ = require('lodash');
const getKnotHash = _.partial(require('./day10.js'), 2);

module.exports = function(part, data) {
    const usedMap = _(_.times(128))
        .map((i) => data.replace('\n', '') + '-' + i)
        .map(getKnotHash)
        .map(getUsedRow);

    let result;
    if (part == 1) {
        result = usedMap.map((usedRow) => usedRow.filter((c) => c == '1').value().length)
            .sum();
    } else {
        result = 0;
        const usedMapValue = usedMap.map((usedRow) => usedRow.value()).value();
        const visited = {};
        for (let i = 0; i < usedMapValue.length; i++) {
            for (let j = 0; j < usedMapValue[i].length; j++) {
                if (!isUsedUnvisited(i, j, visited, usedMapValue)) continue;

                // bfs
                const q = [{i, j}];
                while (q.length) {
                    const p = q.shift();
                    visited[p.i + '#' + p.j] = 1;
                    if (isUsedUnvisited(p.i - 1, p.j, visited, usedMapValue)) q.push({i: p.i - 1, j: p.j});
                    if (isUsedUnvisited(p.i + 1, p.j, visited, usedMapValue)) q.push({i: p.i + 1, j: p.j});
                    if (isUsedUnvisited(p.i, p.j - 1, visited, usedMapValue)) q.push({i: p.i, j: p.j - 1});
                    if (isUsedUnvisited(p.i, p.j + 1, visited, usedMapValue)) q.push({i: p.i, j: p.j + 1});
                }
                result++;
            }
        }
    }
    console.log(result);
};

function getUsedRow(hash) {
    return _(_.range(0, hash.length, 2)).map((start) => hash.slice(start, start + 2)).map((hex) => {
        const value = parseInt(hex, 16);
        let binary = value.toString(2);
        while (binary.length != 8) binary = '0' + binary;
        return binary.split('');
    }).flatten(); // lodash object
}

function isUsedUnvisited(i, j, visited, usedMapValue) {
    return i >= 0 && i < usedMapValue.length
        && j >= 0 && j < usedMapValue[i].length
        && usedMapValue[i][j] == '1' && !visited[i + '#' + j];
}
