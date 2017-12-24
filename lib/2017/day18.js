'use strict';
const _ = require('lodash');
const rInstr = /(\w+) ([a-z])(?: ([a-z]|[-]?\d+))?/;
let lastPlayed, curProgram, playedProgram;

const CAN_NOT_RECV = -1;
const AFTER_RECV = -2;
const AFTER_SEND = -3;

module.exports = function(part, data) {
    const lines = data.split('\n');
    const p0 = new Program(0, lines);
    if (part == 1) {
        p0.onSend = p0.resume;
        p0.onRecv = function(val) {
            console.log('lastPlayed=' + val);
        };
        p0.run();
    } else {
        const p1 = new Program(1, lines);
        // prepare
        let send = 0;
        p0.onCantRecv = p1.onCantRecv = function() {
            const other = this.id == 0 ? p1 : p0;
            if (other.isBlocked) {
                console.log('send=' + send);
            } else {
                this.isBlocked = false;
                other.resume();
            }
        };
        p0.onSend = p1.onSend = function() {
            if (this.id == 1) send++;

            playedProgram = this.id;
            this.resume();
        };
        p0.onRecv = p1.onRecv = function() {
            lastPlayed = undefined;
            this.resume();
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
        lastPlayed = getVal(regs, matches[2]);
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
        if (getVal(regs, matches[2]) > 0) {
            if (_.isUndefined(lastPlayed) || playedProgram === curProgram) return CAN_NOT_RECV;

            regs[matches[2]] = lastPlayed;
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

    while (!this.isBlocked && this.ip < this.instrs.length) {
        const ip = exec(this.regs, this.ip, this.instrs[this.ip]);
        switch (ip) {
        case CAN_NOT_RECV:
            this.isBlocked = true;
            this.onCantRecv && this.onCantRecv();
            break;
        case AFTER_RECV:
            this.ip = this.ip + 1;
            this.isBlocked = true;
            this.onRecv && this.onRecv(lastPlayed);
            break;
        case AFTER_SEND:
            this.ip = this.ip + 1;
            this.isBlocked = true;
            this.onSend && this.onSend();
            break;
        default:
            this.ip = ip;
            break;
        }
    }
};
Program.prototype.resume = function() {
    this.isBlocked = false;
    this.run();
};
