import type { GameConfig } from '@/types/slot';

export const gameConfig: GameConfig = {
  wildId: 'W',
  scatterId: 'S',
  paylines: [
    { id: 'L01', rows: [1, 1, 1, 1, 1] }, { id: 'L02', rows: [0, 0, 0, 0, 0] }, { id: 'L03', rows: [2, 2, 2, 2, 2] },
    { id: 'L04', rows: [0, 1, 2, 1, 0] }, { id: 'L05', rows: [2, 1, 0, 1, 2] }, { id: 'L06', rows: [0, 0, 1, 0, 0] },
    { id: 'L07', rows: [2, 2, 1, 2, 2] }, { id: 'L08', rows: [1, 2, 2, 2, 1] }, { id: 'L09', rows: [1, 0, 0, 0, 1] },
    { id: 'L10', rows: [0, 1, 1, 1, 0] }, { id: 'L11', rows: [2, 1, 1, 1, 2] }, { id: 'L12', rows: [0, 1, 0, 1, 0] },
    { id: 'L13', rows: [2, 1, 2, 1, 2] }, { id: 'L14', rows: [1, 0, 1, 2, 1] }, { id: 'L15', rows: [1, 2, 1, 0, 1] },
    { id: 'L16', rows: [0, 0, 1, 2, 2] }, { id: 'L17', rows: [2, 2, 1, 0, 0] }, { id: 'L18', rows: [0, 1, 2, 2, 2] },
    { id: 'L19', rows: [2, 1, 0, 0, 0] }, { id: 'L20', rows: [1, 1, 0, 1, 1] }, { id: 'L21', rows: [1, 1, 2, 1, 1] }
  ],
  reels: [
    ['A', 'K', 'Q', '10', 'W', '9', 'A', 'S', 'K'],
    ['K', 'Q', 'J', 'S', '10', '9', 'A', 'W', 'K'],
    ['Q', 'J', '10', '9', 'A', 'K', 'S', 'W', 'Q'],
    ['J', '10', '9', 'A', 'K', 'Q', 'W', 'S', 'J'],
    ['10', '9', 'A', 'K', 'Q', 'J', 'S', 'W', '10']
  ],
  timing: {
    accelMs: 220,
    steadyMs: 700,
    decelMs: 480,
    stopDelayMs: 120
  }
};
