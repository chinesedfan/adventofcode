var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var player = {
		damage: 0,
		armor: 0,
		cost: 0,
		hp: 100
	};
	var boss = {
		// hard code
		hp: 103,
		damage: 9,
		armor: 2
	};

	var weapons = [
		{},
		{cost: 8, damage: 4},
		{cost: 10, damage: 5},
		{cost: 25, damage: 6},
		{cost: 40, damage: 7},
		{cost: 74, damage: 8}
	];
	var armor = [
		{},
		{cost: 13, armor: 1},
		{cost: 31, armor: 2},
		{cost: 53, armor: 3},
		{cost: 75, armor: 4},
		{cost: 102, armor: 5}
	];
	var rings = [
		{},
		{cost: 25, damage: 1},
		{cost: 50, damage: 2},
		{cost: 100, damage: 3},
		{cost: 20, armor: 1},
		{cost: 40, armor: 2},
		{cost: 80, armor: 3}
	];

	var isok, cost = Infinity;
	_.each(weapons, function(w) {
		addItem(player, w);
		_.each(armor, function(a) {
			addItem(player, a);
			_.each(rings, function(r1, i1) {
				addItem(player, r1);
				_.each(rings, function(r2, i2) {
					addItem(player, r2);
					if (r1.cost && i1 == i2) {
						removeItem(player, r2);
						return;
					};

					isok = isPlayerWin(player, boss);
					if (isok && player.cost < cost) {
						cost = player.cost;
					}

					removeItem(player, r2);
				});
				removeItem(player, r1);
			});
			removeItem(player, a);
		});
		removeItem(player, w);
	});
	console.log(cost);
}

function addItem(player, item) {
	player.damage += (item.damage || 0);
	player.armor += (item.armor || 0);
	player.cost += (item.cost || 0);
}
function removeItem(player, item) {
	player.damage -= (item.damage || 0);
	player.armor -= (item.armor || 0);
	player.cost -= (item.cost || 0);
}

function isPlayerWin(player, boss) {
	var t1 = boss.hp / Math.max(1, player.damage - boss.armor);
	var t2 = player.hp / Math.max(1, boss.damage - player.armor) + 1;
	return t1 < t2;
}