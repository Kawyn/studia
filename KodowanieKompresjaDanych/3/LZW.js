const EliasGamma = require("./universal/coding/elias/gamma");


class LZW {

    static #BYTE_SIZE = 256;
    static #BYTE_MAX = 255;

    static #SEPARATOR = '-';

    /**
     * 
     * @param {Buffer} buffer 
     * @returns 
     */
    static encode(buffer) {

        const result = { dictionary: {}, code: [] };
        const dictionary = {};

        let currentLastDictionaryIdx = 1;

        for (const char of buffer) {

            if (dictionary[char] !== undefined)
                continue;

            dictionary[char] = currentLastDictionaryIdx;
            currentLastDictionaryIdx++;
        }

        result.dictionary = { ...dictionary };
        let code = buffer[0];

        for (let i = 1; i < buffer.length; i++) {
            const c = code + this.#SEPARATOR + buffer[i];

            if (dictionary[c])
                code = c;

            else {

                result.code.push(dictionary[code]);

                dictionary[c] = currentLastDictionaryIdx;
                currentLastDictionaryIdx++;

                code = buffer[i]
            }
        }

        if (code && dictionary[code] !== undefined)
            result.code.push(dictionary[code]);

        return result;
    }

    /**
     * 
     * @param {*} dictionary 
     * @param {number[]} buffer 
     */
    static decode(dictionary, buffer) {

        const result = [];


        const codeToChar = [];

        for (const k of Object.keys(dictionary))
            codeToChar[dictionary[k]] = [k];

        let W = [];
        let previousW;
        for (let i = 0; i < buffer.length; i++) {
            let code = buffer[i];
            const char = codeToChar[code];

            if (codeToChar[code]) {

                result.push(...codeToChar[code]);

                if (previousW) {
                    codeToChar.push([...previousW, char[0]]);
                    previousW = [...char];

                }
                else {
                    previousW = [codeToChar[code][0]];
                }
            }
            else {

                previousW.push(previousW[0]);

                codeToChar.push([...previousW]);

                result.push(...previousW);

            }
        }
        return result;

    }

}


module.exports = LZW;