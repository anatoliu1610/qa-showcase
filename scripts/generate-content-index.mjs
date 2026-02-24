import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  ['architecture', ['docs/architecture']],
  ['web-protocols', ['docs/web-protocols']],
  ['api', ['docs/api', 'api-tests']],
  ['db', ['docs/db', 'sql']],
  ['logs', ['docs/logs']],
  ['process', ['docs/process']],
  ['bugs', ['bugs']],
  ['tracker', ['tracker']]
];

function scan(dir) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).flatMap((name) => {
    const rel = path.join(dir, name);
    const abs = path.join(root, rel);
    if (fs.statSync(abs).isDirectory()) return scan(rel);
    return rel;
  });
}

const out = [];
for (const [category, dirs] of targets) {
  for (const d of dirs) {
    for (const rel of scan(d)) {
      const base = path.basename(rel);
      out.push({ title: base.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, ''), path: rel, category, type: path.extname(rel).slice(1) || 'file' });
    }
  }
}
fs.mkdirSync(path.join(root, 'public'), { recursive: true });
fs.writeFileSync(path.join(root, 'public', 'content-index.json'), JSON.stringify(out, null, 2));
console.log(`Generated ${out.length} artifacts`);
