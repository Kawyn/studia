class Fibonacci {

    static #FIBONACCI_SEQUENCE = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155, 165580141, 267914296, 433494437, 701408733, 1134903170, 1836311903, 2971215073, 4807526976, 7778742049, 12586269025, 20365011074, 32951280099, 53316291173, 86267571272, 139583862445, 225851433717, 365435296162, 591286729879, 956722026041, 1548008755920, 2504730781961, 4052739537881, 6557470319842, 10610209857723, 17167680177565, 27777890035288, 44945570212853, 72723460248141, 117669030460994, 190392490709135, 308061521170129, 498454011879264, 806515533049393, 1304969544928657, 2111485077978050, 3416454622906707, 5527939700884757, 8944394323791464, 14472334024676220];

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

            let code = '';
            let biggestPossibleIdx = 0;

            while (this.#FIBONACCI_SEQUENCE[biggestPossibleIdx + 1] <= number)
                biggestPossibleIdx++;

            for (let i = biggestPossibleIdx; i >= 0; i--) {

                if (this.#FIBONACCI_SEQUENCE[i] <= number) {

                    number -= this.#FIBONACCI_SEQUENCE[i];
                    code = '1' + code;
                }
                else
                    code = '0' + code;
            }

            result += code + '1';
        }
        console.log(result);
        let padding = 8 - (result.length % 8);
        result += '0'.repeat(padding);

        return this.#stringToArrayBuffer(result);
    }

    static decode(buffer) {

        let result = [];

        let previousBit = 0;

        let number = 0;
        let currentFibbonaciIdx = 0;

        for (const bit of this.#nextBit(buffer)) {

            if (previousBit === 1 && bit === 1) {

                result.push(number);

                previousBit = 0;

                number = 0;
                currentFibbonaciIdx = 0;

                continue;
            }


            if (bit === 1)
                number += this.#FIBONACCI_SEQUENCE[currentFibbonaciIdx];

            previousBit = bit;

            currentFibbonaciIdx++;
        }

        return result;
    }
}

module.exports = Fibonacci;