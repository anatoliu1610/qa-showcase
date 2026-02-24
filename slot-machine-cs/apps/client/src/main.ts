import type { InitSessionResponse, SpinResponse } from '@slot/shared';

const apiBase = (import.meta as any).env?.VITE_API_BASE ?? 'http://localhost:8787';
const root = document.getElementById('app');
if (!root) throw new Error('no root');
const mount = root as HTMLDivElement;

let sessionId = '';
let balance = 0;

async function init() {
  const res = await fetch(`${apiBase}/session/init`, { method: 'POST' });
  const data = (await res.json()) as InitSessionResponse;
  sessionId = data.sessionId;
  balance = data.balance;
  render('Session initialized');
}

async function spin() {
  const res = await fetch(`${apiBase}/spin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, bet: 5 })
  });
  const data = (await res.json()) as SpinResponse;
  if (!data.ok) return;
  balance = data.balance;
  render(`Spin done. Stops: ${data.stops.join(', ')} Matrix mid: ${data.matrix.map((r: [string, string, string]) => r[1]).join(' | ')}`);
}

function render(status: string) {
  mount.innerHTML = `
    <h1>Slot Client-Server Prototype</h1>
    <p><b>API:</b> ${apiBase}</p>
    <p><b>Session:</b> ${sessionId || '-'}</p>
    <p><b>Balance:</b> ${balance}</p>
    <p>${status}</p>
    <button id="init">Init Session</button>
    <button id="spin" ${sessionId ? '' : 'disabled'}>Spin (bet=5)</button>
  `;
  document.getElementById('init')?.addEventListener('click', () => void init());
  document.getElementById('spin')?.addEventListener('click', () => void spin());
}

render('Ready');
