var _ = require('lodash');

function addInstruction(nodes, op1, op, op2, output) {
	var onode = getNode(nodes, output);
	onode.op = op || 'ASSIGN';
	onode.op1 = getNode(nodes, op1);
	onode.op2 = getNode(nodes, op2);
}
function getNode(nodes, id) {
	if (!id) return id;

	if (!nodes[id]) {
		nodes[id] = {
			id: id
		};
	}
	return nodes[id];
}
function getValue(nodes, id) {
	var root = nodes[id], node, ok1, ok2,
		stack = [root];

	// post-order travling the tree
	while (stack.length) {
		node = stack.pop();

		// signal node
		if (!node.op) {
			node.value = parseInt(node.id);
			continue;
		}

		// check dependencies
		ok1 = true, ok2 = true;
		if (node.op1 && _.isUndefined(node.op1.value)) {
			ok1 = false;
		}
		if (node.op2 && _.isUndefined(node.op2.value)) {
			ok2 = false;
		}
		if (!ok1 || !ok2) {
			stack.push(node);
			!ok1 && stack.push(node.op1);
			!ok2 && stack.push(node.op2);
			continue;
		}

		// depended nodes have been calculated
		switch (node.op) {
		case 'ASSIGN':
			node.value = node.op2.value;
			break;
		case 'NOT':
			node.value = ~node.op2.value;
			break;
		case 'AND':
			node.value = node.op1.value & node.op2.value;
			break;
		case 'OR':
			node.value = node.op1.value | node.op2.value;
			break;
		case 'LSHIFT':
			node.value = node.op1.value << node.op2.value;
			break;
		case 'RSHIFT':
			node.value = node.op1.value >> node.op2.value;
			break;
		default:
			break;
		}
		node.value &= 0xffff;
	}
	return nodes[id].value;
}
function emulate(nodes) {
	return getValue(nodes, 'a');
}

function reset(nodes) {
	_.each(nodes, function(node, id) {
		node.value = undefined;
	});
}

function solve(part, data) {
	var rLine = /^(?:(?:(\w+) )?([A-Z]+) )?(\w+) -> ([a-z]+)$/,
		matches;
	var nodes = {};

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (matches) {
			addInstruction(nodes, matches[1], matches[2], matches[3], matches[4]);
		}
	});

	var result = emulate(nodes);
	if (part == 2) {
		reset(nodes);
		getNode(nodes, 'b').value = result;
		result = emulate(nodes);
	}
	console.log(result);
}
module.exports = solve;