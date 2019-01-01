'use strict';
const _ = require('lodash');
const reg = /(\d+) units each with (\d+) hit points (?:\(([^\)]+)\) )?with an attack that does (\d+) (\w+) damage at initiative (\d+)/;

module.exports = function(part, data) {
    const lines = data.split('\n');
    const sep = lines.indexOf('Infection:');
    let groups = [];

    lines.forEach((line, i) => {
        const matches = reg.exec(line);
        if (!matches) return;

        let weaks = [];
        let immunes = [];
        (matches[3] || '').split('; ').forEach((s) => {
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

    if (part == 1) {
        groups = fight(groups, 0);
        console.log(_.sumBy(groups, 'n'));
    } else {
        let n = 1;
        let clone;
        // find the bound
        while (1) {
            clone = fight(groups, n);
            if (clone[0].name === 'immune') break;

            n *= 2;
            console.log(n);
        }
        // binary search
        let left = n / 2;
        let right = n;
        while (right > left + 1) {
            try {
                n = Math.ceil((left + right) / 2);
                clone = fight(groups, n);
            } catch (e) {
                if (e.message === 'tie') {
                    // treat tie as failure
                    clone = [{name: 'infection'}];
                } else {
                    throw e;
                }
            }

            if (clone[0].name === 'immune') {
                right = n;
            } else {
                left = n;
            }
            console.log(left, right, n);
        }

        clone = fight(groups, right);
        console.log(_.sumBy(clone, 'n'));
    }
};

function fight(groups, boost) {
    groups = groups.map((o) => {
        const g = { ...o };
        if (g.name === 'immune') g.damage += boost;
        return g;
    });

    while (1) {
        // targeting
        groups = _.sortBy(groups, [
            sortByPowerDec,
            sortByInitDec
        ]);
        groups.forEach((attacker) => attacker.target = getTarget(attacker, groups));

        // attacking
        let totalKilled = 0;
        _.sortBy(groups, sortByInitDec).forEach((attacker) => {
            const defender = attacker.target;
            if (!defender) return;
            if (attacker.n < 0) {
                defender.attacker = null;
                return;
            }

            const total = attacker.n * attacker.damage * getDamageFactor(attacker, defender);
            const killed = Math.floor(total / defender.hp);
            totalKilled += killed;
            defender.n -= killed; // killed immediately
            defender.attacker = null;

            // console.log(attacker.id, defender.id, total, killed);
        });
        if (!totalKilled) throw new Error('tie');

        groups = groups.filter((g) => g.n > 0);

        const len = groups.filter((g) => g.name === 'immune').length;
        if (!len || len === groups.length) break;
    }

    return groups;
}

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
