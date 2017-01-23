'use strict';
const _ = require('lodash');
const rRect = /^rect (\d+)x(\d+)$/;
const rRotateRow = /^rotate row y=(\d+) by (\d+)$/;
const rRotateColumn = /^rotate column x=(\d+) by (\d+)$/;

module.exports = function(part, data) {
    let grid = initGrid(6, 50);
    _.each(data.split('\n'), (line) => {
        let matches;
        if (matches = rRect.exec(line)) {
            rect(grid, parseInt(matches[1]), parseInt(matches[2]));
        } else if (matches = rRotateRow.exec(line)) {
            rotateRow(grid, parseInt(matches[1]), parseInt(matches[2]));
        } else if (matches = rRotateColumn.exec(line)) {
            rotateColumn(grid, parseInt(matches[1]), parseInt(matches[2]));
        }

        // printGrid(grid);
    });

    if (part == 2) {
        printGrid(grid);
    }
    console.log(countGrid(grid));
};

function initGrid(row, column) {
    let grid = [];
    let arr;
    for (var i = 0; i < row; i++) {
        arr = [];
        for (var j = 0; j < column; j++) {
            arr.push('.');
        }
        grid.push(arr);
    }
    return grid;
}
function countGrid(grid) {
    let count = 0;
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == '#') count++;
        }
    }
    return count;
}
function printGrid(grid) {
    for (var i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''));
    }
    console.log('\n');
}

function rect(grid, a, b) {
    for (var i = 0; i < b; i++) {
        for (var j = 0; j < a; j++) {
            grid[i][j] = '#';
        }
    }
}
function rotateRow(grid, a, b) {
    const arr = grid[a];
    b %= arr.length;

    grid[a] = arr.slice(arr.length - b).concat(arr.slice(0, arr.length - b));
}
function rotateColumn(grid, a, b) {
    const arr = _.map(grid, (l) => l[a]);
    b %= arr.length;

    for (var i = 0; i < grid.length; i++) {
        grid[i][a] = arr[i >= b ? i - b : i + arr.length - b];
    }
}
