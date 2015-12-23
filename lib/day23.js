var _ = require('underscore');

module.exports = solve;

function solve(part, data) {
	var rInstruction = /^(\w+) (\w|[\+\-]\d+)(?:, ([\+\-]\d+))?$/;
	var instructions = [];

	_.each(data.split('\n'), function(line, i, list) {
		matches = rInstruction.exec(line);
		if (matches) {
			instructions.push({
				op: matches[1],
				args: matches.slice(2)
			});
		}
	});

	var index = 0, r = {
		a: 0,
		b: 0
	};
	while (1) {
		if (index >= instructions.length) break;
		instr = instructions[index];

		switch (instr.op) {
		case 'hlf':
			r[instr.args[0]] /= 2;
			break;
		case 'tpl':
			r[instr.args[0]] *= 3;
			break;
		case 'inc':
			r[instr.args[0]]++;
			break;
		case 'jmp':
			index += parseInt(instr.args[0]);
			continue;
		case 'jie':
			if (!(r[instr.args[0]] & 1)) {
				index += parseInt(instr.args[1]);
				continue;
			}
			break;
		case 'jio':
			if (r[instr.args[0]] == 1) {
				index += parseInt(instr.args[1]);
				continue;
			}
			break;
		default:
			throw new Error('unknow op:', instr.op);
		}
		index++;
	}
	console.log(r.b);
}