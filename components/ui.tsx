import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#080d22]/90 p-6 shadow-[0_0_0_1px_rgba(56,189,248,.08),0_18px_50px_rgba(0,0,0,.45)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(56,189,248,.22),0_26px_60px_rgba(0,0,0,.55)] motion-reduce:transform-none">
      <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.24),transparent_40%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <h2 className="relative mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">{title}</h2>
      <div className="relative">{children}</div>
    </section>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1128]/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.03)] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-cyan-300/30 motion-reduce:transform-none', className)}><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(56,189,248,0.16),transparent_35%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" /> <div className="relative">{children}</div></div>;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-xl border border-white/10 bg-[#111936] px-3 py-1.5 text-sm text-slate-200 transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-[#162147] motion-reduce:transform-none">{children}</span>;
}

export function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center rounded-xl border border-cyan-400/30 bg-cyan-400/15 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-400/25">
      {children}
    </Link>
  );
}
