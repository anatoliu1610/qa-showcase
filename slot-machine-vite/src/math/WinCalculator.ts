import type { GameConfig, Grid5x3, LineWin, Row, SymbolId, WinEvaluation } from '@/types/slot';

export class WinCalculator {
  constructor(private config: GameConfig) {}

  evaluate(grid: Grid5x3): WinEvaluation {
    const lineWins: LineWin[] = [];

    for (const line of this.config.paylines) {
      const lineSymbols = line.rows.map((row, reel) => grid[reel]?.[row] ?? this.config.scatterId);
      const lineWin = this.evaluateLine(line.id, line.rows, lineSymbols);
      if (lineWin) lineWins.push(lineWin);
    }

    const scatterCount = this.countScatter(grid);
    const scatterAmount = this.config.scatterPaytable[scatterCount as 2 | 3 | 4 | 5] ?? 0;

    const totalAmount = lineWins.reduce((sum, w) => sum + w.amount, 0) + scatterAmount;

    return {
      lineWins,
      scatterCount,
      scatterAmount,
      totalAmount
    };
  }

  private evaluateLine(
    lineId: string,
    rows: [Row, Row, Row, Row, Row],
    lineSymbols: SymbolId[]
  ): LineWin | null {
    const wild = this.config.wildId;
    const scatter = this.config.scatterId;

    const base = lineSymbols.find((s) => s !== wild && s !== scatter);
    if (!base) return null;

    let count = 0;
    const positions: Array<{ reel: number; row: Row }> = [];

    for (let reel = 0; reel < lineSymbols.length; reel++) {
      const symbol = lineSymbols[reel];
      if (symbol === scatter) break;

      if (symbol === base || symbol === wild) {
        count += 1;
        positions.push({ reel, row: rows[reel] ?? 1 });
      } else {
        break;
      }
    }

    if (count < 3) return null;

    const payout = this.config.linePaytable[base]?.[count as 3 | 4 | 5] ?? 0;
    if (payout <= 0) return null;

    return {
      lineId,
      symbol: base,
      count: count as 3 | 4 | 5,
      amount: payout,
      positions
    };
  }

  private countScatter(grid: Grid5x3): number {
    let count = 0;
    for (let reel = 0; reel < 5; reel++) {
      for (let row = 0; row < 3; row++) {
        if ((grid[reel]?.[row] ?? null) === this.config.scatterId) count += 1;
      }
    }
    return count;
  }
}
