const ASM = require('../ASM');

const JumpManager = require('../managers/JumpManager');

const { VAR, CONST } = require('./variables');


class CONDITION {

    type = 'CONDITION_ABSTRACT';

    /**
     * @param {VAR|CONST} a 
     * @param {VAR|CONST} b 
     * 
     * @param {number} lineno 
     */
    constructor(x, y, lineno) {

        this.x = x;
        this.y = y;

        this.lineno = lineno;
    }

    /**
     * Skacze jeżeli prawda
     * @param {*} context 
     * @param {*} jumpTo 
     */
    compile(context, jumpTo) { }


    /**
     * Skacze jeżeli fałsz
     * @param {*} context 
     * @param {*} jumpTo 
     */
    ncompile(context, jumpTo) { }

    /**
     * 
     * @param {CONDITION} self 
     * @param {CompileContext} context 
     * @param {string} jumpTo 
     */
    static compileStatic(self, context, jumpTo) { }
}

class EQ extends CONDITION {

    type = "EQ"; // a = b -> a - b == 0 && b - a == 0

    compile(context, jumpTo) { return EQ.compileStatic(this, context, jumpTo); }
    ncompile(context, jumpTo) { return NEQ.compileStatic(this, context, jumpTo); }

    static compileStatic(self, context, jumpTo) {

        if (self.x.type === 'CONST' && self.y.type === 'CONST')
            return self.x.value == self.y.value ? [ASM.JUMP(pointIdx)] : [];

        const skipPoint = JumpManager.createPointIdentifier();

        const a = self.x.evaluate(context);
        const b = self.y.evaluate(context);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return [
            ...a.code,
            ...b.code,

            ASM.GET(a.register),
            ASM.SUB(b.register),
            ASM.JPOS(skipPoint),

            ASM.GET(b.register),
            ASM.SUB(a.register),
            ASM.JZERO(jumpTo),
            skipPoint
        ];
    }
}

class NEQ extends CONDITION {

    type = "NEQ"; // a = b -> a - b > 0 || b - a > 0

    compile(context, jumpTo) { return NEQ.compileStatic(this, context, jumpTo); }
    ncompile(context, jumpTo) { return EQ.compileStatic(this, context, jumpTo); }

    static compileStatic(self, context, jumpTo) {

        if (self.x.type === 'CONST' && self.y.type === 'CONST')
            return self.x.value == self.y.value ? [ASM.JUMP(pointIdx)] : [];

        const a = self.x.evaluate(context);
        const b = self.y.evaluate(context);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return [
            ...a.code,
            ...b.code,

            ASM.GET(a.register),
            ASM.SUB(b.register),
            ASM.JPOS(jumpTo),

            ASM.GET(b.register),
            ASM.SUB(a.register),
            ASM.JPOS(jumpTo),
        ];
    }
}

class LE extends CONDITION {

    type = "LE"; // a < b -> 0 < b - a

    compile(context, jumpTo) { return LE.compileStatic(this, context, jumpTo); }
    ncompile(context, jumpTo) { return GEQ.compileStatic(this, context, jumpTo); }

    static compileStatic(self, context, jumpTo) {

        if (self.x.type === 'CONST' && self.y.type === 'CONST')
            return self.x.value < self.y.value ? [ASM.JUMP(pointIdx)] : [];

        const a = self.x.evaluate(context);
        const b = self.y.evaluate(context);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return [
            ...a.code,
            ...b.code,

            ASM.GET(b.register),
            ASM.SUB(a.register),
            ASM.JPOS(jumpTo)
        ];
    }
}

class LEQ extends CONDITION {

    type = "LEQ"; // a <= b -> 0 <= b - a -> b - a >= 0 -> b + 1 - a > 0

    compile(context, jumpTo) { return LEQ.compileStatic(this, context, jumpTo); }
    ncompile(context, jumpTo) { return GE.compileStatic(this, context, jumpTo); }

    static compileStatic(self, context, jumpTo) {

        if (self.x.type === 'CONST' && self.y.type === 'CONST')
            return self.x.value <= self.y.value ? [ASM.JUMP(pointIdx)] : [];

        const a = self.x.evaluate(context);
        const b = self.y.evaluate(context);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return [
            ...a.code,
            ...b.code,

            ASM.INC(b.register),

            ASM.GET(b.register),
            ASM.SUB(a.register),
            ASM.JPOS(jumpTo)
        ];
    }
}

class GEQ extends CONDITION {

    type = "GEQ"; // a >= b -> a - b >= 0 -> (a + 1) - b > 0

    compile(context, jumpTo) { return GEQ.compileStatic(this, context, jumpTo); }
    ncompile(context, jumpTo) { return LE.compileStatic(this, context, jumpTo); }

    static compileStatic(self, context, jumpTo) {

        if (self.x.type === 'CONST' && self.y.type === 'CONST')
            return self.x.value >= self.y.value ? [ASM.JUMP(pointIdx)] : [];

        const a = self.x.evaluate(context);
        const b = self.y.evaluate(context);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return [
            ...a.code,
            ...b.code,

            ASM.INC(a.register),
            ASM.GET(a.register),

            ASM.SUB(b.register),
            ASM.JPOS(jumpTo)
        ];
    }
}

class GE extends CONDITION {

    type = "GE"; // a > b ->  a - b > 0

    compile(context, jumpTo) { return GE.compileStatic(this, context, jumpTo); }
    ncompile(context, jumpTo) { return LEQ.compileStatic(this, context, jumpTo); }

    static compileStatic(self, context, jumpTo) {

        if (self.x.type === 'CONST' && self.y.type === 'CONST')
            return self.x.value > self.y.value ? [ASM.JUMP(pointIdx)] : [];

        const a = self.x.evaluate(context);
        const b = self.y.evaluate(context);

        context.global.RegisterManager.returnRegister(a.register);
        context.global.RegisterManager.returnRegister(b.register);

        return [
            ...a.code,
            ...b.code,

            ASM.GET(a.register),
            ASM.SUB(b.register),
            ASM.JPOS(jumpTo)
        ];
    }
}

module.exports = { EQ, NEQ, LE, LEQ, GEQ, GE };