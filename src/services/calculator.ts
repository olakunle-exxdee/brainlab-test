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
    const numbers = operands
      .split(',')
      .map((num) => {
        const trimmed = num.trim();
        if (trimmed === '') {
          // Skip empty strings (from trailing commas) instead of treating as invalid
          return null;
        }
        const parsed = Number(trimmed);
        // Only check for NaN as invalid
        if (isNaN(parsed)) {
          invalidNumbers.push(trimmed);
        }
        return parsed;
      })
      .filter((num) => num !== null) as number[]; // Filter out null values

    if (invalidNumbers.length > 0) {
      throw new Error(`Invalid numbers: ${invalidNumbers.join(', ')}`);
    }

    let sum = 0;
    for (const num of numbers) {
      sum += num;
    }
    return sum;
  }
}
