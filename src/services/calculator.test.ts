import { CalculatorService } from './calculator';

describe('CalculatorService', () => {
  let calculator: CalculatorService;

  beforeEach(() => {
    // Given: a calculator service
    calculator = new CalculatorService();
  });

  test('should return 0 for empty input', () => {
    // When: adding an empty string
    // Then: it should return 0
    expect(calculator.add('')).toBe(0);
  });

  test('should return the number for single input', () => {
    // When: adding a single number
    // Then: it should return that number
    expect(calculator.add('42')).toBe(42);
  });

  test('should add two numbers correctly', () => {
    // When: adding two numbers
    // Then: it should return their sum
    expect(calculator.add('7,-7')).toBe(0);
  });

  test('should add multiple numbers correctly', () => {
    // When: adding multiple numbers
    // Then: it should return their sum
    expect(calculator.add('1,2,3,4,5')).toBe(15);
  });

  test('should handle negative numbers', () => {
    // When: adding negative numbers
    // Then: it should return their sum
    expect(calculator.add('-1,-2,-3')).toBe(-6);
  });

  test('should throw error for invalid input', () => {
    // When: adding a string with an invalid number
    // Then: it should throw an error listing the invalid number
    expect(() => calculator.add('1,abc')).toThrow('Invalid characters: abc');
  });

  // Edge cases
  test('should handle whitespace around numbers', () => {
    // When: adding numbers with whitespace
    // Then: it should return their sum
    expect(calculator.add(' 1 , 2 , 3 ')).toBe(6);
  });

  test('should handle decimal numbers', () => {
    // When: adding decimal numbers
    // Then: it should return their sum
    expect(calculator.add('1.5,2.5')).toBe(4);
  });

  test('should handle very large numbers', () => {
    // When: adding very large numbers
    // Then: it should return their sum
    expect(calculator.add('999999999,1')).toBe(1000000000);
  });

  test('should handle very small numbers', () => {
    // When: adding very small numbers
    // Then: it should return their sum
    expect(calculator.add('0.000001,0.000002')).toBe(0.000003);
  });

  test('should handle scientific notation', () => {
    // When: adding numbers in scientific notation
    // Then: it should return their sum
    expect(calculator.add('1e3,2e3')).toBe(3000);
  });

  test('should handle multiple consecutive commas', () => {
    // When: adding numbers with multiple consecutive commas
    // Then: it should throw an error for empty segment
    expect(() => calculator.add('1,,2')).toThrow('Invalid characters: ');
  });

  test('should handle trailing comma', () => {
    expect(() => calculator.add('1,2,')).toThrow('Invalid characters: ');
  });

  test('should handle leading comma', () => {
    expect(() => calculator.add(',1,2')).toThrow('Invalid characters: ');
  });

  test('should handle special characters', () => {
    expect(() => calculator.add('1,2@3')).toThrow('Invalid characters: 2@3');
  });

  test('should handle null input', () => {
    expect(() => calculator.add(null as unknown as string)).toThrow();
  });

  test('should handle undefined input', () => {
    expect(() => calculator.add(undefined as unknown as string)).toThrow();
  });

  test('should throw error for input with only commas', () => {
    // When: input is only commas
    // Then: it should throw for all empty segments
    expect(() => calculator.add(',,,')).toThrow('Invalid characters: , , ');
  });

  test('should return 0 for input with spaces only', () => {
    // When: input is only spaces
    // Then: it should return 0
    expect(calculator.add('   ')).toBe(0);
  });

  test('should throw error for mix of valid, empty, and invalid', () => {
    // When: input has valid, empty, and invalid segments
    // Then: it should throw for all invalid segments
    expect(() => calculator.add('1,, ,2,abc,3')).toThrow(
      'Invalid characters: , , abc'
    );
  });

  test('should throw error for leading/trailing whitespace and commas', () => {
    // When: input has leading/trailing whitespace and commas
    // Then: it should throw for empty segments
    expect(() => calculator.add(' ,1,2, ')).toThrow('Invalid characters: , ');
  });

  test('should throw error for non-ASCII numerals or symbols', () => {
    // When: input has non-ASCII numerals or symbols
    // Then: it should throw for those segments
    expect(() => calculator.add('1,２,三')).toThrow(
      'Invalid characters: ２, 三'
    );
  });



  test('should throw error for NaN', () => {
    // When: input is NaN
    // Then: it should throw for NaN
    expect(() => calculator.add('1,NaN,2')).toThrow('Invalid characters: NaN');
  });

  test('should throw error for plus/minus only', () => {
    // When: input is plus or minus only
    // Then: it should throw for those segments
    expect(() => calculator.add('1,+,2,-')).toThrow('Invalid characters: +, -');
  });

  test('should sum duplicate numbers', () => {
    // When: input has duplicate numbers
    // Then: it should sum as normal
    expect(calculator.add('1,1,1')).toBe(3);
  });

  test('should handle extremely large and small numbers', () => {
    // When: input has extremely large and small numbers
    // Then: it should sum as normal
    expect(calculator.add('1e308,1e-308')).toBeCloseTo(1e308, 0);
  });
});
