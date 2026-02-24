import Link from 'next/link';
import { skillRoutes } from '@/data/skills';

export function SkillsSidebar() {
  return (
    <aside className="rounded-2xl border border-white/10 bg-[#0b1128]/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
      <nav className="space-y-1" aria-label="Skills sections">
        <Link href="/skills" className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10">
          Dashboard
        </Link>
        {skillRoutes.map((s) => (
          <Link
            key={s.slug}
            href={`/skills/${s.slug}`}
            className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
          >
            {s.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
