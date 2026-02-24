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
      <h1 className="text-3xl font-bold">{found.label}</h1>
      <p className="text-slate-700">{found.desc}</p>
      <Card><h2 className="mb-2 font-semibold">Mini Demo</h2><Widget /></Card>
      <Card><h2 className="mb-2 font-semibold">Evidence</h2>
        <ul className="space-y-2 text-sm">{artifacts.map((a)=><li key={a.path}><p className="font-medium">{a.title}</p><p className="text-slate-600">{a.path}</p><MarkdownView content={readText(a.path).slice(0,500)} /></li>)}</ul>
      </Card>
    </section>
  );
}
