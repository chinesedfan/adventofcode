var _ = require('lodash');

module.exports = solve;

function solve(part, data) {
	var player = {
		hp: 50,
		mana: 500,
		//
		damage: 0,
		armor: 0,
		cost: 0
	};
	var boss = {
		// hard code
		hp: 55,
		damage: 8,
		armor: 0
	};

	var root = new State(player, boss), node, children,
		stack = [root], min = Infinity;
	// dfs
	while (stack.length) {
		node = stack.pop();
		children = node.children();
		if (children.length) {
			stack = stack.concat(children);
		} else if (node.winner == 'player' && node.player.cost < min) {
			min = node.player.cost;
		}
	}
	console.log(min);
}

function State(player, boss) {
	this.player = player;
	this.boss = boss;
	this.shieldTimer = 0;
	this.poisonTimer = 0;
	this.rechargeTimer = 0;
}
State.prototype.clone = function() {
	var ret = new State(this.player, this.boss);
	ret.shieldTimer = this.shieldTimer;
	ret.poisonTimer = this.poisonTimer;
	ret.rechargeTimer = this.rechargeTimer;
	return ret;
}
State.prototype.children = function() {
	var ret = [], child;

	this.updateEffects();
	if (this.boss.hp <= 0) {
		this.winner = 'player';
		return ret;
	}
	this.updateBossAction();
	if (this.player.hp <= 0 || this.player.mana < 53) {
		this.winner = 'boss';
		return ret;
	}

	if (this.player.mana >= 53) {
		ret.push(this.clone().missile());
	}
	if (this.player.mana >= 73) {
		ret.push(this.clone().drain());
	}
	if (this.player.mana >= 113 && !this.shieldTimer) {
		ret.push(this.clone().shield());
	}
	if (this.player.mana >= 173 && !this.poisonTimer) {
		ret.push(this.clone().poison());
	}
	if (this.player.mana >= 229 && !this.rechargeTimer) {
		ret.push(this.clone().recharge());
	}
	return ret;
};
State.prototype.missile = function() {
	this.boss.hp -= 4;	
	this.player.cost += 53;
	return this;
}
State.prototype.drain = function() {
	this.boss.hp -= 2;
	this.player.hp += 2;
	this.player.cost += 73;
	return this;
};
State.prototype.shield = function() {
	this.shieldTimer = 6;
	this.player.cost += 113;
	return this;
};
State.prototype.poison = function() {
	this.poisonTimer = 6;
	this.player.cost += 173;
	return this;
};
State.prototype.recharge = function() {
	this.rechargeTimer = 5;
	this.player.cost += 229;
	return this;
};
State.prototype.updateEffects = function() {
	if (this.shieldTimer) {
		this.player.armor += 7;
		this.shieldTimer--;
	}
	if (this.poisonTimer) {
		this.boss.hp -= 3;
		this.poisonTimer--;
	}
	if (this.rechargeTimer) {
		this.player.mana += 101;
		this.rechargeTimer--;
	}	
};
State.prototype.updateBossAction = function() {
	this.player.hp -= Math.max(1, this.boss.damage - this.player.armor);
};
