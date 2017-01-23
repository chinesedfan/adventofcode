'use strict';
const _ = require('lodash');
const reg = /^(\d+)x(\d+)$/;

module.exports = function(part, data) {
    const res = _(data.split('\n')).map((line) => getDecompressedLength(line, part == 2)).sum();

    console.log(res);
};

function getDecompressedLength(line, recursive) {
    let i = 0, j, mark, matches, s, t;
    let len = 0;

    // ignore whitespace
    while (i < line.length) {
        if (line[i] == '(') {
            j = i + 1;
            while (j < line.length) {
                if (line[j] == ')') break;
                j++;
            }

            if (j >= line.length) break;

            mark = line.substring(i + 1, j);
            if (matches = reg.exec(mark)) {
                s = parseInt(matches[1]);
                t = parseInt(matches[2]);

                i = j + 1 + s;
                if (recursive) {
                    s = getDecompressedLength(line.substr(j + 1, s), recursive);
                }
                len += s * t;
            } else {
                len++;
                i++;
            }
        } else {
            len++;
            i++;
        }
    }

    return len;
}
