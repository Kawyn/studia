
var to_num = (e) => {
    console.log('eeeee' + e)
}
const parser = require('./compiler');

const fs = require('fs');
const JumpManager = require('./managers/JumpManager');
const RegisterManager = require('./managers/RegisterManager');
const data = fs.readFileSync(process.argv[2] ?? './example3.imp', { encoding: 'utf-8' })

const ast = parser.parse(data);
var program = ast.compile();

const crypto = require('crypto');
/**
 * 
 * @param {string[]} code 
 */
const postOptimize = (code) => {

    let register = {
        a: crypto.randomUUID(),
        b: crypto.randomUUID(),
        c: crypto.randomUUID(),
        d: crypto.randomUUID(),
        e: crypto.randomUUID(),
        f: crypto.randomUUID(),
        g: crypto.randomUUID(),
    }

    let previousRegister = Object.assign({}, register);

    const compare = (a, b) => {
        for (let key of Object.keys(a)) {

            if (a[key] != b[key])
                return false;
        }

        return true;
    }

    for (let i = 0; i < code.length; i++) {

        if (code[i].startsWith("PUT")) {
            let r = code[i].split(' ')[1];
            register[r] = register.a;
        }

        else if (code[i].startsWith("GET")) {
            let r = code[i].split(' ')[1];
            register.a = register[r];
        }

        else if (code[i].startsWith('LOAD') || code[i].startsWith("READ") || code[i].startsWith("ADD") || code[i].startsWith("SUB")) {
            register.a = crypto.randomUUID();

        }

        else if (code[i].startsWith('SHL') || code[i].startsWith("SHR")) { //rst
            let r = code[i].split(' ')[1];
            register[r] = crypto.randomUUID();

        }

        else if (code[i].startsWith(JumpManager.PREFIX)) {
            register = {
                a: crypto.randomUUID(),
                b: crypto.randomUUID(),
                c: crypto.randomUUID(),
                d: crypto.randomUUID(),
                e: crypto.randomUUID(),
                f: crypto.randomUUID(),
                g: crypto.randomUUID(),
            }
        }

        else
            continue;


        if (compare(register, previousRegister)) {
            code.splice(i, 1);
            i--;
        }
        previousRegister = Object.assign({}, register);
    }
}
console.log('CACHE HIT:', RegisterManager.CACHE_HIT);
console.log('CACHE MISS:', RegisterManager.CACHE_MISS);

//postOptimize(program);
JumpManager.setPoints(program);

fs.writeFileSync('test.imp', program.join('\n'));