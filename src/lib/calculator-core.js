// Core calculator functions used by CLI and tests

function normalizeArgs(args) {
  // accept either an array as single arg or rest args
  if (args.length === 1 && Array.isArray(args[0])) return args[0];
  return Array.from(args);
}

function add(...args) {
  const nums = normalizeArgs(args).map(Number);
  return nums.reduce((a, b) => a + b, 0);
}

function subtract(...args) {
  const nums = normalizeArgs(args).map(Number);
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  return nums.slice(1).reduce((a, b) => a - b, nums[0]);
}

function multiply(...args) {
  const nums = normalizeArgs(args).map(Number);
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a * b, 1);
}

function divide(...args) {
  const nums = normalizeArgs(args).map(Number);
  if (nums.length === 0) throw new Error('No operands provided');
  if (nums.length === 1) return nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === 0) throw new Error('Division by zero');
  }
  return nums.slice(1).reduce((a, b) => a / b, nums[0]);
}

module.exports = { add, subtract, multiply, divide };
