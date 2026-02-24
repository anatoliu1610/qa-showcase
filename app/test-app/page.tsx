'use client';

import { useEffect, useRef, useState } from 'react';
import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Section, Card } from '@/components/ui';

type SpinResponse = {
  ok: boolean;
  reels?: [string, string, string];
  result?: 'jackpot' | 'small' | 'none';
  win?: number;
  bet?: number;
  balance?: number;
  error?: string;
};

export default function TestAppPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const reelsRef = useRef<Text[]>([]);

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(5);
  const [result, setResult] = useState('Ready to spin');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setup() {
      await fetch('/api/slot/init', { method: 'GET' });

      const app = new Application();
      await app.init({ width: 520, height: 260, background: '#0b1024', antialias: true });
      appRef.current = app;

      if (mountRef.current) {
        mountRef.current.innerHTML = '';
        mountRef.current.appendChild(app.canvas);
      }

      const board = new Graphics();
      board.roundRect(10, 10, 500, 240, 24);
      board.fill({ color: 0x101a3d });
      board.stroke({ color: 0x2dd4bf, width: 2, alpha: 0.3 });
      app.stage.addChild(board);

      const reelContainer = new Container();
      reelContainer.x = 35;
      reelContainer.y = 45;
      app.stage.addChild(reelContainer);

      const style = new TextStyle({
        fontFamily: 'Inter, sans-serif',
        fontSize: 56,
        fill: 0xffffff
      });

      const texts: Text[] = [];

      for (let i = 0; i < 3; i++) {
        const slot = new Graphics();
        slot.roundRect(i * 155, 0, 140, 140, 18);
        slot.fill({ color: 0x0b1128 });
        slot.stroke({ color: 0x60a5fa, width: 2, alpha: 0.35 });
        reelContainer.addChild(slot);

        const symbol = new Text({ text: '⭐', style });
        symbol.anchor.set(0.5);
        symbol.x = i * 155 + 70;
        symbol.y = 70;
        reelContainer.addChild(symbol);
        texts.push(symbol);
      }

      reelsRef.current = texts;
    }

    setup();

    return () => {
      appRef.current?.destroy(true, { children: true });
      appRef.current = null;
    };
  }, []);

  async function spin() {
    if (loading) return;
    setLoading(true);
    setResult('Spinning...');

    const app = appRef.current;
    if (app) {
      const start = performance.now();
      const duration = 450;
      const onTick = () => {
        const t = Math.min(1, (performance.now() - start) / duration);
        reelsRef.current.forEach((r, i) => {
          r.y = 70 + Math.sin((t * 8 + i) * Math.PI) * 8;
          r.alpha = 0.55 + 0.45 * t;
        });
        if (t >= 1) app.ticker.remove(onTick);
      };
      app.ticker.add(onTick);
    }

    const response = await fetch('/api/slot/spin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bet })
    });

    const data = (await response.json()) as SpinResponse;

    if (!response.ok || !data.ok || !data.reels) {
      setResult(data.error ?? 'Spin failed');
      if (typeof data.balance === 'number') setBalance(data.balance);
      setLoading(false);
      return;
    }

    reelsRef.current.forEach((reel, i) => {
      reel.text = data.reels![i];
      reel.y = 70;
      reel.alpha = 1;
    });

    setBalance(data.balance ?? balance);
    if (data.result === 'jackpot') setResult(`Jackpot! +${data.win}`);
    else if (data.result === 'small') setResult(`Small win +${data.win}`);
    else setResult('No win');

    setLoading(false);
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <Section title="Slot Machine — Full Stack Test App (TypeScript + PixiJS)">
        <p className="text-slate-300">
          Real demo with frontend canvas rendering (PixiJS) and backend spin engine via API routes.
        </p>
      </Section>

      <Card className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-[#0f1735] p-3 text-slate-200">Balance: <strong>{balance}</strong></div>
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
          <div className="rounded-xl border border-white/10 bg-[#0f1735] p-3 text-slate-200 md:col-span-2">Status: <strong>{result}</strong></div>
        </div>

        <div ref={mountRef} className="overflow-x-auto rounded-xl border border-white/10 bg-[#070b19] p-3" aria-label="Pixi slot machine canvas" />

        <button
          onClick={spin}
          disabled={loading || bet < 1 || bet > 50}
          className="rounded-xl border border-cyan-400/30 bg-cyan-400/15 px-5 py-2 text-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Spinning...' : 'Spin'}
        </button>
      </Card>
    </main>
  );
}
