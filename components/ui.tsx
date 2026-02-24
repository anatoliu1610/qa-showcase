import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="rounded-3xl border border-white/10 bg-[#080d22]/90 p-6 shadow-[0_0_0_1px_rgba(56,189,248,.08),0_18px_50px_rgba(0,0,0,.45)]">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">{title}</h2>
      {children}
    </section>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('rounded-2xl border border-white/10 bg-[#0b1128]/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.03)]', className)}>{children}</div>;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-xl border border-white/10 bg-[#111936] px-3 py-1.5 text-sm text-slate-200">{children}</span>;
}

export function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center rounded-xl border border-cyan-400/30 bg-cyan-400/15 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-400/25">
      {children}
    </Link>
  );
}
