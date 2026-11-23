import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];
const required = [
  'public/brand/webfun-logo-black.svg',
  'public/brand/webfun-logo-white.svg',
  'public/brand/webfun-icon.svg',
  'public/media/portfolio/lume.webp',
  'public/media/portfolio/match.webp',
  'public/media/portfolio/aura.webp',
  'public/media/portfolio/noma.webp',
  'public/media/portfolio/nexo.webp',
  'public/media/portfolio/casa-serena.webp',
  'public/media/portfolio/farina84.webp',
  'app/api/contact/route.js',
  'app/api/health/route.js',
  'components/Analytics.js',
  '.env.example',
];
for (const rel of required) if (!fs.existsSync(path.join(root, rel))) errors.push(`Arquivo obrigatório ausente: ${rel}`);

const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 20) errors.push(`Node ${process.versions.node} não suportado. Use Node 20+; recomendado 22.`);

const layout = fs.readFileSync(path.join(root, 'app/layout.js'), 'utf8');
const externalGoogleFonts = /fonts\.googleapis\.com|fonts\.gstatic\.com/.test(layout);
const typographyTest = fs.existsSync(path.join(root, 'V7.94-CHANGES.md'));
const typographyProductionCheck = process.env.NODE_ENV === 'production' || process.env.WEBFUN_PRODUCTION_CHECK === '1';
if (externalGoogleFonts) {
  if (typographyTest && !typographyProductionCheck) warnings.push('V7.94 de comparação tipográfica usa Google Fonts externo apenas para teste visual.');
  else errors.push('Google Fonts externo ainda presente no layout.');
}
if (!layout.includes("next/font/google") && !typographyTest) warnings.push('next/font não detectado.');

const config = fs.readFileSync(path.join(root, 'next.config.mjs'), 'utf8');
for (const header of ['Content-Security-Policy','Strict-Transport-Security','X-Content-Type-Options']) {
  if (!config.includes(header)) warnings.push(`Header de segurança não detectado: ${header}`);
}

const data = fs.readFileSync(path.join(root, 'lib/data.js'), 'utf8');
const previewCount = [...data.matchAll(/preview:\s*'\/media\/portfolio\//g)].length;
if (previewCount < 7) errors.push(`Esperados pelo menos 7 previews reais; encontrados ${previewCount}.`);

const envStatus = {
  ga4: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  searchConsole: Boolean(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  webhook: Boolean(process.env.CONTACT_WEBHOOK_URL),
  leadsPath: Boolean(process.env.LEADS_FILE_PATH),
};

const productionCheck = process.env.NODE_ENV === 'production' || process.env.WEBFUN_PRODUCTION_CHECK === '1';
if (productionCheck && !envStatus.webhook && !envStatus.leadsPath) {
  warnings.push('Sem CONTACT_WEBHOOK_URL/LEADS_FILE_PATH: os leads seguem apenas pelo handoff do formulário para o WhatsApp (comportamento intencional).');
}

console.log(`Node: ${process.versions.node}`);
console.log(`Mockups reais configurados: ${previewCount}`);
console.log(`GA4 configurado: ${envStatus.ga4 ? 'sim' : 'não (opcional antes do deploy)'}`);
console.log(`Search Console configurado: ${envStatus.searchConsole ? 'sim' : 'não (opcional antes do deploy)'}`);
console.log(`Webhook de leads: ${envStatus.webhook ? 'sim' : 'não configurado'}`);
console.log(`LEADS_FILE_PATH dedicado: ${envStatus.leadsPath ? 'sim' : (productionCheck ? 'não configurado' : 'não (fallback local apenas em desenvolvimento)')}`);
if (warnings.length) console.log(`Avisos:\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`Erros:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`OK — preflight ${productionCheck ? 'de produção' : 'local'} aprovado.`);
