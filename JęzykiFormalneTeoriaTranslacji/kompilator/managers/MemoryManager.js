const ASM = require('../ASM');

const RegisterManager = require('./RegisterManager');

const { number, move } = require('../Utils');


class MemoryRange {

    /**
     * @param {string} identifier 
     * 
     * @param {number} startIdx 
     * @param {number} stopIdx 
     */
    constructor(identifier, startIdx, stopIdx) {

        this.identifier = identifier;

        this.startIdx = +startIdx;
        this.stopIdx = +stopIdx;

        Object.freeze(this);
    }
}

class MemoryManager {

    /** @type {{[identifier:string]: MemoryRange}} */ #memory = {};

    /** @type {RegisterManager} */ #RegisterManager;

    /**
     * 
     * @param {RegisterManager} RegisterManager 
     */
    initialize(RegisterManager) {
        this.#RegisterManager = RegisterManager;
    }

    /**
     * @param {string} identifier 
     * @param {number} size 
     */
    alloc(identifier, size) {

        if (this.#memory[identifier])
            return;

        const ranges = [];

        for (let m of Object.values(this.#memory))
            ranges.push({ startIdx: m.startIdx, stopIdx: m.stopIdx });

        ranges.sort((a, b) => a.startIdx - b.startIdx);

        let startIdx = 0;
        let stopIdx = 0;

        if (ranges.length === 0)
            stopIdx = startIdx + size - 1;
        else {

            for (let i = 0; i < ranges.length; i++) {

                if (startIdx + size - 1 < ranges[i].startIdx) {

                    stopIdx = startIdx + size - 1;
                    break;
                }

                startIdx = ranges[i].stopIdx + 1;
            }

            if (stopIdx < startIdx)
                stopIdx = startIdx + size - 1;
        }

        this.#memory[identifier] = new MemoryRange(identifier, +startIdx, +stopIdx);
    }

    /**
     * @param {string} identifier 
     * @param {number|undefined} offset 
     * 
     * @param {'a'|'b'|'c'|'d'|'e'|'f'|'g'} target 
     * 
     * @returns {string[]} code
     */
    store(identifier, offset, target) {

        return [
            ...number(this.#memory[identifier].startIdx + (offset || 0), 'h'),
            ...move(target, 'a'),
            ASM.STORE('h'),
        ];

    }

    /**
     * @param {string} identifier 
     * 
     * @returns {number}
     */
    startIdx(identifier) {

        return this.#memory[identifier].startIdx;
    }

    /**
     * @param {string} identifier 
     * 
     * @returns {number}
     */
    stopIdx(identifier) {

        return this.#memory[identifier].stopIdx;
    }

    /**
     * @param {string} identifier 
     * @param {number|undefined} offset 
     * 
     * @param {'a'|'b'|'c'|'d'|'e'|'f'|'g'} register 
     * 
     * @returns {string[]} code
     */
    fetch(identifier, offset, target) {

        return [
            ...number(this.#memory[identifier].startIdx + (offset || 0), 'a'),
            ASM.LOAD('a'),
            ...move('a', target)
        ];
    }
}

module.exports = MemoryManager;