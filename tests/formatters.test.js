import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatCompactNumber } from '@/lib/formatters';

describe('Formatters Unit Tests', () => {
  describe('formatCurrency', () => {
    it('formats standard positive numbers to USD currency', () => {
      expect(formatCurrency(1250)).toBe('$1,250.00');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(19.99)).toBe('$19.99');
    });

    it('formats negative numbers correctly', () => {
      expect(formatCurrency(-50)).toBe('-$50.00');
      expect(formatCurrency(-1250.5)).toBe('-$1,250.50');
    });

    it('safely parses numeric string values', () => {
      expect(formatCurrency('1250')).toBe('$1,250.00');
      expect(formatCurrency('45.50')).toBe('$45.50');
    });

    it('gracefully returns $0.00 for empty, null, undefined, or NaN inputs', () => {
      expect(formatCurrency(null)).toBe('$0.00');
      expect(formatCurrency(undefined)).toBe('$0.00');
      expect(formatCurrency('')).toBe('$0.00');
      expect(formatCurrency('abc')).toBe('$0.00');
      expect(formatCurrency(NaN)).toBe('$0.00');
      expect(formatCurrency(Infinity)).toBe('$0.00');
    });
  });

  describe('formatDate', () => {
    it('formats ISO date strings to human-readable format', () => {
      const formatted = formatDate('2026-10-24T12:00:00.000Z');
      expect(formatted).toContain('2026');
      expect(formatted).toContain('Oct');
      expect(formatted).toContain('24');
    });

    it('formats JavaScript Date instances', () => {
      const date = new Date(2026, 9, 24); // Oct 24, 2026
      expect(formatDate(date)).toBe('Oct 24, 2026');
    });

    it('returns "-" for null, undefined, or empty values', () => {
      expect(formatDate(null)).toBe('-');
      expect(formatDate(undefined)).toBe('-');
      expect(formatDate('')).toBe('-');
    });

    it('falls back to string representation if parsing fails', () => {
      expect(formatDate('invalid-date')).toBe('invalid-date');
    });
  });

  describe('formatCompactNumber', () => {
    it('formats standard numbers compactly', () => {
      expect(formatCompactNumber(0)).toBe('0');
      expect(formatCompactNumber(500)).toBe('500');
      expect(formatCompactNumber(1000)).toBe('1K');
      expect(formatCompactNumber(2500)).toBe('2.5K');
      expect(formatCompactNumber(1000000)).toBe('1M');
    });

    it('handles numeric strings', () => {
      expect(formatCompactNumber('5000')).toBe('5K');
    });

    it('gracefully returns "0" for invalid inputs', () => {
      expect(formatCompactNumber(null)).toBe('0');
      expect(formatCompactNumber(undefined)).toBe('0');
      expect(formatCompactNumber('')).toBe('0');
      expect(formatCompactNumber('bad-num')).toBe('0');
    });
  });
});
