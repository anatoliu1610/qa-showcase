import type { SlotStateMachine } from '@/domain/SlotStateMachine';
import type { GameConfig } from '@/types/slot';

export class SpinController {
  constructor(
    private stateMachine: SlotStateMachine,
    private config: GameConfig
  ) {}

  startSpin(): void {
    if (!this.stateMachine.canSpin()) return;
    this.stateMachine.transition('Spinning');
    // Placeholder: real deterministic timing orchestration in step 2/3.
    void this.config.timing;
  }
}
