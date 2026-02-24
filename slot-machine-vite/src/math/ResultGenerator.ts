import type { GameConfig } from '@/types/slot';
import type { RngProvider } from '@/math/RngProvider';

export class ResultGenerator {
  constructor(
    private config: GameConfig,
    private rng: RngProvider
  ) {}

  generateStopIndices(): number[] {
    return this.config.reels.map((strip) => this.rng.nextInt(strip.length));
  }
}
