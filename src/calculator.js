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

let result;
switch (operation) {
  case 'add':
    result = nums.reduce((a, b) => a + b, 0);
    break;
  case 'subtract':
    result = nums.slice(1).reduce((a, b) => a - b, nums[0]);
    break;
  case 'multiply':
    result = nums.reduce((a, b) => a * b, 1);
    break;
  case 'divide':
    // handle division by zero gracefully
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === 0) {
        exitWithError('Error: Division by zero detected. Aborting.', 2);
      }
    }
    result = nums.slice(1).reduce((a, b) => a / b, nums[0]);
    break;
  default:
    exitWithError('Unsupported operation.');
}

console.log(result);
process.exit(0);
