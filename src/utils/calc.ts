import Decimal from 'decimal.js';


export const normalize = (numbers: Array<number>, padding: number = 0) => {
  const max = Math.max(...numbers);

  return numbers.map((num: number) => {
    const normalized = num / max;

    return normalized + (normalized - 0.5) * -2 * padding;
  });
};

export const sum = (numbers: Array<number>): number => numbers.reduce((a, b) => a + b, 0);

export const accumulate = (numbers: Array<number>) =>
  numbers.map(((sum) => (value: number) => sum += value)(0));

export const varTally = <T>(arr: Array<T>) => {
  const tally: Map<T, number> = new Map();

  arr.forEach((key) => {
    tally.set(key, (tally.get(key) || 0) + 1);
  });

  return tally;
};

export const roundArray = (nums: Array<number>, places: number): Array<Decimal> => {
  return nums.map((mod) => new Decimal(mod).toDecimalPlaces(places, Decimal.ROUND_HALF_CEIL));
};
