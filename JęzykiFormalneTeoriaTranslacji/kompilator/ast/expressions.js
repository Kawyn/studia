const ASM = require('../ASM');

const JumpManager = require('../managers/JumpManager');

const { CONST, VAR } = require('./variables');

const { move, number } = require('../Utils');


class EXPRESSION {

    type = 'EXPRESSION';

    /**
     * @param {CONST|VAR} x 
     * @param {CONST|VAR} y
     * 
     * @param {number} lineno 
     */
    constructor(x, y, lineno) {

        this.x = x;
        this.y = y;

        this.lineno = lineno;
    }

    /**
     * @param {CompileContext} context 
     */
    evaluate(context) { }
}

class PLUS extends EXPRESSION {

    type = 'PLUS';

    evaluate(context) {

        const result = context.global.RegisterManager.requestRegister(this.type, undefined);

        if (this.x.type === 'CONST' && this.y.type === 'CONST') {

            result.code.push(...number(this.x.value + this.y.value, result.register));
            return result;
        }

        const a = this.x.evaluate(context);
        const b = this.y.evaluate(context);

        result.code.push(...[
            ...a.code,
            ...b.code,
            ...move(a.register, 'a'),

            ASM.ADD(b.register),

            ...move('a', result.register)
        ]);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return result;
    }
}

class MINUS extends EXPRESSION {

    type = 'MINUS';

    evaluate(context) {

        const result = context.global.RegisterManager.requestRegister(this.type, undefined);

        if (this.x.type === 'CONST' && this.y.type === 'CONST') {

            result.code.push(...number(this.x.value - this.y.value, result.register));
            return result;
        }

        const a = this.x.evaluate(context);
        const b = this.y.evaluate(context);

        result.code.push(...[
            ...a.code,
            ...b.code,
            ...move(a.register, 'a'),

            ASM.SUB(b.register),

            ...move('a', result.register)
        ]);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return result;
    }
}

class TIMES extends EXPRESSION {

    type = 'TIMES';

    evaluate(context) {

        const result = context.global.RegisterManager.requestRegister(this.type, undefined);

        if (this.x.type === 'CONST' && this.y.type === 'CONST') {

            result.code.push(...number(this.x.value * this.y.value, result.register));
            return result;
        }

        else if (this.x.type === 'CONST') {

            const b = this.y.evaluate(context);

            result.code.push(...[
                ...b.code,

                ...this.TIMES_CONST(b.register, this.x.value),
                ...move('a', result.register)
            ]);

            context.global.RegisterManager.returnRegister(b.register);

            return result;
        }

        else if (this.y.type === 'CONST') {

            const a = this.x.evaluate(context);

            result.code.push(...[
                ...a.code,

                ...this.TIMES_CONST(a.register, this.y.value),
                ...move('a', result.register)
            ]);

            context.global.RegisterManager.returnRegister(a.register);

            return result;
        }

        const a = this.x.evaluate(context);
        const b = this.y.evaluate(context);


        console.log(a, b);

        const beforeWhilePoint = JumpManager.createPointIdentifier();
        const afterWhilePoint = JumpManager.createPointIdentifier();

        const ifPoint = JumpManager.createPointIdentifier();

        result.code.push(...[

            ...a.code,
            ...b.code,

            ASM.RST('a'),

            beforeWhilePoint,
            ASM.PUT('h'),

            ASM.GET(b.register),
            ASM.JZERO(afterWhilePoint),

            ASM.SHR(b.register),
            ASM.SHL(b.register),
            ASM.SUB(b.register),

            ASM.JZERO(ifPoint),
            ASM.GET('h'),
            ASM.ADD(a.register),
            ASM.PUT('h'),
            ifPoint,

            ASM.GET('h'),
            ASM.SHL(a.register),
            ASM.SHR(b.register),

            ASM.JUMP(beforeWhilePoint),
            afterWhilePoint,

            ...move('h', result.register)
        ]);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return result;
    }

    TIMES_CONST(register, value) {

        const code = [];

        code.push(ASM.RST('a'));

        let skip = true;

        while (value > 0) {

            if (value % 2 == 1)
                code.push(ASM.ADD(register));

            if (!skip)
                code.push(ASM.SHL('a'));

            skip = false;
            value = Math.floor(value / 2);
        }


        return code;
    }
}

class DIV extends EXPRESSION {

    type = 'DIV';

    evaluate(context, register) {

        const result = context.global.RegisterManager.requestRegister(this.type, undefined);

        if (this.x.type === 'CONST' && this.y.type === 'CONST') {

            result.code.push(...number(this.x.value / this.y.value, result.register));
            return result;
        }

        const a = this.x.evaluate(context);
        const b = this.y.evaluate(context);

        const divisor = context.global.RegisterManager.requestRegister('DIV_DIVISOR', undefined)
        const power = context.global.RegisterManager.requestRegister('DIV_POWER', undefined)
        const beforeOuterWhilePoint = JumpManager.createPointIdentifier();
        const afterOuterWhilePoint = JumpManager.createPointIdentifier();

        const beforeInnerWhilePoint = JumpManager.createPointIdentifier();
        const afterInnerWhilePoint = JumpManager.createPointIdentifier();

        console.log(result, a, b, divisor, power);
        result.code.push(...[
            ...a.code,
            ...b.code,
            ...divisor.code,
            ...power.code,

            ASM.RST('h'),

            beforeOuterWhilePoint,

            ASM.GET(a.register),
            ASM.INC('a'),
            ASM.SUB(b.register),
            ASM.JZERO(afterOuterWhilePoint),

            ASM.GET(b.register),  // na F jest divisor
            ASM.PUT(divisor.register),
            ASM.RST(power.register),   // na B jest power
            ASM.INC(power.register),

            beforeInnerWhilePoint,
            ASM.GET(a.register),

            ASM.INC('a'),
            ASM.SHL(divisor.register),
            ASM.SUB(divisor.register),
            ASM.JZERO(afterInnerWhilePoint),
            ASM.SHL(power.register),
            ASM.JUMP(beforeInnerWhilePoint),
            afterInnerWhilePoint,
            ASM.SHR(divisor.register),

            ASM.GET(a.register),
            ASM.SUB(divisor.register),
            ASM.PUT(a.register),

            ASM.GET('h'),
            ASM.ADD(power.register),
            ASM.PUT('h'),

            ASM.JUMP(beforeOuterWhilePoint),
            afterOuterWhilePoint,

            ...move('h', result.register)
        ]);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        context.global.RegisterManager.returnRegister(divisor.register);
        context.global.RegisterManager.returnRegister(power.register);

        return result;
    }
}

class MOD extends EXPRESSION {

    evaluate(context, register = 'a') {

        const result = context.global.RegisterManager.requestRegister(this.type, undefined);

        if (this.x.type === 'CONST' && this.y.type === 'CONST') {

            result.code.push(...number(this.x.value % this.y.value, result.register));
            return result;
        }

        const a = this.x.evaluate(context);
        const b = this.y.evaluate(context);

        const divisor = context.global.RegisterManager.requestRegister('DIVISOR', undefined)
        const power = context.global.RegisterManager.requestRegister('POWER', undefined)

        const beforeOuterWhilePoint = JumpManager.createPointIdentifier();
        const afterOuterWhilePoint = JumpManager.createPointIdentifier();

        const beforeInnerWhilePoint = JumpManager.createPointIdentifier();
        const afterInnerWhilePoint = JumpManager.createPointIdentifier();

        // da się to zoptymalizować???
        result.code.push(...[
            ...a.code,
            ...b.code,
            ...divisor.code,
            ...power.code,

            beforeOuterWhilePoint,

            // a >= b?
            ASM.GET(a.register),
            ASM.INC('a'),
            ASM.SUB(b.register),

            ASM.JZERO(afterOuterWhilePoint),

            ASM.GET(b.register),
            ASM.PUT(divisor.register),
            ASM.RST(power.register),
            ASM.INC(power.register),

            beforeInnerWhilePoint,
            ASM.GET(a.register),

            ASM.INC('a'),
            ASM.SHL(divisor.register),
            ASM.SUB(divisor.register),

            ASM.JZERO(afterInnerWhilePoint),
            ASM.SHL(power.register),
            ASM.JUMP(beforeInnerWhilePoint),
            afterInnerWhilePoint,
            ASM.SHR(divisor.register),

            ASM.GET(a.register),
            ASM.SUB(divisor.register),
            ASM.PUT(a.register),

            ASM.JUMP(beforeOuterWhilePoint),
            afterOuterWhilePoint,

            ...move(a.register, result.register)
        ]);
        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        context.global.RegisterManager.returnRegister(divisor.register);
        context.global.RegisterManager.returnRegister(power.register);

        return result;
    }
}

module.exports = { EXPRESSION, PLUS, MINUS, TIMES, DIV, MOD };