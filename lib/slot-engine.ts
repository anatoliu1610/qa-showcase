export const SYMBOLS = ['🍒', '🍋', '🔔', '⭐', '7️⃣'] as const;

export type SpinResult = {
  reels: [string, string, string];
  win: number;
  result: 'jackpot' | 'small' | 'none';
};

export function randomSymbol(): string {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export function spinEngine(bet: number): SpinResult {
  const reels: [string, string, string] = [randomSymbol(), randomSymbol(), randomSymbol()];
  const unique = new Set(reels).size;

  if (unique === 1) {
    return { reels, win: bet * 10, result: 'jackpot' };
  }

  if (unique === 2) {
    return { reels, win: bet * 2, result: 'small' };
  }

  return { reels, win: 0, result: 'none' };
}
