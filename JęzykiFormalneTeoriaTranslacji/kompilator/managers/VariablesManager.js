const crypto = require('crypto');

const ASM = require('../ASM');

const MemoryManager = require('./MemoryManager');
const RegisterManager = require('./RegisterManager');

const { number, move, CodeWithRegister } = require('../Utils');

class VariablesManager {

    UUID = crypto.randomUUID() + '__';

    #vars = {};
    #refs = {};

    /** @type {MemoryManager} */    #MemoryManager;
    /** @type {RegisterManager} */  #RegisterManager;
    constructor(MemoryManager, RegisterManager) {

        this.#MemoryManager = MemoryManager;
        this.#RegisterManager = RegisterManager;
    }


    var(identifier, type, size) {

        identifier = this.UUID + identifier;
        this.#vars[identifier] = { identifier, type, size };

        this.#MemoryManager.alloc(identifier, size);
    }

    isVar(identifier) {

        return identifier in this.#vars;
    }


    ref(identifier, type) {

        identifier = this.UUID + identifier;
        this.#refs[identifier] = { identifier, type };

        this.#MemoryManager.alloc(identifier, 1);
    }

    isRef(identifier) {

        return identifier in this.#refs;
    }

    createRef(identifier, to, isTargetRef = false) {

        const result = [
            ...(isTargetRef ? this.#MemoryManager.fetch(to, undefined, 'a') : number(this.#MemoryManager.startIdx(to), 'a')),
            ...number(this.#MemoryManager.startIdx(identifier), 'h'),
            ASM.STORE('h'),
        ]

        return result;
    }

    fetch(identifier, offset) {

        identifier = this.UUID + identifier;

        if (this.isRef(identifier))
            return this.#fetchRef(identifier, offset);

        else if (this.isVar(identifier))
            return this.#fetchVar(identifier, offset);

        throw new Error('Próba przypisania do nieznanej zmiennej');
    }

    #fetchVar(identifier, offset) {

        const { code, register } = this.#RegisterManager.requestRegister(identifier, undefined);

        // don't even bother to cache arrays
        if (offset !== undefined) {

            if (isNaN(offset) && isNaN(parseFloat(offset))) {

                const subvar = this.fetch(offset, undefined);
                const result = [
                    ...code,
                    ...subvar.code,
                    ...number(this.#MemoryManager.startIdx(identifier), 'a'),
                    ASM.ADD(subvar.register),
                    ASM.LOAD('a'),
                    ...move('a', register)
                ];

                this.#RegisterManager.returnRegister(subvar.register);

                return new CodeWithRegister(result, register);
            }
            else if (offset != undefined) {

                return new CodeWithRegister([
                    ...number(this.#MemoryManager.startIdx(identifier) + offset, 'a'),
                    ASM.LOAD('a'),
                    ...move('a', register)
                ], register);
            }
        }

        const cache = this.#RegisterManager.cache(identifier, offset);

        if (cache)
            return new CodeWithRegister([...code, ...move(cache, register)], register);

        return new CodeWithRegister([
            ...code,
            ...this.#MemoryManager.fetch(identifier, undefined, register)
        ], register);
    }

    #fetchRef(identifier, offset, target) {

        const { code, register } = this.#RegisterManager.requestRegister(identifier, undefined);

        // don't even bother to cache arrays
        if (offset !== undefined) {

            if (isNaN(offset) && isNaN(parseFloat(offset))) {

                const subvar = this.fetch(offset, undefined);

                const result = [
                    ...code,
                    ...subvar.code,
                    ...this.#MemoryManager.fetch(identifier, undefined),
                    ASM.ADD(subvar.register),
                    ASM.LOAD('a'),
                    ...move('a', target)
                ];

                this.#RegisterManager.returnRegister(subvar.register);

                return new CodeWithRegister(result, register);
            }
            else if (offset != undefined) {

                return [
                    ...this.#MemoryManager.fetch(identifier, undefined, 'a'),
                    ...number(offset, 'h'),
                    ASM.ADD('h'),
                    ASM.LOAD('a'),
                    ...move('a', target)
                ];
            }
        }

        const cache = this.#RegisterManager.cache(identifier, offset);

        if (cache)
            return new CodeWithRegister([...code, ...move(cache, register)], register);


        return new CodeWithRegister([
            ...code,
            ...this.#MemoryManager.fetch(identifier, undefined, 'a'),
            ASM.LOAD('a'),
            ...move('a', register),

        ], register);
    }

    store(identifier, offset, register) {

        identifier = this.UUID + identifier;

        if (this.isRef(identifier))
            return this.#storeRef(identifier, offset, register);
        else if (this.isVar(identifier))
            return this.#storeVar(identifier, offset, register);
        else
            throw new Error('Próba przypisania do nieznanej zmiennej');
    }

    #storeVar(identifier, offset, register) {

        // don't even bother to cache arrays
        if (offset !== undefined) {

            if (isNaN(offset) && isNaN(parseFloat(offset))) {

                const subvar = this.fetch(offset, undefined);

                const result = [
                    ...subvar.code,
                    ...number(this.#MemoryManager.startIdx(identifier), 'a'),
                    ASM.ADD(subvar.register),
                    ASM.PUT(subvar.register),
                    ASM.GET(register),
                    ASM.STORE(subvar.register),
                ];

                this.#RegisterManager.returnRegister(subvar.register);

                return result;
            }

            else {

                return [
                    ...number(this.#MemoryManager.startIdx(identifier) + offset, 'h'),
                    ASM.GET(register),
                    ASM.STORE('h'),
                ]
            }
        }

        const cache = this.#RegisterManager.cache(identifier, offset);

        if (cache != null) {

            return move(register, cache);
        }

        const response = this.#RegisterManager.requestRegister(identifier, undefined);

        this.#RegisterManager.returnRegister(response.register, true, (identifier, offset, register) => {
            return this.#MemoryManager.store(identifier, offset, register);
        });

        return [
            ...response.code,
            ...move(register, response.register)
        ];
    }

    #storeRef(identifier, offset, register) {

        // don't even bother to cache arrays
        if (offset !== undefined) {

            if (isNaN(offset) && isNaN(parseFloat(offset))) {

                const subvar = this.fetch(offset, undefined);

                const result = [
                    ...subvar.code,
                    ...this.#MemoryManager.fetch(identifier, undefined, 'a'),
                    ASM.ADD(subvar.register),
                    ASM.PUT(subvar.register),
                    ASM.GET(register),
                    ASM.STORE(subvar.register),
                ];

                this.#RegisterManager.returnRegister(subvar.register);

                return result;
            }

            else {

                return [
                    ...this.#MemoryManager.fetch(identifier, undefined, 'a'),
                    ...number(offset, 'h'),
                    ASM.ADD('h'),
                    ASM.PUT('h'),
                    ASM.GET(register),
                    ASM.STORE('h'),
                ];
            }
        }

        const cache = this.#RegisterManager.cache(identifier, offset);

        if (cache != null)
            return move(register, cache);

        const response = this.#RegisterManager.requestRegister(identifier, undefined);

        this.#RegisterManager.returnRegister(response.register, true, (identifier, offset, register) => {

            return [
                ...this.#MemoryManager.fetch(identifier, offset, 'h'),
                ...move(register, 'a'),
                ASM.STORE('h')
            ]
        });

        return [
            ...response.code,
            ...move(register, response.register),
            ASM.GET(register),
        ];
    }
}

module.exports = VariablesManager;