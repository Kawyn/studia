const { CompileContext } = require('../ast');

const { number, CodeWithRegister } = require('../Utils');


class CONST {

    type = 'CONST';

    /**
     * @param {number} value 
     * @param {number} lineno 
     */
    constructor(value, lineno) {

        this.value = parseInt(value);
        this.lineno = lineno;
    }

    /**
     * @param {CompileContext} context 
     */
    evaluate(context, isSafe = false) {

        const { code, register } = context.global.RegisterManager.requestRegister(this.value, undefined);
        return new CodeWithRegister([...code, ...number(this.value, register)], register);
    }

}

/**
 * Jeśli nie jest ustawiana wartość z read to też jest const - optymalizacja do zrobienia;
 */
class VAR {

    type = 'VAR';

    /**
     * @param {string} identifier 
     * @param {undefined|number|string} offset 
     * 
     * @param {number} lineno 
     */
    constructor(identifier, offset, lineno) {

        this.identifier = identifier;
        this.offset = isNaN(parseInt(offset)) ? offset : parseInt(offset);

        this.lineno = lineno;
    }

    /**
     * @param {*} context 
     * @returns 
     */
    evaluate(context) {

        return context.local.VariablesManager.fetch(this.identifier, this.offset);
    }

    /**
     * @param {*} context 
     * @param {*} register 
     * 
     * @returns {string[]}
     */
    store(context, register) {

        return context.local.VariablesManager.store(this.identifier, this.offset, register);
    }
}

module.exports = { CONST, VAR };