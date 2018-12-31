'use strict';
const _ = require('lodash');
const reg = /(\d+) units each with (\d+) hit points \(([^\)]+)\) with an attack that does (\d+) (\w+) damage at initiative (\d+)/;

module.exports = function(part, data) {
    const lines = data.split('\n');
    const sep = lines.indexOf('Infection:');
    const immune = [];
    const infection = [];

    lines.forEach((line, i) => {
        const matches = reg.exec(line);
        if (!matches) return;

        const powers = matches[3].split('; ');
        let weaks, immunes;
        if (powers.length === 2) {
            weaks = powers[0].replace('weak to ', '').split(', ');
            immunes = powers[1].replace('immune to ', '').split(', ');
        } else {
            weaks = powers[0].replace('weak to ', '').split(', ');
            immunes = powers[0].replace('immune to ', '').split(', ');
        }

        const list = i < sep ? immune : infection;
        list.push({
            n: +matches[1],
            hp: +matches[2],
            weaks,
            immunes,
            damage: +matches[4],
            damageType: matches[5],
            initiative: +matches[6]
        });
    });

    console.log(immune);
};
