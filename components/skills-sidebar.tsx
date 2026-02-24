import Link from 'next/link';
import { skillRoutes } from '@/data/skills';

export function SkillsSidebar() {
  return (
    <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <nav className="space-y-1" aria-label="Skills sections">
        <Link href="/skills" className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-slate-100">Dashboard</Link>
        {skillRoutes.map((s) => (
          <Link key={s.slug} href={`/skills/${s.slug}`} className="block rounded-md px-3 py-2 text-sm hover:bg-slate-100">
            {s.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
