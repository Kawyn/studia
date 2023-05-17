const DEBUG = true;
const DEBUG_VARIABLES = {};

const BOARD_SIZE = 5;
const GAME_OVER_SCORE = 1_000_000;

const WINNING_POSITIONS = [
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[1, 0], [1, 1], [1, 2], [1, 3]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[3, 0], [3, 1], [3, 2], [3, 3]],
    [[4, 0], [4, 1], [4, 2], [4, 3]],
    [[0, 1], [0, 2], [0, 3], [0, 4]],
    [[1, 1], [1, 2], [1, 3], [1, 4]],
    [[2, 1], [2, 2], [2, 3], [2, 4]],
    [[3, 1], [3, 2], [3, 3], [3, 4]],
    [[4, 1], [4, 2], [4, 3], [4, 4]],
    [[0, 0], [1, 0], [2, 0], [3, 0]],
    [[0, 1], [1, 1], [2, 1], [3, 1]],
    [[0, 2], [1, 2], [2, 2], [3, 2]],
    [[0, 3], [1, 3], [2, 3], [3, 3]],
    [[0, 4], [1, 4], [2, 4], [3, 4]],
    [[1, 0], [2, 0], [3, 0], [4, 0]],
    [[1, 1], [2, 1], [3, 1], [4, 1]],
    [[1, 2], [2, 2], [3, 2], [4, 2]],
    [[1, 3], [2, 3], [3, 3], [4, 3]],
    [[1, 4], [2, 4], [3, 4], [4, 4]],
    [[0, 1], [1, 2], [2, 3], [3, 4]],
    [[0, 0], [1, 1], [2, 2], [3, 3]],
    [[1, 1], [2, 2], [3, 3], [4, 4]],
    [[1, 0], [2, 1], [3, 2], [4, 3]],
    [[0, 3], [1, 2], [2, 1], [3, 0]],
    [[0, 4], [1, 3], [2, 2], [3, 1]],
    [[1, 3], [2, 2], [3, 1], [4, 0]],
    [[1, 4], [2, 3], [3, 2], [4, 1]]
];



const LOSING_MOVES = [
    [[0, 0], [0, 1], [0, 2]], [[0, 1], [0, 2], [0, 3]], [[0, 2], [0, 3], [0, 4]],
    [[1, 0], [1, 1], [1, 2]], [[1, 1], [1, 2], [1, 3]], [[1, 2], [1, 3], [1, 4]],
    [[2, 0], [2, 1], [2, 2]], [[2, 1], [2, 2], [2, 3]], [[2, 2], [2, 3], [2, 4]],
    [[3, 0], [3, 1], [3, 2]], [[3, 1], [3, 2], [3, 3]], [[3, 2], [3, 3], [3, 4]],
    [[4, 0], [4, 1], [4, 2]], [[4, 1], [4, 2], [4, 3]], [[4, 2], [4, 3], [4, 4]],
    [[0, 0], [1, 0], [2, 0]], [[1, 0], [2, 0], [3, 0]], [[2, 0], [3, 0], [4, 0]],
    [[0, 1], [1, 1], [2, 1]], [[1, 1], [2, 1], [3, 1]], [[2, 1], [3, 1], [4, 1]],
    [[0, 2], [1, 2], [2, 2]], [[1, 2], [2, 2], [3, 2]], [[2, 2], [3, 2], [4, 2]],
    [[0, 3], [1, 3], [2, 3]], [[1, 3], [2, 3], [3, 3]], [[2, 3], [3, 3], [4, 3]],
    [[0, 4], [1, 4], [2, 4]], [[1, 4], [2, 4], [3, 4]], [[2, 4], [3, 4], [4, 4]],
    [[0, 2], [1, 3], [2, 4]], [[0, 1], [1, 2], [2, 3]], [[1, 2], [2, 3], [3, 4]],
    [[0, 0], [1, 1], [2, 2]], [[1, 1], [2, 2], [3, 3]], [[2, 2], [3, 3], [4, 4]],
    [[1, 0], [2, 1], [3, 2]], [[2, 1], [3, 2], [4, 3]], [[2, 0], [3, 1], [4, 2]],
    [[0, 2], [1, 1], [2, 0]], [[0, 3], [1, 2], [2, 1]], [[1, 2], [2, 1], [3, 0]],
    [[0, 4], [1, 3], [2, 2]], [[1, 3], [2, 2], [3, 1]], [[2, 2], [3, 1], [4, 0]],
    [[1, 4], [2, 3], [3, 2]], [[2, 3], [3, 2], [4, 1]], [[2, 4], [3, 3], [4, 2]]
];

const SCORE_MAP = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, -2, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
]

class TicTacToe {

    /** @type {string[]} */
    #history = [];

    /** @type {number[][]} */
    tictactoe;

    constructor() {

        this.tictactoe = new Array(5);

        for (let i = 0; i < this.tictactoe.length; i++)
            this.tictactoe[i] = new Array(5).fill(0);
    }

    move(player, moveID) {

        const x = moveID[0];
        const y = moveID[1];

        this.tictactoe[x][y] = player;
        this.#history.push(moveID);
    }

    undo() {

        const moveID = this.#history.pop();

        const x = moveID[0];
        const y = moveID[1];

        this.tictactoe[x][y] = 0;
    }


    /**
     * 
     * @param {number} maximize 
     * @param {number} depth 
     * @param {number} alpha 
     * @param {number} beta 
     * @param {boolean} returnBestMove 
     * @returns {number|string} 
     */
    alphabeta(maximize, depth, alpha, beta, returnBestMove = false) {

        if (this.won(-maximize))
            return -maximize * (GAME_OVER_SCORE + depth);

        if (this.lost(-maximize))
            return maximize * (GAME_OVER_SCORE + depth);

        if (depth === 0)
            return this.evaluate();

        if (maximize === 1) {

            let bestMoves = []; // nie deterministyczny ruch
            let value = Number.MIN_SAFE_INTEGER;

            if (DEBUG && returnBestMove)
                DEBUG_VARIABLES.moves = [];

            for (const move of this.getPossibleMoves()) {

                this.move(maximize, move);
                const v = this.alphabeta(-maximize, depth - 1, alpha, beta);

                if (value == v)
                    bestMoves.push(move);

                if (DEBUG && returnBestMove)
                    DEBUG_VARIABLES.moves.push({ value: v, move });

                value = Math.max(value, v);
                this.undo();

                if (value > beta)
                    break;

                if (value > alpha) {

                    alpha = value;

                    if (returnBestMove) {

                        bestMoves = [];
                        bestMoves.push(move);
                    }
                }
            }

            if (DEBUG && returnBestMove) {

                console.log(DEBUG_VARIABLES.moves);
                console.log(bestMoves);
            }

            if (returnBestMove)
                return bestMoves[Math.floor(Math.random() * bestMoves.length)];

            return value;
        }

        else {

            let value = Number.MAX_SAFE_INTEGER;

            for (const moveID of this.getPossibleMoves()) {

                this.move(maximize, moveID);
                value = Math.min(value, this.alphabeta(-maximize, depth - 1, alpha, beta));
                this.undo();

                if (value < alpha)
                    break;

                if (value < beta)
                    beta = value;
            }

            return value;
        }
    }

    won(player) {

        for (let i = 0; i < WINNING_POSITIONS.length; i++) {

            const moves = WINNING_POSITIONS[i];

            if (this.tictactoe[moves[0][0]][moves[0][1]] === player &&
                this.tictactoe[moves[1][0]][moves[1][1]] === player &&
                this.tictactoe[moves[2][0]][moves[2][1]] === player &&
                this.tictactoe[moves[3][0]][moves[3][1]] === player) return true;
        }
    }

    lost(player) {

        for (let i = 0; i < LOSING_MOVES.length; i++) {

            const moves = LOSING_MOVES[i];

            if (this.tictactoe[moves[0][0]][moves[0][1]] == player &&
                this.tictactoe[moves[1][0]][moves[1][1]] == player &&
                this.tictactoe[moves[2][0]][moves[2][1]] == player) return true;
        }
    }

    getPossibleMoves() {

        const moves = [];

        for (let x = 0; x < BOARD_SIZE; x++) {

            for (let y = 0; y < BOARD_SIZE; y++) {

                if (this.tictactoe[x][y] === 0)
                    moves.push(`${x}${y}`);
            }
        }

        return moves;
    }

    /**
     * Wartość pozycji liczona jest mniej więcej: 
     * 
     * 1. Idziemy po rozwiązaniach i jeżeli są na nim tylko znaczki jednego gracza (albo puste), dostaje on 1 punkt, za każdy 'X' albo 'Y', 
     * więc najbardziej opłacają się grać pola, które mogą dać kilka wygranych.
     * 
     * 2. Potem idziemy po przegranych i jeżeli ponownie są na nim tylko znaczki jednego gracza, dostaje on -2 punkty,
     * bo blokuje sobie możliwość blokowania przeciwnika. Ta reguła odrazu załatwia, że X _ X jest lepszą pozycją niż X X _, bo te dwa 'X' 
     * występują jeszcze w _ X X 
     * 
     * 3. Znaczki na wewnętrznym pierścieniu dają 1 punkt, aby bot nie stawiał na początku na środek, bo mienie znaczka na środku, 
     * w lategame jest nieopłacalne.
     * 
     * 4. Zwycięstwa i przegrane są załatwione w minmaxie.
     * 
     * @returns {number} Wartość pola, jeźeli jest pozytywna bot "wygrywa", jeśli negatywna bot "przegrywa"
     */
    evaluate() {

        let score = 0;

        for (let position of WINNING_POSITIONS) {

            let player = 0;
            let subscore = 0;

            for (let code of position) {

                const v = this.tictactoe[code[0]][code[1]];

                if (v !== 0 && player === 0) {

                    player = v;
                    subscore++;
                }

                else if (player !== 0) {

                    if (v !== 0 && v !== player) {

                        player = 0;
                        break;
                    }

                    else {

                        if (v === player)
                            subscore++;
                    }
                }
            }

            score += player * subscore;
        }

        for (let position of LOSING_MOVES) {

            let subscore = 0;

            for (let code of position) {

                const v = this.tictactoe[code[0]][code[1]];
                subscore += v;
            }

            if (Math.abs(subscore) !== 2)
                continue;

            score += -subscore;
        }

        for (let x = 0; x < BOARD_SIZE; x++) {

            for (let y = 0; y < BOARD_SIZE; y++)
                score += this.tictactoe[x][y] * SCORE_MAP[x][y];
        }

        return score;
    }
}




module.exports = TicTacToe;