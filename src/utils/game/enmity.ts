export const calcEnmityMod = (currentHpPct: number, enmityMod: number): number => {
  return (1 - currentHpPct / 100) ** 2 * (enmityMod - 1) + 1;
};

export const calcEnmityHpPct = (currentEnmity: number, enmityMod: number): number => {
  const a = (enmityMod - 1);
  const b = (-2 * enmityMod + 2);
  const c = (enmityMod - currentEnmity);

  const numSqrt = Math.sqrt(b ** 2 - 4 * a * c);
  const denominator = 2 * a;

  return Math.min((-b + numSqrt) / denominator, (-b - numSqrt) / denominator) * 100;
};
