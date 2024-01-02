const MemoryManager = require('./MemoryManager');

const { move, CodeWithRegister } = require('../Utils');
const ASM = require('../ASM');


class RegisterManager {

    // A is for everything, H is for loading
    IDENTIFIERS = ['b', 'c', 'd', 'e', 'f', 'g'];

    state = {
        queue: ['b', 'c', 'd', 'e', 'f', 'g']
    }

    /** @type {MemoryManager} */ #MemoryManager;

    /**
     * @param {MemoryManager} MemoryManager 
     */
    constructor(MemoryManager) {

        this.#MemoryManager = MemoryManager;
    }


    /**
     * @param {string} identifier 
     * @param {number|undefined} offset 
     * 
     * @param {function(): string[]} onReturn 
     *  
     * @returns {Object<CodeWithRegister>}
     */
    requestRegister(identifier, offset) {

        for (let register of this.state.queue) {

            if (!this.state[register]) {

                this.state.queue.push(...this.state.queue.splice(this.state.queue.indexOf(register), 1));
                this.state[register] = { identifier, offset };

                return new CodeWithRegister([], register);
            }
        }

        for (let register of this.state.queue) {

            if (this.state[register].cache) {

                this.state.queue.push(...this.state.queue.splice(this.state.queue.indexOf(register), 1));
                const result = new CodeWithRegister([...this.state[register].onReturn(this.state[register].identifier, this.state[register].offset, register)], register);

                this.state[register] = { identifier, offset };

                return result;
            }
        }
        throw new Error('trying to request more registers than 8');
    }

    returnRegister(register, cache = false, onReturn = () => []) {

        if (!this.state[register])
            throw new Error("trying to free free register");


        if (!cache) {

            this.state.queue.unshift(...this.state.queue.splice(this.state.queue.indexOf(register), 1));
            delete this.state[register];
        }
        else {

            this.state[register].cache = true;
            this.state[register].onReturn = onReturn;

            this.state.queue.push(...this.state.queue.splice(this.state.queue.indexOf(register), 1));
        }
    }

    cache(identifier, offset) {

        for (let register of this.IDENTIFIERS) {

            if (this.state[register] && this.state[register].cache) {

                if (this.state[register].identifier === identifier && this.state[register].offset === offset) {

                    RegisterManager.CACHE_HIT++;

                    this.state.queue.push(...this.state.queue.splice(this.state.queue.indexOf(register), 1));
                    return register;
                }
            }
        }

        RegisterManager.CACHE_MISS++;

        return null;
    }

    storeState() {

        const copyFrom = this.state;
        const copyTo = {}

        for (let key of this.IDENTIFIERS) {

            if (copyFrom[key] && copyFrom[key].cache)
                copyTo[key] = { identifier: copyFrom[key].identifier, offset: copyFrom[key].offset, cache: copyFrom[key].cache, onReturn: copyFrom[key].onReturn };
        }

        copyTo.queue = [...copyFrom.queue];

        return copyTo;
    }

    restoreState(context, copyFrom) {

        const code = [];

        console.log("copyFrom", this.state);

        for (let key of this.IDENTIFIERS) {

            if (!copyFrom[key])
                continue;

            if (this.state[key] && (copyFrom[key].identifier !== this.state[key].identifier || copyFrom[key].offset !== this.state[key].offset))
                code.push(...this.state[key].onReturn(this.state[key].identifier, this.state[key].offset, key));

            const registerOf = (identifier, offset) => {

                for (let register of this.IDENTIFIERS) {

                    if (this.state[register] && this.state[register].cache) {

                        if (this.state[register].identifier === identifier && this.state[register].offset === offset)
                            return register;
                    }
                }
            }

            const register = registerOf(copyFrom[key].identifier, copyFrom[key].offset);

            console.log("RESTORING", copyFrom[key], this.state[key], key, register);

            if (register)
                code.push(...move(register, key));
            else {

                if (context.local.VariablesManager.isRef(copyFrom[key].identifier)) {
                    code.push(...[
                        ...this.#MemoryManager.fetch(copyFrom[key].identifier, undefined, 'a'),
                        ASM.LOAD('a'),
                        ...move('a', key),
                    ]);
                }
                else
                    code.push(...this.#MemoryManager.fetch(copyFrom[key].identifier, copyFrom[key].offset, key));
            }
        }

        this.state = {}

        for (let key of this.IDENTIFIERS) {

            if (copyFrom[key])
                this.state[key] = { identifier: copyFrom[key].identifier, offset: copyFrom[key].offset, cache: copyFrom[key].cache, onReturn: copyFrom[key].onReturn };
        }

        this.state.queue = [...copyFrom.queue];
        return code;
    }

    clear() {

        const code = [];

        for (let register of this.IDENTIFIERS) {

            if (this.state[register] && this.state[register].onReturn)
                code.push(...this.state[register].onReturn(this.state[register].identifier, this.state[register].offset, register));
        }

        this.state = { queue: [...this.IDENTIFIERS] };
        return code;
    }

    static CACHE_HIT = 0;
    static CACHE_MISS = 0;
}

module.exports = RegisterManager;