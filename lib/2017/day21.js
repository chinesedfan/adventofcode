'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    const rules = {};
    _.each(data.split('\n'), (line) => {
        const matches = /(.+) => (.+)/.exec(line);
        const grid = str2grid(matches[1]);
        const target = str2grid(matches[2]);
        _.each(getAllStrs(grid), (key) => {
            rules[key] = target;
        });
    });

    let grid = str2grid('.#./..#/###');
    let iterations = part == 1 ? 5 : 18;
    while (iterations--) {
        const n = (grid.length % 2) == 0 ? 2 : 3;
        const subGrids = divideIntoSubGrids(grid, n);
        grid = mergeSubGrids(_(subGrids).map(grid2str).map((str) => rules[str]).value(), grid.length / n);
    }
    console.log(getOnCount(grid));
};

function str2grid(str) {
    return _.map(str.split('/'), (line) => line.split(''));
}
function grid2str(grid) {
    return _.map(grid, (row) => row.join('')).join('/');
}
function divideIntoSubGrids(grid, n) {
    return _(grid)
        .map((row) => _.chunk(row, n))
        .chunk(n)
        .map((g) => _.zip.apply(this, g))
        .flatten()
        .value();
}
function mergeSubGrids(subGrids, n) {
    return _(subGrids)
        .chunk(n)
        .map((g) => _.zip.apply(this, g))
        .flatten()
        .map((chunks) => _.concat.apply(this, chunks))
        .value();
}

function getAllStrs(grid) {
    const s1 = getAllRotateStrs(grid);
    const s2 = getAllRotateStrs(getFlipGrid(grid));
    return _.uniq(s1.concat(s2));
}
function getAllRotateStrs(grid) {
    const results = [];
    let i = 4;
    while (i--) {
        results.push(grid2str(grid));
        grid = getRotateRightGrid(grid);
    }
    return results;
}
function getFlipGrid(grid) {
    return _.map(grid, (row, i) => {
        return _.map(row, (c, j) => grid[i][row.length - 1 - j]);
    });
}
function getRotateRightGrid(grid) {
    return _.map(grid, (row, i) => {
        return _.map(row, (c, j) => grid[grid.length - 1 - j][i]);
    });
}

function getOnCount(grid) {
    return _.sum(_.map(grid, (line) => _.filter(line, (c) => c === '#').length));
}
