import { NextResponse } from 'next/server';
import { createSession, getSession } from '@/lib/slot-store';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const current = cookieHeader
    .split(';')
    .map((v) => v.trim())
    .find((v) => v.startsWith('slot_session='))
    ?.split('=')[1];

  let session = getSession(current);
  const response = NextResponse.json({ ok: true, balance: session?.balance ?? 100 });

  if (!session) {
    session = createSession();
    response.cookies.set('slot_session', session.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/'
    });
    response.headers.set('x-slot-session', session.id);
    response.headers.set('x-slot-balance', String(session.balance));
  }

  return response;
}
