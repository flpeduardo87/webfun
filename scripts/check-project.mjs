import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const codeRoots = ['app','components','lib'];
const files = [];
for (const dir of codeRoots) walk(path.join(root, dir));

let errors = [];
let warnings = [];
const mediaRefs = new Set();
const localImports = [];

for (const file of files.filter(f => f.endsWith('.js'))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)) localImports.push([file, match[1]]);
  for (const match of text.matchAll(/['"](\/media\/[^'"]+)['"]/g)) mediaRefs.add(match[1]);
}

for (const [file, spec] of localImports) {
  const base = path.resolve(path.dirname(file), spec);
  const candidates = [base, `${base}.js`, path.join(base, 'index.js')];
  if (!candidates.some(fs.existsSync)) errors.push(`Import não encontrado: ${path.relative(root,file)} -> ${spec}`);
}

for (const ref of mediaRefs) {
  const disk = path.join(root, 'public', ref.replace(/^\//,''));
  if (!fs.existsSync(disk)) errors.push(`Asset não encontrado: ${ref}`);
}

const stylesDir = path.join(root,'app','styles');
const cssFiles = fs.readdirSync(stylesDir).filter(f => f.endsWith('.css')).sort();
if (!cssFiles.length) errors.push('Nenhum arquivo CSS encontrado em app/styles.');
const css = cssFiles.map(f => fs.readFileSync(path.join(stylesDir,f),'utf8')).join('\n');
const open = (css.match(/{/g)||[]).length;
const close = (css.match(/}/g)||[]).length;
if (open !== close) errors.push(`CSS desbalanceado: ${open} { / ${close} }`);
if (/Segoe UI|Manrope|font-family:\s*Inter/i.test(css)) errors.push('Fonte legada detectada no CSS.');

const pkg = JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
for (const required of ['dev','build','start','check']) if (!pkg.scripts?.[required]) errors.push(`Script npm ausente: ${required}`);

const data = fs.readFileSync(path.join(root,'lib','data.js'),'utf8');
for (const token of ["phoneE164", "whatsapp", "Estudo conceitual"]) if (!data.includes(token)) warnings.push(`Verificação esperada ausente: ${token}`);

console.log(`Arquivos de código verificados: ${files.length}`);
console.log(`Assets locais referenciados: ${mediaRefs.size}`);
if (warnings.length) console.log(`Avisos:\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`Erros:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('OK — estrutura, imports, assets, CSS, scripts e fonte verificados.');

function walk(dir){
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    const full = path.join(dir,entry.name);
    if (entry.isDirectory()) walk(full); else files.push(full);
  }
}
