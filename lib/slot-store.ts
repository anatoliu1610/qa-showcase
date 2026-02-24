import { randomUUID } from 'crypto';

export type SlotSession = {
  id: string;
  balance: number;
  createdAt: number;
  updatedAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __slotStore: Map<string, SlotSession> | undefined;
}

const store = global.__slotStore ?? new Map<string, SlotSession>();
if (!global.__slotStore) global.__slotStore = store;

export function createSession(): SlotSession {
  const session: SlotSession = {
    id: randomUUID(),
    balance: 100,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  store.set(session.id, session);
  return session;
}

export function getSession(id?: string | null): SlotSession | null {
  if (!id) return null;
  return store.get(id) ?? null;
}

export function saveSession(session: SlotSession): void {
  session.updatedAt = Date.now();
  store.set(session.id, session);
}
