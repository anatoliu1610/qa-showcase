import { Section, Card, Badge } from '@/components/ui';

const uiChecks = ['Layout consistency', 'Responsive breakpoints', 'Form validation', 'Accessibility (keyboard, focus, contrast)', 'Error message clarity'];
const apiChecks = ['Status codes & contracts', 'Auth and permission flows', 'Negative scenarios', 'Schema validation', 'Rate limiting and retries'];
const loadChecks = ['Smoke load (100 users)', 'Baseline load (500 users)', 'Stress spikes', 'Soak (30+ min)', 'Error rate & p95 latency'];

export default function TestsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <Section title="Professional Testing Practices">
        <p className="text-slate-300">A practical testing strategy for UI, API, and performance testing with JMeter-oriented load scenarios.</p>
      </Section>

      <Section title="UI Best Practices">
        <div className="grid gap-3 md:grid-cols-2">
          {uiChecks.map((item) => (
            <Card key={item}>{item}</Card>
          ))}
        </div>
      </Section>

      <Section title="API Best Practices">
        <div className="grid gap-3 md:grid-cols-2">
          {apiChecks.map((item) => (
            <Card key={item}>{item}</Card>
          ))}
        </div>
      </Section>

      <Section title="Loading Tests (JMeter)">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge>Throughput</Badge>
          <Badge>p95/p99 Latency</Badge>
          <Badge>Error Rate</Badge>
          <Badge>Stability</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {loadChecks.map((item) => (
            <Card key={item}>{item}</Card>
          ))}
        </div>
        <Card className="mt-4">
          <h3 className="mb-2 font-semibold text-white">Example JMeter Plan</h3>
          <pre className="overflow-x-auto rounded-lg border border-white/10 bg-[#0f1735] p-3 text-xs text-slate-200">
{`Thread Group: 500 users / ramp-up 120s / loop 10
HTTP Request Defaults: base URL + common headers
CSV Data Set Config: test users
HTTP Samplers: login -> create session -> spin -> history
Assertions: status=200, response schema fields exist
Listeners: Summary Report + Aggregate Report + Backend Listener (optional)
Pass Criteria: p95 < 700ms, error rate < 1%`}
          </pre>
        </Card>
      </Section>
    </main>
  );
}
