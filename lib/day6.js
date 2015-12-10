var _ = require('underscore');

function initLights(x, y) {
	var i, j, grid = [], row;

	for (i = 0; i < x; i++) {
		row = [];
		for (j = 0; j < y; j++) {
			row.push(0);
		}
		grid.push(row);
	}
	return grid;
}
function countLights(grid) {
	var count = 0;
	for (var i = 0; i < grid.length; i++) {
		for (var j = 0; j < grid[i].length; j++) {
			count += grid[i][j];
		}
	}
	return count;
}

function op(grid, cmd, begx, begy, endx, endy) {
	begx = parseInt(begx);
	begy = parseInt(begy);
	endx = parseInt(endx);
	endy = parseInt(endy);
	
	// The input has guaranteed that begx <= endx and begy <= endy

	for (var i = begx; i <= endx; i++) {
		for (var j = begy; j <= endy; j++) {
			switch(cmd) {
			case 'turn off':
				grid[i][j] = 0; break;
			case 'turn on':
				grid[i][j] = 1; break;
			case 'toggle':
				grid[i][j] = grid[i][j] ? 0 : 1; break;
			default:
				break;
			}
		}
	}
}
function opWithBrightness(grid, cmd, begx, begy, endx, endy) {
	begx = parseInt(begx);
	begy = parseInt(begy);
	endx = parseInt(endx);
	endy = parseInt(endy);
	
	// The input has guaranteed that begx <= endx and begy <= endy

	for (var i = begx; i <= endx; i++) {
		for (var j = begy; j <= endy; j++) {
			switch(cmd) {
			case 'turn off':
				grid[i][j] && grid[i][j]--; break;
			case 'turn on':
				grid[i][j]++; break;
			case 'toggle':
				grid[i][j] += 2; break;
			default:
				break;
			}
		}
	}
}

function solve(part, data) {
	var lights = initLights(1000, 1000);
	var rLine = /^(turn off|turn on|toggle) (\d+),(\d+) through (\d+),(\d+)$/,
		matches;
	var fnOp = part == 1 ? op : opWithBrightness;

	_.each(data.split('\n'), function(line) {
		matches = rLine.exec(line);
		if (matches) {
			fnOp(lights, matches[1], matches[2], matches[3], matches[4], matches[5]);
		}
	});
	console.log(countLights(lights));
}
module.exports = solve;