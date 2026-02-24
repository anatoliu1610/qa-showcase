import { describe, expect, it } from 'vitest';
import { SeededRng } from '@/math/SeededRng';
import { ResultGenerator } from '@/math/ResultGenerator';
import { gameConfig } from '@/config/gameConfig';

describe('Seeded RNG regression', () => {
  it('produces deterministic stop sequence and matrix for fixed seed', () => {
    const rngA = new SeededRng(1337);
    const genA = new ResultGenerator(gameConfig, rngA);

    const rngB = new SeededRng(1337);
    const genB = new ResultGenerator(gameConfig, rngB);

    const a1 = genA.generate();
    const b1 = genB.generate();

    expect(a1.stops).toEqual(b1.stops);
    expect(a1.matrix).toEqual(b1.matrix);
  });
});
