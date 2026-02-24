export type SlotState =
  | 'Idle'
  | 'Spinning'
  | 'Stopping'
  | 'Evaluating'
  | 'BonusTrigger'
  | 'PresentingWin';

export class SlotStateMachine {
  private state: SlotState = 'Idle';

  get current(): SlotState {
    return this.state;
  }

  canSpin(): boolean {
    return this.state === 'Idle';
  }

  transition(next: SlotState): void {
    const allowed: Record<SlotState, SlotState[]> = {
      Idle: ['Spinning'],
      Spinning: ['Stopping'],
      Stopping: ['Evaluating'],
      Evaluating: ['BonusTrigger', 'PresentingWin'],
      BonusTrigger: ['PresentingWin'],
      PresentingWin: ['Idle']
    };

    if (!allowed[this.state].includes(next)) {
      throw new Error(`Invalid transition ${this.state} -> ${next}`);
    }
    this.state = next;
  }
}
