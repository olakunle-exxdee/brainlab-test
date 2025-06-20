import { CalculatorService } from './calculator';

let calculator: CalculatorService;

beforeEach(() => {
  calculator = new CalculatorService();
});

// Helper for invalid input assertions
function expectInvalidInput(input: string, message: string) {
  expect(() => calculator.add(input)).toThrow(`Invalid numbers: ${message}`);
}

// --- Basic additions ---
describe('Basic additions', () => {
  test('should return 0 for empty input', () => {
    expect(calculator.add('')).toBe(0);
  });

  test('should return 0 for input with spaces only', () => {
    expect(calculator.add('   ')).toBe(0);
  });

  test('should return the number for single input', () => {
    expect(calculator.add('42')).toBe(42);
  });

  test('should add two numbers correctly', () => {
    expect(calculator.add('7,-7')).toBe(0);
  });

  test('should add multiple numbers correctly', () => {
    expect(calculator.add('1,2,3,4,5')).toBe(15);
  });

  test('should handle negative numbers', () => {
    expect(calculator.add('-1,-2,-3')).toBe(-6);
  });

  test('should sum duplicate numbers', () => {
    expect(calculator.add('1,1,1')).toBe(3);
  });
});

// --- Edge cases and formatting ---
describe('Edge cases and formatting', () => {
  test('should handle whitespace around numbers', () => {
    expect(calculator.add(' 1 , 2 , 3 ')).toBe(6);
  });

  test('should handle very large numbers', () => {
    expect(calculator.add('999999999,1')).toBe(1000000000);
  });

  test('should handle very small numbers', () => {
    expect(calculator.add('0.000001,0.000002')).toBeCloseTo(0.000003);
  });

  test('should handle scientific notation', () => {
    expect(calculator.add('1e3,2e3')).toBe(3000);
  });

  test('should handle extremely large and small numbers', () => {
    expect(calculator.add('1e308,1e-308')).toBeCloseTo(1e308, 0);
  });

  test('should handle decimal numbers', () => {
    expect(calculator.add('1.5,2.5')).toBeCloseTo(4);
  });

  test('should ignore trailing commas', () => {
    expect(calculator.add('1,2,3,')).toBe(6);
  });

  test('should ignore leading commas', () => {
    expect(calculator.add(',1,2,3')).toBe(6);
  });

  test('should ignore multiple consecutive commas', () => {
    expect(calculator.add('1,,2,,3')).toBe(6);
  });

  test('should ignore commas with whitespace', () => {
    expect(calculator.add('1, ,2, ,3')).toBe(6);
  });

  test('should handle input with only commas', () => {
    expect(calculator.add(',,,')).toBe(0);
  });

  test('should handle leading/trailing whitespace and commas', () => {
    expect(calculator.add(' ,1,2, ')).toBe(3);
  });
});

// --- Input validation ---
describe('Input validation', () => {
  test('should throw error for invalid input', () => {
    expectInvalidInput('1,abc', 'abc');
  });

  test('should throw error for NaN', () => {
    expectInvalidInput('1,NaN,2', 'NaN');
  });

  test('should throw error for plus/minus only', () => {
    expectInvalidInput('1,+,2,-', '+, -');
  });

  test('should throw error for special characters', () => {
    expectInvalidInput('1,2@3', '2@3');
  });

  test('should throw error for non-ASCII numerals or symbols', () => {
    expectInvalidInput('1,２,三', '２, 三');
  });

  test('should throw error for mix of valid, empty, and invalid', () => {
    expectInvalidInput('1,, ,2,abc,3', 'abc');
  });
});

describe('Null and undefined input', () => {
  test('should throw error when input is null', () => {
    expect(() => calculator.add(null as unknown as string)).toThrow();
  });
  test('should throw error when input is undefined', () => {
    expect(() => calculator.add(undefined as unknown as string)).toThrow();
  });
});
