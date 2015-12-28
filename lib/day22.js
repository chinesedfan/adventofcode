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
		stack = [root];
	// dfs
	while (stack.length) {
		node = stack.shift();
		children = node.children();
		if (children.length) {
			stack = stack.concat(children);
		} else if (node.winner == 'player' && node.player.cost < node.min) {
			State.prototype.min = node.player.cost;
			console.log(node.min, stack.length)
		}
	}
	console.log(node.min);
}

function State(player, boss) {
	this.player = _.clone(player);
	this.boss = _.clone(boss);
	this.shieldTimer = 0;
	this.poisonTimer = 0;
	this.rechargeTimer = 0;
}
State.prototype.min = Infinity;
State.prototype.clone = function() {
	var ret = new State(this.player, this.boss);
	ret.shieldTimer = this.shieldTimer;
	ret.poisonTimer = this.poisonTimer;
	ret.rechargeTimer = this.rechargeTimer;
	return ret;
}
State.prototype.children = function() {
	var ret = [], child;
	if (this.winner) return [];

	this.updateEffects();
	if (this.boss.hp <= 0) {
		this.winner = 'player';
		return [];
	}
	if (this.player.mana < 53) {
		this.winner = 'boss';
		return [];
	}
	if (this.player.mana >= 53) {
		ret.push('missile');
	}
	if (this.player.mana >= 73) {
		ret.push('drain');
	}
	if (this.player.mana >= 113 && !this.shieldTimer) {
		ret.push('shield');
	}
	if (this.player.mana >= 173 && !this.poisonTimer) {
		ret.push('poison');
	}
	if (this.player.mana >= 229 && !this.rechargeTimer) {
		ret.push('recharge');
	}

	var self = this;
	return _.chain(ret).map(function(spell) {
		child = self.clone();
		child[spell]();
		if (child.player.cost > child.min) {
			child.winner = 'other player';
			return child;
		}

		child.updateEffects();
		if (child.boss.hp <= 0) {
			child.winner = 'player';
			return child;
		}

		child.updateBossAction();
		if (child.player.hp <= 0) {
			child.winner = 'boss';
			return child;
		}
		return child;
	}).filter(function(child) {
		return !child.winner;
	}).value();
};
State.prototype.missile = function() {
	this.boss.hp -= 4;	
	this.player.mana -= 53;
	this.player.cost += 53;
	return this;
}
State.prototype.drain = function() {
	this.boss.hp -= 2;
	this.player.hp += 2;
	this.player.mana -= 73;
	this.player.cost += 73;
	return this;
};
State.prototype.shield = function() {
	this.shieldTimer = 6;
	this.player.mana -= 113;
	this.player.cost += 113;
	return this;
};
State.prototype.poison = function() {
	this.poisonTimer = 6;
	this.player.mana -= 173;
	this.player.cost += 173;
	return this;
};
State.prototype.recharge = function() {
	this.rechargeTimer = 5;
	this.player.mana -= 229;
	this.player.cost += 229;
	return this;
};
State.prototype.updateEffects = function() {
	if (this.shieldTimer) {
		this.player.armor = 7;
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
	return this;
};
State.prototype.updateBossAction = function() {
	this.player.hp -= Math.max(1, this.boss.damage - this.player.armor);
	return this;
};
