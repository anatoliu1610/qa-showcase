import Fastify from 'fastify';
import type { InitSessionResponse, SpinRequest, SpinResponse, SymbolId } from '@slot/shared';
import { randomUUID } from 'node:crypto';

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 8787);

type Session = { id: string; balance: number };
const sessions = new Map<string, Session>();

const strips: SymbolId[][] = [
  ['A', 'K', 'Q', '10', 'W', '9', 'A', 'S', 'K'],
  ['K', 'Q', 'J', 'S', '10', '9', 'A', 'W', 'K'],
  ['Q', 'J', '10', '9', 'A', 'K', 'S', 'W', 'Q'],
  ['J', '10', '9', 'A', 'K', 'Q', 'W', 'S', 'J'],
  ['10', '9', 'A', 'K', 'Q', 'J', 'S', 'W', '10']
];

function spinMatrix(stops: [number, number, number, number, number]) {
  return strips.map((strip, i) => {
    const stop = stops[i] ?? 0;
    const len = strip.length;
    return [
      strip[(stop - 1 + len) % len] ?? strip[0]!,
      strip[stop % len] ?? strip[0]!,
      strip[(stop + 1) % len] ?? strip[0]!
    ] as [SymbolId, SymbolId, SymbolId];
  }) as SpinResponse['matrix'];
}

app.get('/health', async () => ({ ok: true }));

app.post('/session/init', async (): Promise<InitSessionResponse> => {
  const id = randomUUID();
  sessions.set(id, { id, balance: 100 });
  return { ok: true, sessionId: id, balance: 100 };
});

app.post('/spin', async (req, reply): Promise<SpinResponse> => {
  const body = req.body as SpinRequest;
  const session = sessions.get(body.sessionId);
  if (!session) return reply.code(404).send({ ok: false, error: 'Session not found' } as never);
  if (body.bet <= 0 || body.bet > 50 || session.balance < body.bet) {
    return reply.code(400).send({ ok: false, error: 'Invalid bet or insufficient balance' } as never);
  }

  const stops: [number, number, number, number, number] = [0, 1, 2, 3, 4].map((i) =>
    Math.floor(Math.random() * strips[i]!.length)
  ) as [number, number, number, number, number];

  const matrix = spinMatrix(stops);
  const totalWin = 0;
  session.balance = session.balance - body.bet + totalWin;

  return {
    ok: true,
    sessionId: session.id,
    balance: session.balance,
    bet: body.bet,
    stops,
    matrix,
    totalWin
  };
});

app.listen({ port, host: '0.0.0.0' }).then(() => {
  app.log.info(`slot server listening on :${port}`);
});
