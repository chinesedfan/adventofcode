'use strict';
const _ = require('lodash');
const rSwapPosition = /^swap position (\d+) with position (\d+)$/;
const rSwapLetter = /^swap letter ([a-z]) with letter ([a-z])$/;
const rRotateStep = /^rotate (left|right) (\d+) steps?$/;
const rRotateByLetter = /^rotate based on position of letter ([a-z])$/;
const rReverse = /^reverse positions (\d+) through (\d+)$/;
const rMove = /^move position (\d+) to position (\d+)$/;

module.exports = function(part, data) {
    const f = part == 1 ? f1 : f2;
    f(part, data);
};

function f1(part, data) {
    let input = 'abcdefgh';
    _(data.split('\n')).each((line) => {
        let matches;
        if (matches = rSwapPosition.exec(line)) {
            input = swapPosition(input, parseInt(matches[1]), parseInt(matches[2]));
        } else if (matches = rSwapLetter.exec(line)) {
            input = swapLetter(input, matches[1], matches[2]);
        } else if (matches = rRotateStep.exec(line)) {
            input = rotateStep(input, matches[1] == 'left', parseInt(matches[2]));
        } else if (matches = rRotateByLetter.exec(line)) {
            input = rotateByLetter(input, matches[1]);
        } else if (matches = rReverse.exec(line)) {
            input = reverse(input, parseInt(matches[1]), parseInt(matches[2]));
        } else if (matches = rMove.exec(line)) {
            input = move(input, parseInt(matches[1]), parseInt(matches[2]));
        } else {
            throw new Error('invalid cmd:', line);
        }
    });

    console.log(input);
}
function f2(part, data) {
    let input = 'fbgdceah';
    _(data.split('\n')).reverse().each((line) => {
        let matches;
        if (matches = rSwapPosition.exec(line)) {
            input = swapPosition(input, parseInt(matches[2]), parseInt(matches[1]));
        } else if (matches = rSwapLetter.exec(line)) {
            input = swapLetter(input, matches[2], matches[1]);
        } else if (matches = rRotateStep.exec(line)) {
            input = rotateStep(input, matches[1] != 'left', parseInt(matches[2]));
        } else if (matches = rRotateByLetter.exec(line)) {
            input = deRotateByLetter(input, matches[1]);
        } else if (matches = rReverse.exec(line)) {
            input = reverse(input, parseInt(matches[1]), parseInt(matches[2]));
        } else if (matches = rMove.exec(line)) {
            input = move(input, parseInt(matches[2]), parseInt(matches[1]));
        } else {
            throw new Error('invalid cmd:', line);
        }
    });

    console.log(input);
}

function swapPosition(line, x, y) {
    if (x > y) return swapPosition(line, y, x);
    return line.substring(0, x) + line[y] + line.substring(x + 1, y) + line[x] + line.substring(y + 1);
}
function swapLetter(line, x, y) {
    x = line.indexOf(x);
    y = line.indexOf(y);
    return swapPosition(line, x, y);
}
function rotateStep(line, isLeft, x) {
    x %= line.length;
    return isLeft ? line.substring(x) + line.substring(0, x)
        : line.substring(line.length - x) + line.substring(0, line.length - x);
}
function rotateByLetter(line, x) {
    x = line.indexOf(x);
    x = 1 + x + (x >= 4 ? 1 : 0);
    return rotateStep(line, false, x);
}
function deRotateByLetter(line, x) {
    for (let i = 1; i < line.length + 2; i++) {
        let origin = rotateStep(line, true, i);
        if (rotateByLetter(origin, x) == line) return origin;
    }
    throw new Error('cannot deRotateByLetter');
}
function reverse(line, x, y) {
    return line.substring(0, x) + _(line.substring(x, y + 1)).map().reverse().join('') + line.substring(y + 1);
}
function move(line, x, y) {
    if (x < y) {
        return line.substring(0, x) + line.substring(x + 1, y + 1) + line[x] + line.substring(y + 1);
    } else {
        return line.substring(0, y) + line[x] + line.substring(y, x) + line.substring(x + 1);
    }
}
