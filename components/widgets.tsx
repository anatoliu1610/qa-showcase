'use client';
import { useMemo, useState } from 'react';

export function ArchitectureWidget() {
  const nodes = ['Client','API Gateway','Game Service','DB','Logs'];
  const details: Record<string,string> = {
    Client:'Validates UI behavior, form errors, and request payload composition.',
    'API Gateway':'Checks auth, routing, status codes, and headers.',
    'Game Service':'Verifies business rules, edge cases, and response consistency.',
    DB:'Runs SQL checks for integrity, joins and data correctness.',
    Logs:'Correlates request_id in Kibana for root-cause analysis.'
  };
  const [active, setActive] = useState(nodes[0]);
  return <div className="space-y-3"><div className="flex flex-wrap gap-2">{nodes.map(n=><button key={n} onClick={()=>setActive(n)} className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100" aria-label={`Select ${n}`}>{n}</button>)}</div><p className="rounded-md bg-slate-100 p-3 text-sm">{details[active]}</p></div>;
}

export function ChecklistWidget() {
  const [items, set] = useState([{t:'Status code verified',v:false},{t:'Headers validated',v:false},{t:'HTML5 validation works',v:false}]);
  return <div className="space-y-2">{items.map((it,i)=><label key={it.t} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={it.v} onChange={()=>set(items.map((x,idx)=>idx===i?{...x,v:!x.v}:x))}/>{it.t}</label>)}</div>;
}

export function ApiWidget() {
  const [method,setMethod]=useState('GET'); const [url,setUrl]=useState('/health');
  return <div className="space-y-2 text-sm"><div className="flex gap-2"><select value={method} onChange={e=>setMethod(e.target.value)} className="rounded border px-2 py-1"><option>GET</option><option>POST</option></select><input value={url} onChange={e=>setUrl(e.target.value)} className="flex-1 rounded border px-2 py-1"/></div><pre className="rounded bg-slate-100 p-2">{method} {url} → 200 OK (mock)</pre></div>;
}

export function DbWidget(){const queries=['SELECT * FROM sessions WHERE ended_at IS NULL;','SELECT user_id, SUM(amount) FROM bets GROUP BY user_id;'];const [q,setQ]=useState(queries[0]);return <div className="space-y-2"><select className="w-full rounded border p-2 text-sm" value={q} onChange={e=>setQ(e.target.value)}>{queries.map(x=><option key={x}>{x}</option>)}</select><pre className="rounded bg-slate-100 p-2 text-xs">{q}</pre></div>}

export function LogsWidget(){const logs=[{level:'ERROR',msg:'/api/spin timeout'},{level:'INFO',msg:'/api/health ok'}]; const [f,setF]=useState(''); const filtered=useMemo(()=>logs.filter(l=>`${l.level} ${l.msg}`.toLowerCase().includes(f.toLowerCase())),[f]); return <div className='space-y-2'><input placeholder='Filter logs / KQL keyword' className='w-full rounded border p-2 text-sm' value={f} onChange={e=>setF(e.target.value)}/><ul className='space-y-1 text-sm'>{filtered.map((l,i)=><li key={i} className='rounded bg-slate-100 p-2'>{l.level}: {l.msg}</li>)}</ul></div>}

export function ProcessWidget(){return <div className='text-sm rounded bg-slate-100 p-3'>Template preview: Test Plan → Scope, Risks, Entry/Exit, Test Cases, Reporting.</div>}
export function BugsWidget(){return <div className='text-sm rounded bg-slate-100 p-3'>Bug: Title · Severity/Priority · Steps · Expected/Actual · Attachments.</div>}
export function TrackerWidget(){return <div className='grid grid-cols-3 gap-2 text-sm'><div className='rounded bg-slate-100 p-2'>Open</div><div className='rounded bg-slate-100 p-2'>In Progress</div><div className='rounded bg-slate-100 p-2'>Done</div></div>}
