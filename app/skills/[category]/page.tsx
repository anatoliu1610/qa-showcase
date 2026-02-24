import { notFound } from 'next/navigation';
import { skillRoutes } from '@/data/skills';
import { getIndex, readText } from '@/lib/content';
import { Card } from '@/components/ui';
import { MarkdownView } from '@/components/markdown-view';
import { ApiWidget, ArchitectureWidget, BugsWidget, ChecklistWidget, DbWidget, LogsWidget, ProcessWidget, TrackerWidget } from '@/components/widgets';
import type { ComponentType } from 'react';

const map: Record<string, ComponentType> = {
  architecture: ArchitectureWidget,
  'web-protocols': ChecklistWidget,
  api: ApiWidget,
  db: DbWidget,
  logs: LogsWidget,
  process: ProcessWidget,
  bugs: BugsWidget,
  tracker: TrackerWidget
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const found = skillRoutes.find((s) => s.slug === category);
  if (!found) return notFound();
  const Widget = map[category];
  const artifacts = getIndex().filter((a) => a.category === category).slice(0, 3);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-white">{found.label}</h1>
      <p className="text-slate-300">{found.desc}</p>
      <Card>
        <h2 className="mb-2 font-semibold text-white">Mini Demo</h2>
        <Widget />
      </Card>
      <Card>
        <h2 className="mb-2 font-semibold text-white">Evidence</h2>
        <ul className="space-y-3 text-sm">
          {artifacts.map((a) => (
            <li key={a.path} className="rounded-xl border border-white/10 bg-[#0f1735] p-3">
              <p className="font-medium text-slate-100">{a.title}</p>
              <p className="text-slate-400">{a.path}</p>
              <MarkdownView content={readText(a.path).slice(0, 500)} />
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
