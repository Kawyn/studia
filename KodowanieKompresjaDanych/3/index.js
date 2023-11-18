const fs = require('fs');
const LZW = require('./LZW');
const EliasGamma = require('./universal/coding/elias/gamma');
const EliasDelta = require('./universal/coding/elias/delta');
const EliasOmega = require('./universal/coding/elias/omega');
const Fibonacci = require('./universal/coding/fibonacci');
const file = fs.readFileSync('./pan-tadeusz.txt');

const c = Fibonacci.encode([6, 13, 15, 299]);
console.log(c);
console.log(Fibonacci.decode(c));

return;
var startTime = performance.now();
var stepTime = performance.now();
var result = LZW.encode(file);
console.log(file.length);
console.log(`LZW.encode in: ${performance.now() - stepTime}ms!`);
var stepTime = performance.now();

var code = EliasOmega.encode(result.code);
console.log(`ELIAS.encode in: ${performance.now() - stepTime}ms!`);
var stepTime = performance.now();
var decoded = EliasOmega.decode(code);
console.log(`ELias.dencode in: ${performance.now() - stepTime}ms!`);
var stepTime = performance.now();

var out = LZW.decode(result.dictionary, decoded);
console.log(`LZW.dencode in: ${performance.now() - stepTime}ms!`);

console.log(`Done in: ${performance.now() - startTime}ms!`);


fs.writeFileSync('out.txt', Buffer.from(out));