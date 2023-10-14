// Kewin Ignasiak

const fs = require('fs');

// node [script] [pattern] [filename]
const pattern = process.argv[2];
const filename = process.argv[3];

const data = fs.readFileSync(`${__dirname}/${filename}`).toString();

class FiniteAutomata {

    #state = 0;
    #states = [];

    get State() {
        return this.#state;
    }

    /**
     * @param {string} pattern 
     */
    constructor(pattern) {

        this.#states = [];

        const uniqueChars = new Set(pattern);

        for (let currentState = 0; currentState <= pattern.length; currentState++) {

            this.#states[currentState] = {};

            for (const char of uniqueChars) {

                if (char === pattern[currentState]) {

                    this.#states[currentState][char] = currentState + 1;
                    continue;
                }

                for (let nextState = currentState; nextState > 0; nextState--) {

                    if (pattern[nextState - 1] === char) {

                        let i = 0;

                        for (; i < nextState - 1; i++) {

                            if (pattern[i] !== pattern[currentState - nextState + 1 + i])
                                break;
                        }

                        if (i == nextState - 1) {

                            this.#states[currentState][char] = nextState;
                            break;
                        }
                    }
                }
            }
        }
    }

    next(char) {

        const nextState = this.#states[this.#state][char];

        if (!nextState)
            this.#state = 0;
        else
            this.#state = nextState;

        return this.#state === this.#states.length - 1;
    }

    static search(text, pattern) {

        const result = [];

        const automata = new FiniteAutomata(pattern);

        for (let i = 0; i < text.length; i++) {

            if (automata.next(text[i]))
                result.push(i - pattern.length + 1);
        }
    }
}

const out = FiniteAutomata.search(pattern, data);

if (out.length === 0)
    console.log(`Nie znaleziono wystąpień wzorca`);
else
    console.log(`Znaleziono wystąpienia na pozycjach: ${out.join(', ')}`);