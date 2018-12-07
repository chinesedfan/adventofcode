'use strict';
const _ = require('lodash');
const reg = /^\[1518-(\d\d)-(\d\d) (\d\d):(\d\d)\] (wakes up|falls asleep|Guard #(\d+) begins shift)$/;

module.exports = function(part, data) {
    const lines = data.split('\n');

    const records = getRecords(lines);
    records.sort((a, b) => fn(a) - fn(b));

    const guards = _.values(getGuards(records));

    if (part == 1) {
        guards.sort((a, b) => b.total - a.total);

        const sleepMostGuard = guards[0];
        const sleepMostMinute = _.entries(sleepMostGuard.minutes)
            .sort((a, b) => b[1] - a[1])[0][0];

        console.log(sleepMostGuard.id * sleepMostMinute);
    } else {
        const m = _(guards).map((g) => ({
            id: g.id,
            max: _(g.minutes).entries().maxBy((pair) => pair[1]) // [min, count]
        })).maxBy((x) => (x.max ? x.max[1] : -Infinity));

        console.log(m.id * m.max[0]);
    }
};

function getRecords(lines) {
    const records = [];
    lines.forEach((line) => {
        line.replace(reg, (match, m, d, hour, minute, msg, id) => {
            records.push({
                match,
                m: +m,
                d: +d,
                hour: +hour,
                minute: +minute,
                msg,
                id
            });
            return match;
        });
    });
    return records;
}
function fn(item) {
    return item.m * 31 * 1440 + item.d * 1440 + item.hour * 60 + item.minute;
}

function getGuards(records) {
    const guards = {}; // id -> guard

    let g;
    records.forEach((r, i) => {
        if (r.msg === 'wakes up') {
            const prev = records[i - 1];
            if (prev.msg !== 'falls asleep') throw new Error(`wakes up error:\n${prev.match}\n${r.match}`);
            if (prev.minute === r.minute) throw new Error('in case of same minute');

            for (let m = prev.minute; m != r.minute; m++) {
                if (m === 60) m = 0;
                g.minutes[m] = (g.minutes[m] || 0) + 1;
                g.total++;
            }
        } else if (r.msg === 'falls asleep') {
            // do nothing
        } else {
            if (!guards[r.id]) {
                guards[r.id] = {
                    id: r.id,
                    total: 0,
                    minutes: {}
                };
            }

            g = guards[r.id];
        }
    });
    return guards;
}
