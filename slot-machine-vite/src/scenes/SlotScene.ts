import { Application, Container, Graphics, Text } from 'pixi.js';
import type { Scene } from '@/app/SceneManager';
import { gameConfig } from '@/config/gameConfig';
import { ReelView } from '@/rendering/ReelView';
import { SlotStateMachine } from '@/domain/SlotStateMachine';
import { SpinController } from '@/domain/SpinController';
import { CryptoRng } from '@/math/CryptoRng';
import { SeededRng } from '@/math/SeededRng';
import { ResultGenerator } from '@/math/ResultGenerator';
import { WinCalculator } from '@/math/WinCalculator';
import { ScatterEffects } from '@/rendering/ScatterEffects';
import { WinLineView } from '@/rendering/WinLineView';
import { TweenManager } from '@/rendering/TweenManager';
import { EffectsLayer } from '@/rendering/EffectsLayer';
import type { Grid5x3, Row, WinEvaluation } from '@/types/slot';

export class SlotScene implements Scene {
  private root = new Container();
  private reels: ReelView[] = [];
  private spinButton = new Container();
  private statusLabel = new Text({ text: 'Idle', style: { fill: 0xcbd5e1, fontSize: 18 } });
  private creditLabel = new Text({ text: 'Win: 0', style: { fill: 0x7dd3fc, fontSize: 20 } });

  private readonly stateMachine = new SlotStateMachine();
  private readonly resultGenerator: ResultGenerator;
  private readonly spinController: SpinController;

  private readonly scatterEffects = new ScatterEffects();
  private readonly winLineView = new WinLineView();
  private readonly effectsLayer = new EffectsLayer(this.winLineView, this.scatterEffects);
  private readonly winTween = new TweenManager();

  private readonly debugTitle = new Text({ text: 'DEBUG', style: { fill: 0x94a3b8, fontSize: 12 } });
  private readonly debugState = new Text({ text: 'state: Idle', style: { fill: 0xe2e8f0, fontSize: 12 } });
  private readonly debugSeed = new Text({ text: 'rng: CryptoRng', style: { fill: 0xe2e8f0, fontSize: 12 } });
  private readonly debugTimeline = new Text({ text: 'timeline: -', style: { fill: 0x93c5fd, fontSize: 11 } });
  private readonly debugStops = new Text({ text: 'last stops: -', style: { fill: 0xa5b4fc, fontSize: 11 } });
  private readonly rngToggleText = new Text({ text: '[R] RNG: Crypto', style: { fill: 0xfef9c3, fontSize: 12 } });
  private readonly replayText = new Text({ text: '[P] Replay Last', style: { fill: 0xbbf7d0, fontSize: 12 } });
  private stateTimeline: string[] = [];
  private lastState = 'Idle';
  private rngMode: 'crypto' | 'seeded' = 'crypto';
  private seedValue = 1337;
  private lastStops: [number, number, number, number, number] | null = null;

  private presentationActive = false;
  private presentationElapsed = 0;
  private currentEval: WinEvaluation | null = null;
  private displayedWin = 0;
  private targetWin = 0;

  constructor(private app: Application) {
    this.resultGenerator = new ResultGenerator(gameConfig, new CryptoRng());
    const winCalculator = new WinCalculator(gameConfig);

    this.spinController = new SpinController(
      this.stateMachine,
      gameConfig,
      this.reels,
      this.resultGenerator,
      winCalculator,
      (result, grid, stops) => this.onEvaluation(result, grid, stops),
      (scatterCount) => this.onFeatureTrigger(scatterCount)
    );
  }

  mount(): void {
    this.createLayout();
    this.app.stage.addChild(this.root);
    window.addEventListener('keydown', this.handleDebugKeys);
  }

  unmount(): void {
    window.removeEventListener('keydown', this.handleDebugKeys);
    this.effectsLayer.clearAll();
    this.winTween.clear();
    this.root.destroy({ children: true });
    this.reels = [];
  }

  update(deltaMs: number): void {
    this.spinController.update(deltaMs);
    this.scatterEffects.update(deltaMs);
    this.winTween.update(deltaMs);

    this.statusLabel.text = `State: ${this.stateMachine.current}`;
    this.creditLabel.text = `Win: ${Math.round(this.displayedWin)}`;
    this.debugState.text = `state: ${this.stateMachine.current}`;

    if (this.lastState !== this.stateMachine.current) {
      this.lastState = this.stateMachine.current;
      this.stateTimeline.unshift(this.stateMachine.current);
      this.stateTimeline = this.stateTimeline.slice(0, 7);
      this.debugTimeline.text = `timeline: ${this.stateTimeline.join(' → ')}`;
    }

    if (this.presentationActive) {
      this.presentationElapsed += deltaMs;
      this.animateWinPresentation();
    }
  }

  private createLayout(): void {
    const title = new Text({ text: 'Slot Machine', style: { fill: 0xffffff, fontSize: 30 } });
    title.x = 24;
    title.y = 20;

    this.statusLabel.x = 24;
    this.statusLabel.y = 62;

    this.creditLabel.x = 24;
    this.creditLabel.y = 88;

    this.debugTitle.x = 560;
    this.debugTitle.y = 24;
    this.debugState.x = 560;
    this.debugState.y = 42;
    this.debugSeed.x = 560;
    this.debugSeed.y = 58;
    this.debugTimeline.x = 560;
    this.debugTimeline.y = 76;
    this.debugStops.x = 560;
    this.debugStops.y = 92;
    this.rngToggleText.x = 560;
    this.rngToggleText.y = 112;
    this.replayText.x = 560;
    this.replayText.y = 128;

    this.root.addChild(
      title,
      this.statusLabel,
      this.creditLabel,
      this.debugTitle,
      this.debugState,
      this.debugSeed,
      this.debugTimeline,
      this.debugStops,
      this.rngToggleText,
      this.replayText
    );

    const board = new Graphics();
    board.roundRect(24, 140, 740, 320, 22);
    board.fill({ color: 0x0b1128 });
    board.stroke({ color: 0x60a5fa, alpha: 0.35, width: 2 });
    this.root.addChild(board);

    this.reels = gameConfig.reels.map((strip, i) => {
      const reel = new ReelView({ strip, widthPx: 130, symbolHeight: 90 });
      reel.x = 42 + i * 145;
      reel.y = 165;
      this.root.addChild(reel);
      return reel;
    });

    this.spinController.setReels(this.reels);

    this.effectsLayer.zIndex = 30;
    this.root.sortableChildren = true;
    this.root.addChild(this.effectsLayer);

    this.createSpinButton();
  }

  private createSpinButton(): void {
    const bg = new Graphics();
    bg.roundRect(24, 490, 180, 56, 14);
    bg.fill({ color: 0x0891b2, alpha: 0.22 });
    bg.stroke({ color: 0x22d3ee, width: 2, alpha: 0.5 });

    const label = new Text({ text: 'SPIN', style: { fill: 0xe0f2fe, fontSize: 24, fontWeight: '700' } });
    label.x = 86;
    label.y = 503;

    this.spinButton.eventMode = 'static';
    this.spinButton.cursor = 'pointer';
    this.spinButton.addChild(bg, label);
    this.spinButton.on('pointertap', () => {
      this.presentationActive = false;
      this.presentationElapsed = 0;
      this.currentEval = null;
      this.targetWin = 0;
      this.displayedWin = 0;
      this.effectsLayer.clearAll();
      this.spinController.startSpin();
    });

    this.root.addChild(this.spinButton);
  }

  private onEvaluation(
    result: WinEvaluation,
    grid: Grid5x3,
    stops: [number, number, number, number, number]
  ): void {
    this.lastStops = stops;
    this.debugStops.text = `last stops: ${stops.join(', ')}`;
    this.currentEval = result;
    this.presentationActive = true;
    this.presentationElapsed = 0;
    this.targetWin = result.totalAmount;

    this.emitAudio('audio:win_evaluate', { totalWin: result.totalAmount });

    this.winTween.to({
      duration: gameConfig.timing.steadyMs,
      from: 0,
      to: this.targetWin,
      onUpdate: (value) => {
        this.displayedWin = value;
      }
    });

    const scatterPositions = this.getScatterPositions(grid);
    scatterPositions.forEach((pos) => this.scatterEffects.playLandImpact(pos));
    this.scatterEffects.setIdle(scatterPositions);

    if (scatterPositions.length > 0) {
      this.scatterEffects.playHighlightAll(scatterPositions, () => {
        this.emitAudio('audio:scatter_highlight', { count: scatterPositions.length });
      });
      this.emitAudio('audio:scatter_land', { count: scatterPositions.length });
    }
  }

  private animateWinPresentation(): void {
    if (!this.currentEval) return;

    const lineStep = 450;
    const lineIndex = Math.floor(this.presentationElapsed / lineStep);

    if (this.currentEval.lineWins.length > 0 && lineIndex < this.currentEval.lineWins.length) {
      const lineWin = this.currentEval.lineWins[lineIndex];
      if (!lineWin) return;
      const line = gameConfig.paylines.find((p) => p.id === lineWin.lineId);
      if (line) {
        this.winLineView.showSequentialLine(line, this.getReelCenters());
        this.highlightLinePositions(lineWin.positions);
      }
      return;
    }

    if (this.currentEval.lineWins.length > 0 && this.presentationElapsed < lineStep * (this.currentEval.lineWins.length + 2)) {
      const lines = this.currentEval.lineWins
        .map((w) => gameConfig.paylines.find((p) => p.id === w.lineId))
        .filter((v): v is NonNullable<typeof v> => Boolean(v));
      this.winLineView.showAll(lines, this.getReelCenters());
      this.highlightAllWinningPositions();
      return;
    }

    this.presentationActive = false;
  }

  private getScatterPositions(grid: Grid5x3): Array<{ x: number; y: number }> {
    const out: Array<{ x: number; y: number }> = [];
    for (let reel = 0; reel < 5; reel++) {
      for (let row = 0; row < 3; row++) {
        if ((grid[reel]?.[row] ?? null) === gameConfig.scatterId) {
          out.push(this.cellCenter(reel, row as Row));
        }
      }
    }
    return out;
  }

  private getReelCenters(): Array<{ x: number; yTop: number; rowHeight: number }> {
    return this.reels.map((reel) => ({
      x: reel.x + reel.widthPx / 2,
      yTop: reel.y,
      rowHeight: reel.symbolHeight
    }));
  }

  private cellCenter(reelIndex: number, row: Row): { x: number; y: number } {
    const reel = this.reels[reelIndex];
    if (!reel) return { x: 0, y: 0 };
    return {
      x: reel.x + reel.widthPx / 2,
      y: reel.y + (row + 0.5) * reel.symbolHeight
    };
  }

  private clearHighlights(): void {
    this.effectsLayer.symbolHighlightLayer.removeChildren().forEach((c) => c.destroy());
  }

  private highlightLinePositions(positions: Array<{ reel: number; row: Row }>): void {
    this.clearHighlights();
    positions.forEach((p) => {
      const center = this.cellCenter(p.reel, p.row);
      const g = new Graphics();
      g.roundRect(center.x - 58, center.y - 38, 116, 76, 12);
      g.stroke({ color: 0xfacc15, width: 3, alpha: 0.9 });
      this.effectsLayer.symbolHighlightLayer.addChild(g);
    });
  }

  private highlightAllWinningPositions(): void {
    this.clearHighlights();
    if (!this.currentEval) return;
    const unique = new Set<string>();
    this.currentEval.lineWins.forEach((line) => {
      line.positions.forEach((p) => unique.add(`${p.reel}:${p.row}`));
    });

    unique.forEach((key) => {
      const [reelStr, rowStr] = key.split(':');
      const reel = Number(reelStr);
      const row = Number(rowStr) as Row;
      const center = this.cellCenter(reel, row);
      const g = new Graphics();
      g.roundRect(center.x - 56, center.y - 36, 112, 72, 12);
      g.stroke({ color: 0x22d3ee, width: 2, alpha: 0.7 });
      this.effectsLayer.symbolHighlightLayer.addChild(g);
    });
  }

  private onFeatureTrigger(scatterCount: number): void {
    this.emitAudio('feature:trigger', { scatterCount, feature: 'scatter-bonus' });
    this.emitAudio('audio:feature_trigger', { scatterCount });
  }

  private handleDebugKeys = (event: KeyboardEvent): void => {
    if (event.key.toLowerCase() === 'r') {
      this.rngMode = this.rngMode === 'crypto' ? 'seeded' : 'crypto';
      if (this.rngMode === 'crypto') {
        this.resultGenerator.setRng(new CryptoRng());
        this.debugSeed.text = 'rng: CryptoRng';
        this.rngToggleText.text = '[R] RNG: Crypto';
      } else {
        this.resultGenerator.setRng(new SeededRng(this.seedValue));
        this.debugSeed.text = `rng: SeededRng(${this.seedValue})`;
        this.rngToggleText.text = '[R] RNG: Seeded';
      }
    }

    if (event.key.toLowerCase() === 'p' && this.lastStops) {
      this.resultGenerator.queueForcedStops(this.lastStops);
      this.replayText.text = `[P] Replay queued: ${this.lastStops.join('-')}`;
    }
  };

  private emitAudio(eventName: string, detail: Record<string, unknown>): void {
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
}
