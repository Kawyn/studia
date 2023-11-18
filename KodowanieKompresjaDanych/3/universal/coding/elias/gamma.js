class EliasGamma {

    static #nextBit = function* (buffer) {

        for (let byte of buffer) {

            for (let i = 7; i >= 0; i--)
                yield (byte >> i) & 1;
        }
    }

    static #stringToArrayBuffer = (string) => {

        const result = [];

        for (let i = 0; i < string.length; i += 8)
            result[i / 8] = parseInt(string.slice(i, i + 8), 2);

        return result;
    }

    static encode(buffer) {

        let result = '';

        for (let number of buffer) {

            let binary = number.toString(2);
            result += '0'.repeat(binary.length - 1) + binary;
        }

        let padding = 8 - (result.length % 8);
        result += '0'.repeat(padding);

        return this.#stringToArrayBuffer(result);
    }

    static decode(buffer) {

        let result = [];

        let mode = 'size';

        let size = 0;
        let number = 0;

        for (const bit of this.#nextBit(buffer)) {

            if (mode === 'size' && bit === 0) {

                size++;
                continue;
            }

            if (mode === 'size' && bit === 1)
                mode = 'number'

            number += bit << size;
            size--;

            if (size === -1) {

                result.push(number);

                mode = 'size';

                size = 0;
                number = 0;
            }
        }

        return result;
    }
}

module.exports = EliasGamma;