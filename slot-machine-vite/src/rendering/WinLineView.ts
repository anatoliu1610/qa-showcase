import { Container, Graphics } from 'pixi.js';
import type { Payline } from '@/types/slot';

export class WinLineView extends Container {
  private lineGraphicsPool: Graphics[] = [];

  constructor() {
    super();
    for (let i = 0; i < 24; i++) {
      const g = new Graphics();
      g.visible = false;
      this.addChild(g);
      this.lineGraphicsPool.push(g);
    }
  }

  clearAll(): void {
    this.lineGraphicsPool.forEach((g) => {
      g.clear();
      g.visible = false;
    });
  }

  showSequentialLine(line: Payline, reelCenters: Array<{ x: number; yTop: number; rowHeight: number }>, color = 0x22d3ee): void {
    this.clearAll();
    const g = this.lineGraphicsPool[0];
    if (!g) return;

    g.clear();
    g.moveTo(reelCenters[0]?.x ?? 0, (reelCenters[0]?.yTop ?? 0) + (line.rows[0] + 0.5) * (reelCenters[0]?.rowHeight ?? 0));
    for (let i = 1; i < line.rows.length; i++) {
      const c = reelCenters[i];
      if (!c) continue;
      const row = line.rows[i] ?? 1;
      g.lineTo(c.x, c.yTop + (row + 0.5) * c.rowHeight);
    }
    g.stroke({ color, width: 4, alpha: 0.9 });
    g.visible = true;
  }

  showAll(lines: Payline[], reelCenters: Array<{ x: number; yTop: number; rowHeight: number }>): void {
    this.clearAll();

    lines.forEach((line, idx) => {
      const g = this.lineGraphicsPool[idx];
      if (!g) return;
      const color = 0x60a5fa + (idx * 1337) % 0x4f4f;

      g.clear();
      g.moveTo(reelCenters[0]?.x ?? 0, (reelCenters[0]?.yTop ?? 0) + (line.rows[0] + 0.5) * (reelCenters[0]?.rowHeight ?? 0));
      for (let i = 1; i < line.rows.length; i++) {
        const c = reelCenters[i];
        if (!c) continue;
        const row = line.rows[i] ?? 1;
        g.lineTo(c.x, c.yTop + (row + 0.5) * c.rowHeight);
      }
      g.stroke({ color, width: 2, alpha: 0.45 });
      g.visible = true;
    });
  }
}
