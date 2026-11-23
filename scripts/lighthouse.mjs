import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const base = process.env.LIGHTHOUSE_BASE_URL || 'http://localhost:3000';
const pages = [
  ['home', '/'],
  ['sobre', '/sobre'],
  ['servicos', '/servicos'],
  ['projetos', '/projetos'],
  ['contato', '/contato'],
];
mkdirSync('reports', { recursive: true });

for (const [name, route] of pages) {
  const url = new URL(route, base).toString();
  console.log(`\nLighthouse: ${url}`);
  const args = [
    '--yes', 'lighthouse', url,
    '--quiet',
    '--chrome-flags=--headless --no-sandbox --disable-gpu',
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=html',
    `--output-path=reports/lighthouse-${name}.html`,
  ];
  const run = spawnSync('npx', args, { stdio: 'inherit', shell: false });
  if (run.status !== 0) process.exit(run.status || 1);
}
console.log('\nRelatórios gerados em ./reports/.');
