const crypto = require('crypto');


class JumpManager {

    static PREFIX = '_JUMP_POINT';

    static createPointIdentifier() { return this.PREFIX + crypto.randomUUID(); }

    static setPoints(code) {

        const pointToIdx = {};

        for (let i = 0; i < code.length; i++) {

            if (code[i].startsWith(this.PREFIX)) {
                pointToIdx[code[i]] = i;

                code.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < code.length; i++) {

            const idx = code[i].indexOf(this.PREFIX);

            if (idx !== -1) {

                const identifier = code[i].substring(idx, code[i].length);
                code[i] = code[i].replace(identifier, pointToIdx[identifier]);
            }
        }

        return code;
    }

}

module.exports = JumpManager