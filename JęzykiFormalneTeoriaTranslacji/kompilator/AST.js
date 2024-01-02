const ASM = require('./ASM');
const { number: numberToRegister, multiplyByValue, divideByValue, move } = require('./Utils');
const MemoryManager = require('./managers/MemoryManager');
const crypto = require('crypto');
const VariablesManager = require('./managers/VariablesManager');
const RegisterManager = require('./managers/RegisterManager');
const JumpManager = require('./managers/JumpManager');
const { LE, GE, GEQ, EQ, NEQ, LEQ } = require('./ast/conditions');
const { CONST, VAR } = require('./ast/variables');
const { EXPRESSION: Expression, PLUS, MINUS, TIMES, DIV, MOD } = require('./ast/expressions');

class CompileContext {

    /** @type {ROOT} */ global;
    /** @type {MAIN|PROCEDURE} */ local;

    /**
     * @param {ROOT} global 
     * @param {MAIN|PROCEDURE} local 
     */
    constructor(global, local) {

        this.global = global;
        this.local = local;
    }
}

class ROOT {

    /** @type {MemoryManager} */    MemoryManager = new MemoryManager();
    /** @type {RegisterManager} */  RegisterManager;

    /**
     * @param {PROCEDURE[]} procedures 
     * @param {MAIN} main 
     */
    constructor(procedures, main) {

        this.RegisterManager = new RegisterManager(this.MemoryManager);
        this.MemoryManager.initialize(this.RegisterManager);
        this.procedures = procedures;
        this.main = main;
    }


    precompile(context) {

        this.main.precompile(new CompileContext(this, this.main));

        for (let procedure of this.procedures)
            procedure.precompile(new CompileContext(this, procedure));

    }
    compile(context) {

        this.precompile(context);

        const code = [];

        for (let procedure of this.procedures)
            code.push(...procedure.compile(new CompileContext(this, procedure)));

        if (code.length !== 0) {

            code.unshift(ASM.JUMP(this.main.JUMP_POINT_IDENTIFIER));
            code.push(this.main.JUMP_POINT_IDENTIFIER);
        }

        code.push(... this.main.compile(new CompileContext(this, this.main)));
        code.push(ASM.HALT());

        return code;
    }

}

class MAIN {

    JUMP_POINT_IDENTIFIER = JumpManager.createPointIdentifier();

    /** @type {VariablesManager} */    VariablesManager;

    /**
     * @param {*} commands 
     * @param {MAIN_DECLERATION[]} declarations 
     */
    constructor(commands, declarations) {

        this.commands = commands;
        this.declarations = declarations;
    }

    precompile(context) {

        this.VariablesManager = new VariablesManager(context.global.MemoryManager, context.global.RegisterManager);

        for (let declaration of this.declarations)
            this.VariablesManager.var(declaration.identifier, declaration.type, declaration.size);
    }

    compile(context) {

        context.local = this;

        const code = [];

        for (let command of this.commands)
            code.push(...command.compile(context));

        return code;
    }
}

class PROCEDURE {

    JUMP_POINT_IDENTIFIER = JumpManager.createPointIdentifier();

    /** @type {VariablesManager} */    VariablesManager;

    constructor(header, commands, declerations) {

        this.header = header;
        this.identifier = header.identifier;
        this.args = header.args;

        this.commands = commands;
        this.declerations = declerations;
    }

    precompile(context) {

        this.VariablesManager = new VariablesManager(context.global.MemoryManager, context.global.RegisterManager);

        for (let argument of this.args) {

            if (typeof argument === 'string')
                this.VariablesManager.ref(argument, '-');
            else
                this.VariablesManager.ref(argument[1], '-');

        }
        this.VariablesManager.var('CAME_FROM', 'NUMBER', 1);

        if (this.declerations) {

            for (let declaration of this.declerations)
                this.VariablesManager.var(declaration.identifier, declaration.type, declaration.size);
        }
    }

    compile(context) {

        const code = [
            this.JUMP_POINT_IDENTIFIER,
            ASM.INC('a'),                                               // strk -> jump
            ASM.INC('a'),                                               // jump -> next
            ...context.global.MemoryManager.store(context.local.VariablesManager.UUID + 'CAME_FROM', undefined, 'a')
        ];


        for (let c of this.commands)
            code.push(...c.compile(context));
        code.push(...context.global.RegisterManager.clear());         // register goes to state before commands

        const cameFromCode = context.global.MemoryManager.fetch(context.local.VariablesManager.UUID + 'CAME_FROM', undefined, 'a'); // won't change other registers??


        code.push(...cameFromCode)
        code.push(ASM.JUMPR('a'));
        return code;
    }
}

class PROCEDURE_HEADER {

    constructor(identifier, args) {
        this.identifier = identifier;
        this.args = args;
    }
}


class MAIN_DECLERATION {

    type = 'MAIN_DECLERATION';

    constructor(identifier, size) {

        this.identifier = identifier;
        this.size = size ?? 1;
    }
}

class ARGUMENT {
}
class ARGUMENT_ARRAY {
}






class SET {

    type = 'SET';

    /**
     * @param {VARIABLE} target 
     * @param {Expression} value 
     */
    constructor(target, value) {

        this.target = target;
        this.value = value;
    }

    /**
     * @param {CompileContext} context 
     */
    compile(context) {

        const { code, register } = this.value.evaluate(context);
        const test = this.target.store(context, register);
        code.push(...test);
        context.global.RegisterManager.returnRegister(register);
        return code;
    }
}
class IF {

    type = 'IF';

    constructor(condition, commands) {

        this.condition = condition;
        this.commands = commands;
    }

    compile(context) {

        const pointIdx_AFTER_IF = JumpManager.createPointIdentifier();

        const code = [];

        const stateZBeforeIfs = context.global.RegisterManager.storeState();

        code.push(...this.condition.ncompile(context, pointIdx_AFTER_IF)); // condition doesn't change cashe!
        const restoreCode = context.global.RegisterManager.restoreState(context, stateZBeforeIfs);
        code.push(...restoreCode)

        const stateBeforeCommands = context.global.RegisterManager.storeState();

        for (let c of this.commands)
            code.push(...c.compile(context));
        code.push(...context.global.RegisterManager.restoreState(context, stateBeforeCommands));         // register goes to state before commands

        code.push(pointIdx_AFTER_IF);
        code.push(...restoreCode)


        return code;
    }
}
class IF_ELSE {

    type = 'IF_ELSE';

    constructor(condition, ifCommands, elseCommands) {

        this.condition = condition;

        this.ifs = ifCommands;
        this.elses = elseCommands;
    }

    compile(context) {

        const pointIdx_AFTER_IF = JumpManager.createPointIdentifier();
        const pointIdx_AFTER_ELSE = JumpManager.createPointIdentifier();

        const code = [];

        const stateBeforeCommands = context.global.RegisterManager.storeState();

        code.push(...this.condition.compile(context, pointIdx_AFTER_ELSE)); // condition doesn't change cashe!
        ;         // register goes to state before commands

        for (let c of this.elses)
            code.push(...c.compile(context));

        code.push(...context.global.RegisterManager.restoreState(context, stateBeforeCommands));         // register goes to state before commands

        code.push(ASM.JUMP(pointIdx_AFTER_IF));
        code.push(pointIdx_AFTER_ELSE);

        for (let c of this.ifs)
            code.push(...c.compile(context));

        code.push(...context.global.RegisterManager.restoreState(context, stateBeforeCommands));         // register goes to state before commands

        code.push(pointIdx_AFTER_IF);

        return code;
    }
}


class WHILE { // DONE!

    type = "WHILE";

    constructor(condition, commands) {

        this.condition = condition;
        this.commands = commands;
    }

    /** @param {CompileContext} context */
    compile(context) {

        const startPoint = JumpManager.createPointIdentifier();
        const stopPoint = JumpManager.createPointIdentifier();

        const code = [];
        code.push(startPoint);
        const stateZBeforeIfs = context.global.RegisterManager.storeState();
        code.push(...this.condition.ncompile(context, stopPoint));
        // conditions can't change cache (mam nadzieję)
        const restoreCode = context.global.RegisterManager.restoreState(context, stateZBeforeIfs);
        code.push(...restoreCode);         // register goes to state before commands


        const stateBeforeCommands = context.global.RegisterManager.storeState();

        for (let c of this.commands)
            code.push(...c.compile(context));
        code.push(...context.global.RegisterManager.restoreState(context, stateBeforeCommands));         // register goes to state before commands

        code.push(ASM.JUMP(startPoint));
        code.push(stopPoint);
        code.push(...restoreCode);         // register goes to state before commands


        return code;
    }
}

class UNTIL {

    type = "UNTIL";

    constructor(condition, commands) {

        this.condition = condition;
        this.commands = commands;
    }

    /** @param {CompileContext} context */
    compile(context) {

        const pointIdx = "_JUMP_POINT " + crypto.randomUUID();
        const code = [pointIdx];

        const stateBeforeCommands = context.global.RegisterManager.storeState();

        for (let c of this.commands)
            code.push(...c.compile(context));


        const condition = this.condition.ncompile(context, pointIdx);
        code.push(...condition);
        code.push(...context.global.RegisterManager.restoreState(context, stateBeforeCommands));         // register goes to state before commands


        return code;
    }
}

class CALL {

    constructor(identifier, args) {

        this.identifier = identifier;
        this.args = args;
    }

    /** @param {CompileContext} context */
    compile(context) {

        const procedure = context.global.procedures.find(x => x.identifier === this.identifier);

        const startState = context.global.RegisterManager.storeState();

        const code = [...context.global.RegisterManager.clear()];

        for (let i = 0; i < this.args.length; i++) {

            let aaaa = '';
            if (typeof procedure.args[i] === 'string')
                aaaa = procedure.args[i];
            else
                aaaa = procedure.args[i][1];

            const refIdentifier = procedure.VariablesManager.UUID + aaaa; // jeśli procedura wywołuje inną procedure musimy sprawdzić cz y 
            const trueIdentifier = context.local.VariablesManager.UUID + this.args[i];

            code.push(...procedure.VariablesManager.createRef(refIdentifier, trueIdentifier, context.local.VariablesManager.isRef(trueIdentifier)));
        }

        code.push(ASM.STRK('a'));
        code.push(ASM.JUMP(procedure.JUMP_POINT_IDENTIFIER))
        code.push(...context.global.RegisterManager.restoreState(context, startState));         // register goes to state before commands

        return code;
    }
}

class READ {

    type = 'READ';

    /**
     * 
     * @param {VARIABLE} target 
     * @param {*} lineno 
     */
    constructor(target, lineno) {

        this.target = target;
        this.lineno = lineno;
    }

    /** @param {CompileContext} context */
    compile(context) {

        const code = [ASM.READ()];
        code.push(...this.target.store(context, 'a'));
        return code;
    }
}

class WRITE {

    /**
     * 
     * @param {NUMBER|VARIABLE} target 
     */
    constructor(target) {

        this.target = target;
    }

    /** @param {CompileContext} context */
    compile(context) {

        const code = [];

        if (this.target instanceof CONST)
            code.push(...numberToRegister(this.target.value, 'a'));
        else {

            const varrr = this.target.evaluate(context)
            code.push(...varrr.code);
            code.push(...move(varrr.register, 'a'))
            context.global.RegisterManager.returnRegister(varrr.register);

        }

        code.push(ASM.WRITE());

        return code;
    }
}
module.exports = {
    ROOT, MAIN,
    VARIABLE: VAR, NUMBER: CONST, Array,
    Procedure: PROCEDURE,
    EQ, NEQ, GE, GEQ, LE, LEQ,
    Expression, PLUS, MINUS, TIMES, DIV, MOD,
    SET,
    IF, IF_ELSE,
    WHILE, UNTIL,
    READ, WRITE,
    Procedure_HEADER: PROCEDURE_HEADER,
    CALL,
    MAIN_DECLERATION,
    ARGUMENT,
    CompileContext,
    ARGUMENT_ARRAY,
}