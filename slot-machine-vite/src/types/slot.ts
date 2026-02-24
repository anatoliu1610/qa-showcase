export type SymbolId = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | 'W' | 'S';
export type Row = 0 | 1 | 2;

export interface Payline {
  id: string;
  rows: [Row, Row, Row, Row, Row];
}

export interface TimingConfig {
  accelMs: number;
  steadyMs: number;
  decelMs: number;
  stopDelayMs: number;
}

export interface GameConfig {
  paylines: Payline[];
  reels: SymbolId[][];
  timing: TimingConfig;
  wildId: SymbolId;
  scatterId: SymbolId;
}
