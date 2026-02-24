import type { SlotStateMachine } from '@/domain/SlotStateMachine';
import type { GameConfig, Grid5x3, SymbolId, WinEvaluation } from '@/types/slot';
import type { ResultGenerator } from '@/math/ResultGenerator';
import type { WinCalculator } from '@/math/WinCalculator';

export interface ReelPort {
  startSpin(): void;
  requestStop(target: [SymbolId, SymbolId, SymbolId]): void;
  update(deltaMs: number, timing: { accelMs: number; decelMs: number }): void;
  isIdle(): boolean;
}

export class SpinController {
  private spinElapsedMs = 0;
  private spinGrid: Grid5x3 | null = null;
  private stopRequested: boolean[] = [false, false, false, false, false];
  private presentationMs = 0;

  constructor(
    private readonly stateMachine: SlotStateMachine,
    private readonly config: GameConfig,
    private reels: ReelPort[],
    private readonly resultGenerator: ResultGenerator,
    private readonly winCalculator: WinCalculator,
    private readonly onEvaluation: (result: WinEvaluation) => void
  ) {}

  setReels(reels: ReelPort[]): void {
    this.reels = reels;
  }

  startSpin(): void {
    if (!this.stateMachine.canSpin()) return;

    this.spinElapsedMs = 0;
    this.presentationMs = 0;
    this.stopRequested = [false, false, false, false, false];

    const generated = this.resultGenerator.generate();
    this.spinGrid = generated.matrix;

    this.reels.forEach((r) => r.startSpin());
    this.stateMachine.transition('Spinning');
  }

  update(deltaMs: number): void {
    this.reels.forEach((r) => r.update(deltaMs, this.config.timing));

    if (this.stateMachine.current === 'Spinning') {
      this.spinElapsedMs += deltaMs;
      if (this.spinElapsedMs >= this.config.timing.accelMs + this.config.timing.steadyMs) {
        this.stateMachine.transition('Stopping');
      }
      return;
    }

    if (this.stateMachine.current === 'Stopping') {
      if (!this.spinGrid) return;

      this.spinElapsedMs += deltaMs;
      for (let i = 0; i < this.reels.length; i++) {
        const shouldRequest =
          !this.stopRequested[i] &&
          this.spinElapsedMs >= this.config.timing.accelMs + this.config.timing.steadyMs + i * this.config.timing.stopDelayMs;

        if (shouldRequest) {
          const column = this.spinGrid[i];
          if (!column) continue;
          const reel = this.reels[i];
          if (!reel) continue;
          reel.requestStop([column[0], column[1], column[2]]);
          this.stopRequested[i] = true;
        }
      }

      const allStopsRequested = this.stopRequested.every(Boolean);
      const allIdle = this.reels.every((r) => r.isIdle());
      if (allStopsRequested && allIdle) {
        this.stateMachine.transition('Evaluating');
      }
      return;
    }

    if (this.stateMachine.current === 'Evaluating') {
      if (!this.spinGrid) return;
      const result = this.winCalculator.evaluate(this.spinGrid);
      this.onEvaluation(result);
      this.stateMachine.transition('PresentingWin');
      return;
    }

    if (this.stateMachine.current === 'PresentingWin') {
      this.presentationMs += deltaMs;
      if (this.presentationMs >= 700) {
        this.stateMachine.transition('Idle');
      }
    }
  }
}
