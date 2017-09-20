'use strict';
const _ = require('lodash');

module.exports = function(part, data) {
    let count = 0;
    const floors = _.map(data.split('\n'), (line) => {
        const arr = [];
        line.replace(/(\S+)( generator|(?:-compatible microchip))/g, (match, key, type) => {
            arr.push({
                key,
                type: type == ' generator' ? 'G' : 'M'
            });
            count++;
        });
        return arr;
    });
    if (part == 2) {
        floors[0] = floors[0].concat([{
            key: 'elerium',
            type: 'G'
        }, {
            key: 'elerium',
            type: 'M'
        }, {
            key: 'dilithium',
            type: 'G'
        }, {
            key: 'dilithium',
            type: 'M'
        }]);
        count += 4;
    }

    let q = [{
        steps: 0,
        elevator: 0,
        floors
    }];
    const hashes = {};
    hashes[getStateHash(q[0])] = 1;
    while (q.length) {
        const state = q.shift();
        const nextStates = getNextStates(state, count);
        // special flag
        if (!_.isArray(nextStates)) {
            printStates(nextStates);
            console.log(state.steps + 1);
            break;
        }
        // update
        _.each(nextStates, (s) => {
            const h = getStateHash(s);
            if (hashes[h]) return;

            hashes[h] = 1;
            q.push(s);
        });
        console.log('q.length =', q.length);
    }
};

function getStateHash(state) {
    const map = {};
    _.each(state.floors, (items, i) => {
        _.each(items, (item) => {
            if (!map[item.key]) {
                map[item.key] = i + '';
            } else if (item.type == 'G') {
                map[item.key] = i + map[item.key];
            } else {
                map[item.key] = map[item.key] + i;
            }
        });
    });
    return `e${state.elevator}:` + _(map).values().sortBy().join(',');
}
function getNextStates(state, count) {
    let nextStates = [];
    // move down
    if (state.elevator) {
        nextStates = nextStates.concat(
            _.map(getNextFloors(state.floors, state.elevator, state.elevator - 1), (floors) => {
                return {
                    prev: state,
                    steps: state.steps + 1,
                    elevator: state.elevator - 1,
                    floors
                };
            })
        );
    }
    // move up
    let done = false;
    if (state.elevator != state.floors.length - 1) {
        nextStates = nextStates.concat(
            _.map(getNextFloors(state.floors, state.elevator, state.elevator + 1), (floors) => {
                if (floors[floors.length - 1].length == count) done = state;
                return {
                    prev: state,
                    steps: state.steps + 1,
                    elevator: state.elevator + 1,
                    floors
                };
            })
        );
    }
    return done || nextStates;
}
function getNextFloors(floors, index1, index2) {
    const fromItems = floors[index1];
    const toItems = floors[index2];

    let nextFloors = [];
    _.each(fromItems, (item1) => {
        // take 1
        const f1 = _.filter(fromItems, (item) => item.key != item1.key || item.type != item1.type);
        const f2 = toItems.concat([item1]);
        updateNextFloors(f1, f2);

        // take 2
        _.each(fromItems, (item2) => {
            if (item1 == item2) return;

            const f3 = _.filter(f1, (item) => item.key != item2.key || item.type != item2.type);
            const f4 = f2.concat([item2]);
            updateNextFloors(f3, f4);
        });
    });

    function updateNextFloors(f1, f2) {
        if (!validFloor(f1) || !validFloor(f2)) return;

        nextFloors.push(_.map(floors, (items, i) => {
            if (i == index1) return f1;
            if (i == index2) return f2;
            return items;
        }));
    }

    return nextFloors;
}

function validFloor(items) {
    let hasG = false;
    const map = {};
    _.each(items, (item) => {
        if (item.type == 'G') {
            hasG = true;
        }
        map[item.key] = (map[item.key] || '') + item.type;
    });
    return !hasG || _.every(map, (c) => c != 'M');
}

function printStates(state) {
    while (state) {
        console.log(getStateHash(state));
        state = state.prev;
    }
}
