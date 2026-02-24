'use client';
import { useMemo, useState } from 'react';
import index from '@/public/content-index.json';
import { skillRoutes } from '@/data/skills';
import { Card } from '@/components/ui';

export default function CoveragePage() {
  const [filter, setFilter] = useState('all');
  const data = useMemo(() => (index as any[]).filter((i) => filter === 'all' || i.category === filter), [filter]);
  return (
    <main className="mx-auto max-w-6xl space-y-4 p-4 md:p-8">
      <h1 className="text-3xl font-bold">Coverage Map</h1>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')} className="rounded border px-3 py-1 text-sm">All</button>
        {skillRoutes.map((s) => <button key={s.slug} onClick={() => setFilter(s.slug)} className="rounded border px-3 py-1 text-sm">{s.label}</button>)}
      </div>
      <Card>
        <table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="p-2">Skill Area</th><th className="p-2">Artifact</th><th className="p-2">Path</th></tr></thead>
          <tbody>{data.map((r, i) => <tr key={i} className="border-b"><td className="p-2 capitalize">{r.category}</td><td className="p-2">{r.title}</td><td className="p-2"><a className="underline" href={`/skills/${r.category}`}>{r.path}</a></td></tr>)}</tbody>
        </table>
      </Card>
    </main>
  );
}
