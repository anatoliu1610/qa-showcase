import type { GameConfig } from '@/types/slot';

export const gameConfig: GameConfig = {
  wildId: 'W',
  scatterId: 'S',
  symbols: [
    { id: 'A', kind: 'HIGH' },
    { id: 'K', kind: 'HIGH' },
    { id: 'Q', kind: 'HIGH' },
    { id: 'J', kind: 'HIGH' },
    { id: '10', kind: 'LOW' },
    { id: '9', kind: 'LOW' },
    { id: 'W', kind: 'WILD', substitutes: ['A', 'K', 'Q', 'J', '10', '9'] },
    { id: 'S', kind: 'SCATTER' }
  ],
  linePaytable: {
    A: { 3: 20, 4: 60, 5: 200 },
    K: { 3: 15, 4: 50, 5: 150 },
    Q: { 3: 10, 4: 40, 5: 120 },
    J: { 3: 8, 4: 30, 5: 100 },
    '10': { 3: 5, 4: 15, 5: 60 },
    '9': { 3: 5, 4: 15, 5: 60 }
  },
  scatterPaytable: { 2: 2, 3: 10, 4: 50, 5: 200 },
  paylines: [
    { id: 'L01', rows: [1, 1, 1, 1, 1] },
    { id: 'L02', rows: [0, 0, 0, 0, 0] },
    { id: 'L03', rows: [2, 2, 2, 2, 2] },
    { id: 'L04', rows: [0, 1, 2, 1, 0] },
    { id: 'L05', rows: [2, 1, 0, 1, 2] },
    { id: 'L06', rows: [0, 0, 1, 0, 0] },
    { id: 'L07', rows: [2, 2, 1, 2, 2] },
    { id: 'L08', rows: [1, 2, 2, 2, 1] },
    { id: 'L09', rows: [1, 0, 0, 0, 1] },
    { id: 'L10', rows: [0, 1, 1, 1, 0] },
    { id: 'L11', rows: [2, 1, 1, 1, 2] },
    { id: 'L12', rows: [0, 1, 0, 1, 0] },
    { id: 'L13', rows: [2, 1, 2, 1, 2] },
    { id: 'L14', rows: [1, 0, 1, 2, 1] },
    { id: 'L15', rows: [1, 2, 1, 0, 1] },
    { id: 'L16', rows: [0, 0, 1, 2, 2] },
    { id: 'L17', rows: [2, 2, 1, 0, 0] },
    { id: 'L18', rows: [0, 1, 2, 2, 2] },
    { id: 'L19', rows: [2, 1, 0, 0, 0] },
    { id: 'L20', rows: [1, 1, 0, 1, 1] },
    { id: 'L21', rows: [1, 1, 2, 1, 1] }
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
    stopDelayMs: 120,
    featureTriggerMs: 900,
    presentationMs: 900,
    lineStepMs: 450
  }
};
