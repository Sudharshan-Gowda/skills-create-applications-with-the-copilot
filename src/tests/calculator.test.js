const { add, subtract, multiply, divide } = require('../lib/calculator-core');

describe('Calculator core functions', () => {
  describe('addition', () => {
    test('adds numbers: 2 + 3 => 5', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds multiple numbers: 1 + 2 + 3 => 6', () => {
      expect(add(1, 2, 3)).toBe(6);
    });

    test('adds array input', () => {
      expect(add([4, 5, 6])).toBe(15);
    });
  });

  describe('subtraction', () => {
    test('subtracts numbers: 10 - 4 => 6', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('left-associative: 10 - 3 - 2 => 5', () => {
      expect(subtract(10, 3, 2)).toBe(5);
    });

    test('single operand returns itself', () => {
      expect(subtract(7)).toBe(7);
    });
  });

  describe('multiplication', () => {
    test('multiplies: 45 * 2 => 90', () => {
      expect(multiply(45, 2)).toBe(90);
    });

    test('multiplying by zero yields 0', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test('array input', () => {
      expect(multiply([2, 3, 4])).toBe(24);
    });
  });

  describe('division', () => {
    test('divides: 20 / 5 => 4', () => {
      expect(divide(20, 5)).toBe(4);
    });

    test('left-associative: 100 / 5 / 2 => 10', () => {
      expect(divide(100, 5, 2)).toBe(10);
    });

    test('division by zero throws', () => {
      expect(() => divide(10, 0)).toThrow(/division by zero/i);
    });

    test('array input', () => {
      expect(divide([48, 6, 2])).toBe(4);
    });
  });
});
