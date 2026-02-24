export type SlotState = 'Idle' | 'Spinning' | 'Stopping' | 'Evaluating' | 'PresentingWin';

export class SlotStateMachine {
  private state: SlotState = 'Idle';

  get current(): SlotState {
    return this.state;
  }

  canSpin(): boolean {
    return this.state === 'Idle';
  }

  transition(next: SlotState): void {
    this.state = next;
  }
}
