import { describe, expect, it } from 'vitest';
import { gameConfig } from '@/config/gameConfig';

describe('config smoke', () => {
  it('contains 21 paylines', () => {
    expect(gameConfig.paylines).toHaveLength(21);
  });
});
