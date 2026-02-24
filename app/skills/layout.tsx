import { SkillsSidebar } from '@/components/skills-sidebar';

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto grid max-w-6xl gap-6 p-4 md:grid-cols-[260px_1fr] md:p-8">
      <SkillsSidebar />
      <div className="space-y-4">{children}</div>
    </main>
  );
}
