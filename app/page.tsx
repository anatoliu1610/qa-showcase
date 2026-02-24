import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Phone, MapPin, Sparkles, BriefcaseBusiness, Wrench, Rocket, Contact } from 'lucide-react';
import { Badge, Card, Section } from '@/components/ui';
import { Reveal } from '@/components/reveal';

const competencies = [
  'Functional & Regression Testing',
  'Manual Test Case Creation & Documentation',
  'UI/UX Testing (Forms, Validations, Workflows, Business Logic)',
  'Bug Tracking & Defect Lifecycle (Jira, Similar Systems)',
  'Test Environment Setup & Release Validation',
  'Agile/Scrum Collaboration & Team Communication',
  'REST API Testing & Third-Party Integration Verification'
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
      <Reveal>
        <section className="rounded-3xl border border-white/10 bg-[#080d22]/90 p-8 shadow-[0_0_0_1px_rgba(56,189,248,.08),0_18px_60px_rgba(0,0,0,.45)]">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_220px]">
            <div>
              <p className="font-[var(--font-space)] text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">QA Engineer Portfolio</p>
              <h1 className="mt-2 text-4xl font-bold text-white text-balance">Oleksandr Pyavchyk</h1>
              <p className="mt-2 text-xl text-slate-300">QA Engineer | Quality Assurance Specialist</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1"><MapPin size={16} />Ukraine (Remote)</span>
                <a href="tel:+380639977874" className="inline-flex items-center gap-1 hover:text-cyan-200"><Phone size={16} />+380 63 997 78 74</a>
                <a href="mailto:pyavchik@gmail.com" className="inline-flex items-center gap-1 hover:text-cyan-200"><Mail size={16} />pyavchik@gmail.com</a>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a aria-label="GitHub" href="https://github.com/pyavchik" target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-2 hover:bg-white/10"><Github size={18} /></a>
                <a aria-label="LinkedIn" href="https://www.linkedin.com/in/pyavchik/" target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 bg-white/5 p-2 hover:bg-white/10"><Linkedin size={18} /></a>
                <Link href="/test-app" className="rounded-xl border border-cyan-400/30 bg-cyan-400/15 px-4 py-2 text-cyan-100 hover:bg-cyan-400/25">App for Test</Link>
                <Link href="/tests" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-slate-200 hover:bg-white/10">Tests</Link>
              </div>
            </div>
            <div className="mx-auto">
              <Image src="/profile.png" alt="Oleksandr Pyavchyk profile photo" width={220} height={220} className="rounded-2xl object-cover shadow-xl ring-1 ring-white/20" priority />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <Section title="About">
          <div className="flex items-start gap-2 text-slate-300"><Sparkles className="mt-0.5 h-4 w-4 text-cyan-300" /><p>QA Engineer with 3+ years of hands-on experience in manual testing of web-based and software systems. Skilled in identifying defects, creating test documentation, and collaborating with development teams in Agile environments. Detail-oriented professional with strong understanding of software testing lifecycle and test execution. Fluent in English with reliable communication skills.</p></div>
        </Section>
      </Reveal>

      <Reveal>
        <Section title="Core Competencies">
          <div className="flex flex-wrap gap-2">{competencies.map((c) => <Badge key={c}>{c}</Badge>)}</div>
        </Section>
      </Reveal>

      <Reveal>
        <Section title="Experience">
          <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-300"><BriefcaseBusiness className="h-4 w-4" />Professional Experience</div>
          <div className="space-y-3">
            <Card><h3 className="font-semibold text-white">QA Engineer | Innovation Group</h3><ul className="list-disc pl-5 text-sm text-slate-300"><li>Performed comprehensive manual testing of web applications and systems</li><li>Executed functional and regression testing cycles before releases</li><li>Tested system integrations and edge cases</li><li>Verified system behavior and performance during feature releases</li><li>Documented defects with clear reproduction steps and expected outcomes</li><li>Collaborated with developers to resolve issues and validate fixes</li></ul></Card>
            <Card><h3 className="font-semibold text-white">QA Engineer | Digicode</h3><ul className="list-disc pl-5 text-sm text-slate-300"><li>Created and executed manual tests for web applications and APIs</li><li>Prepared test cases and test scenarios from specifications</li><li>Performed UI testing on forms, validations, messages, and tables</li><li>Tested admin panels and internal systems</li><li>Verified third-party integrations</li><li>Maintained detailed test artifacts and results documentation</li></ul></Card>
            <Card><h3 className="font-semibold text-white">QA Engineer | Spetskodservis</h3><ul className="list-disc pl-5 text-sm text-slate-300"><li>Planned and executed manual test cycles ensuring compliance with requirements</li><li>Designed comprehensive test cases and prepared test data</li><li>Tested software against specifications and identified deviations</li><li>Logged defects and prepared final testing reports</li></ul></Card>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section title="Tools & Tech">
          <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-300"><Wrench className="h-4 w-4" />Tools & Technologies</div>
          <div className="grid gap-3 sm:grid-cols-2">{['Bug Tracking: Jira, Similar Issue Tracking Systems', 'Testing Documentation: Test Plans, Test Cases, Checklists', 'API Testing: REST APIs, Third-Party Integrations', 'Methodologies: Agile, Scrum', 'Languages: Ukrainian (Native), English (Fluent)'].map((t) => <Card key={t}>{t}</Card>)}</div>
        </Section>
      </Reveal>

      <Reveal>
        <Section title="Growth">
          <div className="flex items-start gap-2 text-slate-300"><Rocket className="mt-0.5 h-4 w-4 text-cyan-300" /><p>Experienced QA specialist with a proven track record of delivering reliable testing. Ready to apply manual testing expertise while developing skills in test automation and growing within a dynamic team. Interested in learning new technologies and contributing to the quality of innovative software solutions.</p></div>
        </Section>
      </Reveal>

      <Reveal>
        <Section title="Contacts">
          <div className="flex items-center gap-2 text-slate-300"><Contact className="h-4 w-4 text-cyan-300" /><p>Email: <a href="mailto:pyavchik@gmail.com" className="underline hover:text-cyan-200">pyavchik@gmail.com</a> · Phone: <a href="tel:+380639977874" className="underline hover:text-cyan-200">+380 63 997 78 74</a></p></div>
        </Section>
      </Reveal>
    </main>
  );
}
