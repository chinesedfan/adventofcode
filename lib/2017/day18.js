'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-z]|\d+)(?: ([a-z]|[-]?\d+))?/;
const q = [[], []];
let lastSend, lastRecv, curProgram;
let gPart;

const CAN_NOT_RECV = -1;
const AFTER_RECV = -2;
const AFTER_SEND = -3;

module.exports = function(part, data) {
    gPart = part;

    const lines = data.split('\n');
    const p0 = new Program(0, lines);
    if (part == 1) {
        p0.onSend = function(val) {
            q[this.id].push(val);
            this.isBlocked = false;
        };
        p0.onRecv = function(val) {
            console.log('lastSend=' + val);
        };
        p0.run();
    } else {
        const p1 = new Program(1, lines);
        // diff with part 1
        p0.regs.p = 0;
        p1.regs.p = 1;
        // prepare
        let send = 0;
        p0.onCantRecv = p1.onCantRecv = function(changed) {
            if (!changed) {
                console.log('send=' + send);
            } else if (this.id == 0) {
                // 0 -> 1, call sub function
                p1.resume();
            } else {
                // 1 -> 0, set and return
                p0.isBlocked = false;
            }
        };
        p0.onSend = p1.onSend = function(val) {
            if (this.id == 1) send++;

            q[this.id].push(val);
            this.isBlocked = false;
        };
        p0.onRecv = p1.onRecv = function(val) {
            this.isBlocked = false;
        };
        // start
        p0.run();
    }
};

function exec(regs, ip, instr) {
    const matches = rInstr.exec(instr);
    if (!matches) throw new Error('invlaid instr', instr);

    switch (matches[1]) {
    case 'snd':
        lastSend = getVal(regs, matches[2]);
        return AFTER_SEND;
    case 'set':
        regs[matches[2]] = getVal(regs, matches[3]);
        break;
    case 'add':
        regs[matches[2]] += getVal(regs, matches[3]);
        break;
    case 'mul':
        regs[matches[2]] *= getVal(regs, matches[3]);
        break;
    case 'mod':
        regs[matches[2]] %= getVal(regs, matches[3]);
        break;
    case 'rcv':
        // `rcv X` recovers the frequency of the last sound played,
        // but only when the value of X is not zero. (If it is zero, the command does nothing.)
        //
        // Be careful! Only part 1 has the above limitation.
        if (gPart == 1) {
            if (getVal(regs, matches[2]) > 0 && q[curProgram].length) {
                lastRecv = q[curProgram].pop();
                regs[matches[2]] = lastRecv;
                return AFTER_RECV;
            }
        } else {
            const queue = q[curProgram ? 0 : 1];
            if (_.isEmpty(queue)) return CAN_NOT_RECV;

            lastRecv = queue.shift();
            regs[matches[2]] = lastRecv;
            return AFTER_RECV;
        }
        break;
    case 'jgz':
        if (getVal(regs, matches[2]) > 0) return ip + getVal(regs, matches[3]);
        break;
    default:
        throw new Error('invlaid op', matches[1]);
    }
    return ip + 1;
}
function getVal(regs, r) {
    return /[a-z]/.test(r) ? (regs[r] || 0) : parseInt(r);
}

function Program(id, instrs) {
    this.id = id;
    this.instrs = instrs;

    this.ip = 0;
    this.regs = {};
    this.isBlocked = false;
}
Program.prototype.run = function() {
    curProgram = this.id;

    let changed = false;
    while (!this.isBlocked && this.ip < this.instrs.length) {
        const ip = exec(this.regs, this.ip, this.instrs[this.ip]);
        switch (ip) {
        case CAN_NOT_RECV:
            this.isBlocked = true;
            this.onCantRecv && this.onCantRecv(changed);
            changed = false;
            curProgram = this.id;
            break;
        case AFTER_RECV:
            changed = true;
            this.ip = this.ip + 1;
            this.isBlocked = true;
            this.onRecv && this.onRecv(lastRecv);
            break;
        case AFTER_SEND:
            changed = true;
            this.ip = this.ip + 1;
            this.isBlocked = true;
            this.onSend && this.onSend(lastSend);
            break;
        default:
            changed = true;
            this.ip = ip;
            break;
        }
    }
};
Program.prototype.resume = function() {
    this.isBlocked = false;
    this.run();
};
