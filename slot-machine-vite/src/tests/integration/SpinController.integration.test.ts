import { describe, expect, it } from 'vitest';
import { SlotStateMachine } from '@/domain/SlotStateMachine';
import { SpinController, type ReelPort } from '@/domain/SpinController';
import { gameConfig } from '@/config/gameConfig';
import { ResultGenerator } from '@/math/ResultGenerator';
import { SeededRng } from '@/math/SeededRng';
import { WinCalculator } from '@/math/WinCalculator';

class FakeReel implements ReelPort {
  private idle = true;

  startSpin(): void {
    this.idle = false;
  }

  requestStop(): void {
    this.idle = true;
  }

  update(): void {}

  isIdle(): boolean {
    return this.idle;
  }
}

describe('SpinController integration', () => {
  it('runs full state flow to Idle and evaluates once', () => {
    const sm = new SlotStateMachine();
    const reels = [new FakeReel(), new FakeReel(), new FakeReel(), new FakeReel(), new FakeReel()];
    const resultGenerator = new ResultGenerator(gameConfig, new SeededRng(42));
    const winCalculator = new WinCalculator(gameConfig);

    let evaluated = 0;

    const controller = new SpinController(
      sm,
      gameConfig,
      reels,
      resultGenerator,
      winCalculator,
      () => {
        evaluated += 1;
      }
    );

    controller.startSpin();
    expect(sm.current).toBe('Spinning');

    // advance enough time for spin -> stopping -> evaluate -> presenting -> idle
    for (let i = 0; i < 120; i++) {
      controller.update(50);
    }

    expect(evaluated).toBe(1);
    expect(sm.current).toBe('Idle');
  });
});
