import { skillRoutes } from '@/data/skills';
import Link from 'next/link';
import { Card } from '@/components/ui';

export default function SkillsDashboard() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Skills Web App</h1>
      <p className="text-slate-700">Interactive QA knowledge demos with evidence from repository artifacts.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {skillRoutes.map((s) => (
          <Link key={s.slug} href={`/skills/${s.slug}`}>
            <Card className="hover:bg-slate-50"><h2 className="font-semibold">{s.label}</h2><p className="text-sm text-slate-600">{s.desc}</p></Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
