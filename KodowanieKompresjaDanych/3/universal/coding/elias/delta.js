class EliasDelta {

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

        for (const number of buffer) {

            const binary = number.toString(2);
            const binaryLengthAsBinary = binary.length.toString(2);

            result += '0'.repeat(binaryLengthAsBinary.length - 1) + binaryLengthAsBinary + binary.substring(1);
        }

        let padding = 8 - (result.length % 8);
        result += '0'.repeat(padding);

        console.log(result);
        return this.#stringToArrayBuffer(result);
    }

    static decode(buffer) {

        let result = [];

        let mode = 'size';

        let size = 0;
        let length = 0;
        let number = 0;

        for (const bit of this.#nextBit(buffer)) {

            if (mode === 'size') {

                if (bit === 0)
                    size++;
                else
                    mode = 'length'
            }

            if (mode === 'length') {

                length += bit << size;
                size--;

                if (size === -1) {

                    length--;
                    number += 1 << length;

                    mode = 'number';

                    if (length === 0) {

                        result.push(number);

                        size = 0;
                        length = 0;

                        number = 0;

                        mode = 'size';
                    }

                    continue;
                }
            }

            if (mode === 'number') {

                length--;
                number += bit << length;

                if (length === 0) {

                    result.push(number);

                    size = 0;
                    length = 0;

                    number = 0;

                    mode = 'size';
                }
            }
        }

        return result;
    }
}

module.exports = EliasDelta;