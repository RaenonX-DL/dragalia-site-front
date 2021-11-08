import {calcEnmityHpPct, calcEnmityMod} from './enmity';


describe('Enmity calc functions', () => {
  it('calculates HP percent for a specific mod', async () => {
    // Normal cases
    expect(calcEnmityHpPct(1.2, 1.6)).toBeCloseTo(42.2649);
    // Louise-like
    expect(calcEnmityHpPct(0.7, 0.5)).toBeCloseTo(22.5403);
  });

  it('calculates effective enmity mod', async () => {
    expect(calcEnmityMod(5, 1.6)).toBeCloseTo(1.5415);
    expect(calcEnmityMod(70, 0.5)).toBeCloseTo(0.955);
  });
});
