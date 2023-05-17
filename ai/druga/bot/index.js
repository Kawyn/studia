const net = require('net');
const TicTacToe = require('./TicTacToe')

// node <nazwa> <adress ip> <port> <gracz> <głębokość> 
// czyli długość 6
if (process.argv.length !== 6) {

    console.log(`Wrong number of arguments.`)
    return;
}

const host = process.argv[2];
const port = process.argv[3];

const player = process.argv[4];
const depth = process.argv[5];

const client = new net.Socket();

client.connect(port, host, () => {

    console.log(`Connected to server successfully`);
});

client.on('error', (error) => {

    console.error(error);
});

/** @type {TicTacToe} */
let game;

client.on('data', data => {

    const code = data.toString();

    console.log('[IN] ' + code);

    if (code === '700') {

        game = new TicTacToe(player);
        client.write(player);
    }

    else if (code.length === 2 || code.startsWith('6')) {

        const x = code[0] - 1;
        const y = code[1] - 1;

        if (x !== -1 && y !== -1)
            game.move(-1, `${x}${y}`);

        const move = game.alphabeta(1, +depth, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, true);
        game.move(1, move);

        console.log('[OUT] ' + move);
        client.write(`${+move[0] + 1}${+move[1] + 1}`);
    }
});