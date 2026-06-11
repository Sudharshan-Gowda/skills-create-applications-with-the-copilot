#!/usr/bin/env node

/*
  Node.js CLI Calculator
  Supported operations (based on the provided image and latest issue):
    - add (or +)
    - subtract (or -)
    - multiply (or *, x, ×)
    - divide (or /, ÷)

  Usage examples:
    node src/calculator.js add 1 2 3
    node src/calculator.js + 4 5
    node src/calculator.js divide 10 2
    node src/calculator.js / 20 5 2
*/

function printHelp() {
  console.log(`Usage: node src/calculator.js <operation> <num1> <num2> [num3 ...]

Operations:
  add, +        Add numbers
  subtract, -   Subtract numbers (left-associative)
  multiply, *, x, ×  Multiply numbers
  divide, /, ÷  Divide numbers (left-associative)

Examples:
  node src/calculator.js add 1 2 3
  node src/calculator.js / 10 2
`);
}

function exitWithError(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

const argv = process.argv.slice(2);
if (argv.length === 0 || argv[0] === '-h' || argv[0] === '--help') {
  printHelp();
  process.exit(0);
}

const opRaw = argv[0].toLowerCase();
const opsMap = {
  'add': 'add', '+': 'add',
  'subtract': 'subtract', '-': 'subtract',
  'multiply': 'multiply', '*': 'multiply', 'x': 'multiply', '×': 'multiply',
  'divide': 'divide', '/': 'divide', '÷': 'divide'
};

const operation = opsMap[opRaw];
if (!operation) {
  exitWithError(`Unknown operation: ${argv[0]}. Use --help for usage.`);
}

const rawNums = argv.slice(1);
if (rawNums.length < 2) {
  exitWithError('Please provide two or more numeric operands. Use --help for examples.');
}

const nums = rawNums.map(n => {
  const v = Number(n);
  return Number.isFinite(v) ? v : NaN;
});

if (nums.some(Number.isNaN)) {
  exitWithError('All operands must be valid numbers.');
}

// Delegate to core functions to make logic testable
const { add, subtract, multiply, divide } = require('./lib/calculator-core');

let result;
switch (operation) {
  case 'add':
    result = add(nums);
    break;
  case 'subtract':
    result = subtract(nums);
    break;
  case 'multiply':
    result = multiply(nums);
    break;
  case 'divide':
    try {
      result = divide(nums);
    } catch (err) {
      exitWithError(`Error: ${err.message}`, 2);
    }
    break;
  default:
    exitWithError('Unsupported operation.');
}

console.log(result);
process.exit(0);
