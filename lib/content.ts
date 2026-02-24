import fs from 'node:fs';
import path from 'node:path';

export type Artifact = { title: string; path: string; category: string; type: string };

const indexPath = path.join(process.cwd(), 'public', 'content-index.json');

export function getIndex(): Artifact[] {
  if (!fs.existsSync(indexPath)) return [];
  return JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as Artifact[];
}

export function readText(relPath: string): string {
  const full = path.join(process.cwd(), relPath);
  if (!fs.existsSync(full)) return 'No evidence file found.';
  return fs.readFileSync(full, 'utf-8');
}
