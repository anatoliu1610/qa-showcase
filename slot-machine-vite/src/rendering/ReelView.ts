import { Container, Graphics, Text, type TextStyleOptions } from 'pixi.js';
import type { SymbolId } from '@/types/slot';

const VISIBLE_ROWS = 3;
const BUFFER_ROWS = 2;
const TOTAL_ROWS = VISIBLE_ROWS + BUFFER_ROWS * 2;

export class ReelView extends Container {
  readonly widthPx: number;
  readonly symbolHeight: number;
  readonly viewportHeight: number;

  private readonly strip: SymbolId[];
  private readonly symbols: Text[] = [];
  private readonly stripContainer = new Container();
  private readonly maskGraphics = new Graphics();

  private stripIndex = 0;
  private offsetPx = 0;
  private mode: 'idle' | 'spinning' | 'stopping' = 'idle';
  private speedPxPerSec = 0;
  private stopElapsedMs = 0;
  private pendingStop: [SymbolId, SymbolId, SymbolId] | null = null;

  constructor(options: {
    strip: SymbolId[];
    widthPx?: number;
    symbolHeight?: number;
    textStyle?: TextStyleOptions;
  }) {
    super();
    this.strip = options.strip;
    this.widthPx = options.widthPx ?? 130;
    this.symbolHeight = options.symbolHeight ?? 90;
    this.viewportHeight = this.symbolHeight * VISIBLE_ROWS;

    this.addChild(this.stripContainer);
    this.addChild(this.maskGraphics);
    this.mask = this.maskGraphics;

    this.maskGraphics.roundRect(0, 0, this.widthPx, this.viewportHeight, 16);
    this.maskGraphics.fill({ color: 0xffffff });

    const style: TextStyleOptions = {
      fill: 0xffffff,
      fontFamily: 'Inter, sans-serif',
      fontSize: 42,
      ...(options.textStyle ?? {})
    };

    for (let i = 0; i < TOTAL_ROWS; i++) {
      const text = new Text({ text: this.nextSymbol(), style });
      text.anchor.set(0.5);
      this.symbols.push(text);
      this.stripContainer.addChild(text);
    }

    this.repositionSymbols();
  }

  startSpin(): void {
    this.mode = 'spinning';
    this.pendingStop = null;
    this.stopElapsedMs = 0;
  }

  requestStop(target: [SymbolId, SymbolId, SymbolId]): void {
    this.pendingStop = target;
    this.mode = 'stopping';
    this.stopElapsedMs = 0;
  }

  update(deltaMs: number, timing: { accelMs: number; decelMs: number }): void {
    const dt = deltaMs / 1000;

    if (this.mode === 'spinning') {
      const accelPerSec = 1700 / Math.max(0.001, timing.accelMs / 1000);
      this.speedPxPerSec = Math.min(1700, this.speedPxPerSec + accelPerSec * dt);
      this.advance(dt);
      return;
    }

    if (this.mode === 'stopping') {
      this.stopElapsedMs += deltaMs;
      const decelFactor = Math.max(0, 1 - this.stopElapsedMs / Math.max(1, timing.decelMs));
      this.speedPxPerSec = Math.max(80, 1700 * decelFactor);
      this.advance(dt);

      if (this.stopElapsedMs >= timing.decelMs && this.pendingStop) {
        this.snapToResult(this.pendingStop);
        this.pendingStop = null;
        this.mode = 'idle';
        this.speedPxPerSec = 0;
      }
    }
  }

  isIdle(): boolean {
    return this.mode === 'idle';
  }

  private advance(dt: number): void {
    this.offsetPx += this.speedPxPerSec * dt;

    while (this.offsetPx >= this.symbolHeight) {
      this.offsetPx -= this.symbolHeight;
      const first = this.symbols.shift();
      if (!first) break;
      first.text = this.nextSymbol();
      this.symbols.push(first);
    }

    this.repositionSymbols();
  }

  private repositionSymbols(): void {
    const baseY = -BUFFER_ROWS * this.symbolHeight + this.offsetPx;
    for (let i = 0; i < this.symbols.length; i++) {
      const symbol = this.symbols[i];
      if (!symbol) continue;
      symbol.x = this.widthPx / 2;
      symbol.y = baseY + i * this.symbolHeight + this.symbolHeight / 2;
    }
  }

  private nextSymbol(): SymbolId {
    const value = this.strip[this.stripIndex % this.strip.length] ?? this.strip[0] ?? 'A';
    this.stripIndex = (this.stripIndex + 1) % this.strip.length;
    return value;
  }

  private snapToResult(target: [SymbolId, SymbolId, SymbolId]): void {
    this.offsetPx = 0;

    const centerStart = BUFFER_ROWS;
    this.setSymbolText(centerStart - 1, this.nextSymbol());
    this.setSymbolText(centerStart, target[0]);
    this.setSymbolText(centerStart + 1, target[1]);
    this.setSymbolText(centerStart + 2, target[2]);
    this.setSymbolText(centerStart + 3, this.nextSymbol());

    this.repositionSymbols();
  }

  private setSymbolText(index: number, value: SymbolId): void {
    const item = this.symbols[index];
    if (!item) return;
    item.text = value;
  }
}
