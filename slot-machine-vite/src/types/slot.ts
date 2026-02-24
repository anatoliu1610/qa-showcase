export type SymbolId = 'A' | 'K' | 'Q' | 'J' | '10' | '9' | 'W' | 'S';
export type Row = 0 | 1 | 2;

export interface Payline {
  id: string;
  rows: [Row, Row, Row, Row, Row];
}

export interface SymbolDef {
  id: SymbolId;
  kind: 'HIGH' | 'LOW' | 'WILD' | 'SCATTER';
  substitutes?: SymbolId[];
}

export interface TimingConfig {
  accelMs: number;
  steadyMs: number;
  decelMs: number;
  stopDelayMs: number;
  featureTriggerMs: number;
  presentationMs: number;
  lineStepMs: number;
}

export interface GameConfig {
  paylines: Payline[];
  reels: SymbolId[][];
  timing: TimingConfig;
  wildId: SymbolId;
  scatterId: SymbolId;
  symbols: SymbolDef[];
  linePaytable: Record<string, Partial<Record<3 | 4 | 5, number>>>;
  scatterPaytable: Partial<Record<2 | 3 | 4 | 5, number>>;
}

export type Grid5x3 = [
  [SymbolId, SymbolId, SymbolId],
  [SymbolId, SymbolId, SymbolId],
  [SymbolId, SymbolId, SymbolId],
  [SymbolId, SymbolId, SymbolId],
  [SymbolId, SymbolId, SymbolId]
];

export interface LineWin {
  lineId: string;
  symbol: SymbolId;
  count: 3 | 4 | 5;
  amount: number;
  positions: Array<{ reel: number; row: Row }>;
}

export interface WinEvaluation {
  lineWins: LineWin[];
  scatterCount: number;
  scatterAmount: number;
  totalAmount: number;
}
