import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Badge, Card, Section } from '@/components/ui';
import { Reveal } from '@/components/reveal';

const competencies = [
  'Functional & Regression Testing','Manual Test Case Creation & Documentation','UI/UX Testing (Forms, Validations, Workflows, Business Logic)','Bug Tracking & Defect Lifecycle (Jira, Similar Systems)','Test Environment Setup & Release Validation','Agile/Scrum Collaboration & Team Communication','REST API Testing & Third-Party Integration Verification'
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
      <Reveal><section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_220px]">
          <div>
            <p className="font-[var(--font-space)] text-sm font-semibold text-slate-600">QA Engineer Portfolio</p>
            <h1 className="mt-2 text-4xl font-bold text-balance">Oleksandr Pyavchyk</h1>
            <p className="mt-2 text-xl text-slate-700">QA Engineer | Quality Assurance Specialist</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1"><MapPin size={16}/>Ukraine (Remote)</span>
              <a href="tel:+380639977874" className="inline-flex items-center gap-1"><Phone size={16}/>+380 63 997 78 74</a>
              <a href="mailto:pyavchik@gmail.com" className="inline-flex items-center gap-1"><Mail size={16}/>pyavchik@gmail.com</a>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a aria-label="GitHub" href="https://github.com/pyavchik" target="_blank" rel="noreferrer" className="rounded-lg border p-2 hover:bg-slate-100"><Github size={18}/></a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/pyavchik/" target="_blank" rel="noreferrer" className="rounded-lg border p-2 hover:bg-slate-100"><Linkedin size={18}/></a>
              <Link href="/skills" className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">Open Skills Web App</Link>
              <Link href="/coverage" className="rounded-lg border px-4 py-2 hover:bg-slate-100">Coverage Map</Link>
            </div>
          </div>
          <div className="mx-auto">
            <Image
              src="/profile.png"
              alt="Oleksandr Pyavchyk profile photo"
              width={220}
              height={220}
              className="rounded-2xl object-cover shadow-md ring-1 ring-slate-200"
              priority
            />
          </div>
        </div>
      </section></Reveal>

      <Reveal><Section title="About"><p className="text-slate-700 text-pretty">QA Engineer with 3+ years of hands-on experience in manual testing of web-based and software systems. Skilled in identifying defects, creating test documentation, and collaborating with development teams in Agile environments. Detail-oriented professional with strong understanding of software testing lifecycle and test execution. Fluent in English with reliable communication skills.</p></Section></Reveal>

      <Reveal><Section title="Core Competencies"><div className="flex flex-wrap gap-2">{competencies.map(c => <Badge key={c}>{c}</Badge>)}</div></Section></Reveal>

      <Reveal><Section title="Experience"><div className="space-y-3">
        <Card><h3 className="font-semibold">QA Engineer | Innovation Group</h3><ul className="list-disc pl-5 text-sm text-slate-700"><li>Performed comprehensive manual testing of web applications and systems</li><li>Executed functional and regression testing cycles before releases</li><li>Tested system integrations and edge cases</li><li>Verified system behavior and performance during feature releases</li><li>Documented defects with clear reproduction steps and expected outcomes</li><li>Collaborated with developers to resolve issues and validate fixes</li></ul></Card>
        <Card><h3 className="font-semibold">QA Engineer | Digicode</h3><ul className="list-disc pl-5 text-sm text-slate-700"><li>Created and executed manual tests for web applications and APIs</li><li>Prepared test cases and test scenarios from specifications</li><li>Performed UI testing on forms, validations, messages, and tables</li><li>Tested admin panels and internal systems</li><li>Verified third-party integrations</li><li>Maintained detailed test artifacts and results documentation</li></ul></Card>
        <Card><h3 className="font-semibold">QA Engineer | Spetskodservis</h3><ul className="list-disc pl-5 text-sm text-slate-700"><li>Planned and executed manual test cycles ensuring compliance with requirements</li><li>Designed comprehensive test cases and prepared test data</li><li>Tested software against specifications and identified deviations</li><li>Logged defects and prepared final testing reports</li></ul></Card>
      </div></Section></Reveal>

      <Reveal><Section title="Tools & Tech"><div className="grid gap-3 sm:grid-cols-2">{['Bug Tracking: Jira, Similar Issue Tracking Systems','Testing Documentation: Test Plans, Test Cases, Checklists','API Testing: REST APIs, Third-Party Integrations','Methodologies: Agile, Scrum','Languages: Ukrainian (Native), English (Fluent)'].map(t => <Card key={t}>{t}</Card>)}</div></Section></Reveal>

      <Reveal><Section title="Growth"><p className="text-slate-700">Experienced QA specialist with a proven track record of delivering reliable testing. Ready to apply manual testing expertise while developing skills in test automation and growing within a dynamic team. Interested in learning new technologies and contributing to the quality of innovative software solutions.</p></Section></Reveal>

      <Reveal><Section title="Contacts"><p className="text-slate-700">Email: <a href="mailto:pyavchik@gmail.com" className="underline">pyavchik@gmail.com</a> · Phone: <a href="tel:+380639977874" className="underline">+380 63 997 78 74</a></p></Section></Reveal>
    </main>
  );
}
