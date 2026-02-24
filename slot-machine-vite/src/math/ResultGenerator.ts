import type { GameConfig, Grid5x3 } from '@/types/slot';
import type { RngProvider } from '@/math/RngProvider';

export interface SpinResultMatrix {
  stops: [number, number, number, number, number];
  matrix: Grid5x3;
}

export class ResultGenerator {
  constructor(
    private config: GameConfig,
    private rng: RngProvider
  ) {}

  generateStopIndices(): [number, number, number, number, number] {
    return this.config.reels.map((strip) => this.rng.nextInt(strip.length)) as [number, number, number, number, number];
  }

  matrixFromStops(stops: [number, number, number, number, number]): Grid5x3 {
    const matrix = this.config.reels.map((strip, reelIndex) => {
      const stop = stops[reelIndex] ?? 0;
      const len = strip.length;
      const top = strip[(stop - 1 + len) % len] ?? strip[0]!;
      const middle = strip[stop % len] ?? strip[0]!;
      const bottom = strip[(stop + 1) % len] ?? strip[0]!;
      return [top, middle, bottom] as [typeof top, typeof middle, typeof bottom];
    });

    return matrix as Grid5x3;
  }

  generate(): SpinResultMatrix {
    const stops = this.generateStopIndices();
    return { stops, matrix: this.matrixFromStops(stops) };
  }
}
