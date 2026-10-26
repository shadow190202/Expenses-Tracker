import { describe, it, expect } from 'vitest';

describe('Financial Math & Progress Calculations', () => {
  const calculateProgress = (amount, totalSpend) => {
    const total = Number(amount);
    if (!total || total <= 0) return 0;
    const perc = ((Number(totalSpend) || 0) / total) * 100;
    return Math.min(Math.max(perc, 0), 100).toFixed(0);
  };

  it('calculates progress percentage correctly for normal spending', () => {
    expect(calculateProgress(1000, 250)).toBe('25');
    expect(calculateProgress(500, 250)).toBe('50');
    expect(calculateProgress(100, 100)).toBe('100');
  });

  it('caps progress at 100% when budget is overspent', () => {
    expect(calculateProgress(100, 150)).toBe('100');
    expect(calculateProgress(500, 2000)).toBe('100');
  });

  it('prevents NaN or division by zero when budget is 0 or invalid', () => {
    expect(calculateProgress(0, 50)).toBe(0);
    expect(calculateProgress(-100, 50)).toBe(0);
    expect(calculateProgress(null, 50)).toBe(0);
    expect(calculateProgress('invalid', 50)).toBe(0);
  });

  it('handles zero or negative spending gracefully', () => {
    expect(calculateProgress(1000, 0)).toBe('0');
    expect(calculateProgress(1000, -50)).toBe('0');
  });

  it('calculates remaining balance and overage accurately', () => {
    const calcRemaining = (amount, totalSpend) => {
      const a = Number(amount) || 0;
      const s = Number(totalSpend) || 0;
      return a - s;
    };

    expect(calcRemaining(1000, 400)).toBe(600);
    expect(calcRemaining(500, 500)).toBe(0);
    expect(calcRemaining(500, 650)).toBe(-150);
  });
});
