'use strict';
const _ = require('lodash');
const reg = /(\d+) units each with (\d+) hit points \(([^\)]+)\) with an attack that does (\d+) (\w+) damage at initiative (\d+)/;

module.exports = function(part, data) {
    const lines = data.split('\n');
    const sep = lines.indexOf('Infection:');
    let groups = [];

    lines.forEach((line, i) => {
        const matches = reg.exec(line);
        if (!matches) return;

        let weaks = [];
        let immunes = [];
        matches[3].split('; ').forEach((s) => {
            if (/^weak/.test(s)) {
                weaks = s.replace('weak to ', '').split(', ');
            } else {
                immunes = s.replace('immune to ', '').split(', ');
            }
        });

        const name = i < sep ? 'immune' : 'infection';
        groups.push({
            id: name + i,
            name,
            n: +matches[1],
            hp: +matches[2],
            weaks,
            immunes,
            damage: +matches[4],
            damageType: matches[5],
            initiative: +matches[6]
        });
    });

    while (1) {
        // targeting
        groups = _.sortBy(groups, [
            sortByPowerDec,
            sortByInitDec
        ]);
        groups.forEach((attacker) => attacker.target = getTarget(attacker, groups));

        // attacking
        _.sortBy(groups, sortByInitDec).forEach((attacker) => {
            const defender = attacker.target;
            if (!defender) return;

            const total = attacker.n * attacker.damage * getDamageFactor(attacker, defender);
            const killed = Math.floor(total / defender.hp);
            defender.n -= killed; // killed immediately
            defender.attacker = null;

            // console.log(attacker.id, defender.id, total, killed);
        });

        groups = groups.filter((g) => g.n > 0);

        const len = groups.filter((g) => g.name === 'immune').length;
        if (!len || len === groups.length) break;
    }

    console.log(_.sumBy(groups, 'n'));
};

function getTarget(attacker, defendings) {
    const sorted = _.sortBy(defendings.filter((g) => g.name != attacker.name && !g.attacker), [
        (defender) => -getDamageFactor(attacker, defender),
        sortByPowerDec,
        sortByInitDec
    ]);
    if (!sorted.length || !getDamageFactor(attacker, sorted[0])) return null;

    sorted[0].attacker = attacker;
    return sorted[0];
}

function getDamageFactor(attacker, defender) {
    if (defender.immunes.indexOf(attacker.damageType) >= 0) {
        return 0;
    } else if (defender.weaks.indexOf(attacker.damageType) >= 0) {
        return 2;
    } else {
        return 1;
    }
}

function sortByPowerDec(g) {
    return -g.n * g.damage;
}
function sortByInitDec(g) {
    return -g.initiative;
}
