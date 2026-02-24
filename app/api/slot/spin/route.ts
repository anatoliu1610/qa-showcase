import { NextResponse } from 'next/server';
import { getSession, saveSession } from '@/lib/slot-store';
import { spinEngine } from '@/lib/slot-engine';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { bet?: number };
  const bet = Number(body.bet ?? 0);

  if (!Number.isFinite(bet) || bet <= 0 || bet > 50) {
    return NextResponse.json({ ok: false, error: 'Bet must be between 1 and 50' }, { status: 400 });
  }

  const cookieHeader = request.headers.get('cookie') ?? '';
  const sessionId = cookieHeader
    .split(';')
    .map((v) => v.trim())
    .find((v) => v.startsWith('slot_session='))
    ?.split('=')[1];

  const session = getSession(sessionId);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'Session not found. Call /api/slot/init first.' }, { status: 401 });
  }

  if (session.balance < bet) {
    return NextResponse.json({ ok: false, error: 'Insufficient balance', balance: session.balance }, { status: 400 });
  }

  const outcome = spinEngine(bet);
  session.balance = session.balance - bet + outcome.win;
  saveSession(session);

  return NextResponse.json({
    ok: true,
    reels: outcome.reels,
    result: outcome.result,
    win: outcome.win,
    bet,
    balance: session.balance
  });
}
