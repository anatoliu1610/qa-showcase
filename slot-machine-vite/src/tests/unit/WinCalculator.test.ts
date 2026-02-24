import { describe, expect, it } from 'vitest';
import { WinCalculator } from '@/math/WinCalculator';
import { gameConfig } from '@/config/gameConfig';
import type { Grid5x3 } from '@/types/slot';

describe('WinCalculator', () => {
  it('evaluates middle line 5-of-a-kind (L01)', () => {
    const calc = new WinCalculator(gameConfig);
    const grid: Grid5x3 = [
      ['9', 'A', 'K'],
      ['9', 'A', 'K'],
      ['9', 'A', 'K'],
      ['9', 'A', 'K'],
      ['9', 'A', 'K']
    ];

    const res = calc.evaluate(grid);
    const l01 = res.lineWins.find((x) => x.lineId === 'L01');

    expect(l01).toBeDefined();
    expect(l01?.symbol).toBe('A');
    expect(l01?.count).toBe(5);
    expect(l01?.amount).toBe(200);
  });

  it('supports wild substitution on lines', () => {
    const calc = new WinCalculator(gameConfig);
    const grid: Grid5x3 = [
      ['9', 'A', 'K'],
      ['9', 'W', 'K'],
      ['9', 'A', 'K'],
      ['9', 'A', 'K'],
      ['9', 'K', 'K']
    ];

    const res = calc.evaluate(grid);
    const l01 = res.lineWins.find((x) => x.lineId === 'L01');

    expect(l01).toBeDefined();
    expect(l01?.symbol).toBe('A');
    expect(l01?.count).toBe(4);
    expect(l01?.amount).toBe(60);
  });

  it('calculates scatter pays anywhere', () => {
    const calc = new WinCalculator(gameConfig);
    const grid: Grid5x3 = [
      ['S', '9', 'K'],
      ['9', 'S', 'K'],
      ['9', 'A', 'S'],
      ['9', 'A', 'K'],
      ['9', 'A', 'K']
    ];

    const res = calc.evaluate(grid);
    expect(res.scatterCount).toBe(3);
    expect(res.scatterAmount).toBe(10);
  });

  it('uses all 21 paylines from config', () => {
    expect(gameConfig.paylines).toHaveLength(21);
  });
});
