class EliasOmega {

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

            let code = '0';
            let binary = number.toString(2);

            while (binary.length > 1) {

                code = binary + code;
                binary = (binary.length - 1).toString(2);
            }

            result += code;
        }

        let padding = 8 - (result.length % 8);
        result += '1'.repeat(padding);

        return this.#stringToArrayBuffer(result);
    }

    static decode(buffer) {

        let result = [];

        let numberLength = 1;
        let number = 1;

        let firstBit = true;

        for (const bit of this.#nextBit(buffer)) {

            if (firstBit) {

                if (bit === 0) {

                    result.push(number);

                    numberLength = 1;
                    number = 1;

                    firstBit = true;

                    continue;
                }

                numberLength = number + 1;
                number = 0;

                firstBit = false;
            }

            numberLength--;
            number += bit << numberLength;

            if (numberLength == 0)
                firstBit = true;
        }

        return result;
    }
}

module.exports = EliasOmega;