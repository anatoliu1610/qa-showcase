'use client';

import { useMemo, useState } from 'react';
import { Card, Section } from '@/components/ui';

const symbols = ['🍒', '🍋', '🔔', '⭐', '7️⃣'];

function randomRow() {
  return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
}

export default function TestAppPage() {
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(5);
  const [row, setRow] = useState(['🍒', '🍋', '⭐']);
  const [lastWin, setLastWin] = useState(0);

  const canSpin = balance >= bet && bet > 0;

  const result = useMemo(() => {
    const allSame = row.every((s) => s === row[0]);
    const twoSame = new Set(row).size === 2;
    if (allSame) return 'jackpot';
    if (twoSame) return 'small';
    return 'none';
  }, [row]);

  function spin() {
    if (!canSpin) return;
    const next = randomRow();
    setRow(next);
    let win = 0;
    if (next[0] === next[1] && next[1] === next[2]) win = bet * 10;
    else if (new Set(next).size === 2) win = bet * 2;
    setLastWin(win);
    setBalance((b) => b - bet + win);
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <Section title="Slot Machine Test App">
        <p className="mb-4 text-slate-300">Demo app for QA practice: functional checks, UI states, edge cases, and calculations.</p>
        <Card className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-[#0f1735] p-3 text-slate-200">Balance: <strong>{balance}</strong></div>
            <div className="rounded-xl border border-white/10 bg-[#0f1735] p-3 text-slate-200">Last win: <strong>{lastWin}</strong></div>
            <label className="rounded-xl border border-white/10 bg-[#0f1735] p-3 text-slate-200">
              Bet:
              <input
                type="number"
                min={1}
                max={50}
                value={bet}
                onChange={(e) => setBet(Number(e.target.value || 0))}
                className="ml-2 w-20 rounded-md border border-white/20 bg-[#111936] px-2 py-1 text-slate-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {row.map((s, i) => (
              <div key={`${s}-${i}`} className="rounded-2xl border border-cyan-300/30 bg-[#101a3d] py-8 text-center text-4xl shadow-inner">
                {s}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={spin}
              disabled={!canSpin}
              className="rounded-xl border border-cyan-400/30 bg-cyan-400/15 px-5 py-2 text-cyan-100 hover:bg-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Spin
            </button>
            <span className="text-sm text-slate-300">
              Result: {result === 'jackpot' ? 'Jackpot 🎉' : result === 'small' ? 'Small win ✅' : 'No win'}
            </span>
          </div>
        </Card>
      </Section>
    </main>
  );
}
