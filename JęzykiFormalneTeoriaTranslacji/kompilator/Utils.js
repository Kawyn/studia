const ASM = require("./ASM");

/**
 * 
 * @param {number} number 
 * @param {a|b|c|d|e|f|g|h} register 
 * @returns 
 */
const number = (number, register) => {

    number = +number;
    const code = [ASM.RST(register)];

    let skip = true;

    for (let bit of number.toString(2)) {

        if (!skip)
            code.push(ASM.SHL(register));
        else
            skip = false;

        if (bit == 1)
            code.push(ASM.INC(register));
    }
    console.log(number, register, code);
    return code;
}

const multiplyByValue = (register, value) => {

    let wasA = false;
    if (register == 'a') {
        move('a', 'h');
        register = 'h';
        wasA = true;
        throw 'not impl';

    }
    const code = [ASM.RST('a')]

    let skip = true;

    while (value > 0) {

        if (value % 2 == 1)
            code.push(ASM.ADD(register));

        if (!skip)
            code.push(ASM.SHL('a'));
        skip = false;
        value = Math.floor(value / 2);
    }
    if (wasA)
        move('h', 'a');
    return code;
}

const div = (rA, rB) => {


}
const divideByValue = (register, value) => {


    if (value !== 0 && ((value & (value - 1)) == 0)) {
        const code = [...move(register, 'a')];

        while (value !== 1) {
            code.push(ASM.SHR('a'));
            value /= 2;
        }

        return code;
    }
    let wasA = false;
    if (register == 'a') {
        move('a', 'h');
        register = 'h';
        wasA = true;

    }
    const code = [ASM.RST('a')]

    let skip = true;

    while (value > 0) {

        if (value % 2 == 1)
            code.push(ASM.ADD(register));

        if (!skip)
            code.push(ASM.SHL('a'));
        skip = false;
        value = Math.floor(value / 2);
    }
    if (wasA)
        move('h', 'a');
    return code;
}

const move = (source, target, protectRegisterA = false) => {

    if (source === target)
        return [];
    // todo target == source???
    const code = [];

    if (source !== 'a') {

        if (protectRegisterA)
            code.push(ASM.PUT('h'));

        code.push(ASM.GET(source));
    }

    if (target !== 'a')
        code.push(ASM.PUT(target));

    if (source !== 'a') {

        if (protectRegisterA)
            code.push(ASM.PUT('h'));
    }

    return code;
}

class CodeWithRegister {
    constructor(code, register) {
        this.code = code;
        this.register = register;
    }
}
module.exports =
{
    multiplyByValue,
    numberToRegister: number,
    divideByValue,
    move,
    number,
    CodeWithRegister
}