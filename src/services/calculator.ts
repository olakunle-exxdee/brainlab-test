export class CalculatorService {
  /**
   * Adds a list of numbers provided as a comma-separated string
   * @param operands - Comma-separated string of numbers (e.g. "1,2,3")
   * @returns The sum of all numbers
   * @throws Error if any input is not a valid number
   */
  public add(operands: string): number {
    if (operands === null || operands === undefined) {
      throw new Error('Input cannot be null or undefined');
    }
    // Treat whitespace-only input as empty
    if (!operands || operands.trim() === '') {
      return 0;
    }

    const invalidNumbers: string[] = [];
    const numbers = operands.split(',').map((num) => {
      const trimmed = num.trim();
      if (trimmed === '') {
        invalidNumbers.push('');
        return NaN;
      }
      const parsed = Number(trimmed);
      // Check for NaN, Infinity, or -Infinity
      if (isNaN(parsed)) {
        invalidNumbers.push(trimmed);
      } else if (parsed === Infinity) {
        invalidNumbers.push('Infinity');
      } else if (parsed === -Infinity) {
        invalidNumbers.push('-Infinity');
      }
      return parsed;
    });

    if (invalidNumbers.length > 0) {
      throw new Error(`Invalid characters: ${invalidNumbers.join(', ')}`);
    }

    let sum = 0;
    for (const num of numbers) {
      sum += num;
    }
    return sum;
  }
}
