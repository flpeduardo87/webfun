import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BUCKETS = 10000;
const buckets = new Map();

function clean(value, max = 2000) {
  return String(value ?? '').replace(/\0/g, '').trim().slice(0, max);
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clientIp(request) {
  return clean(request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown', 80);
}

function rateLimited(ip) {
  const now = Date.now();
  for (const [key, timestamps] of buckets) {
    if (!timestamps.some((time) => now - time < WINDOW_MS)) buckets.delete(key);
  }
  if (!buckets.has(ip) && buckets.size >= MAX_BUCKETS) return true;
  const bucket = buckets.get(ip) || [];
  const fresh = bucket.filter((time) => now - time < WINDOW_MS);
  if (fresh.length >= MAX_REQUESTS) {
    buckets.set(ip, fresh);
    return true;
  }
  fresh.push(now);
  buckets.set(ip, fresh);
  return false;
}

// Destinos de lead são OPCIONAIS e best-effort. O canal principal é o handoff
// para o WhatsApp feito no cliente (ContactForm abre o WhatsApp com o contexto
// preenchido). Uma falha aqui nunca deve quebrar o formulário.
async function persistLead(lead) {
  const file = process.env.LEADS_FILE_PATH
    || (process.env.NODE_ENV !== 'production' ? path.join(process.cwd(), 'storage', 'leads.jsonl') : null);
  if (!file) return;
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, `${JSON.stringify(lead)}\n`, { encoding: 'utf8', mode: 0o600 });
}

async function sendWebhook(lead) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lead),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`Webhook HTTP ${response.status}`);
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 24000) return Response.json({ ok: false, error: 'Payload muito grande.' }, { status: 413 });

    const ip = clientIp(request);
    if (rateLimited(ip)) return Response.json({ ok: false, error: 'Muitas tentativas. Tente novamente em alguns minutos.' }, { status: 429 });

    const body = await request.json();
    if (clean(body.website, 300)) return Response.json({ ok: true }, { status: 201 });

    const lead = {
      type: clean(body.type, 120),
      moment: clean(body.moment, 160),
      description: clean(body.description, 4000),
      name: clean(body.name, 160),
      company: clean(body.company, 180),
      email: clean(body.email, 220).toLowerCase(),
      phone: clean(body.phone, 80),
      page: clean(body.page, 300),
      createdAt: new Date().toISOString(),
      source: 'webfun.com.br',
    };

    if (!lead.type || !lead.moment || !lead.description || !lead.name || !emailIsValid(lead.email)) {
      return Response.json({ ok: false, error: 'Confira os campos obrigatórios.' }, { status: 400 });
    }

    // Registro best-effort: se nenhum destino estiver configurado, o lead segue
    // apenas pelo WhatsApp e a requisição ainda responde ok.
    try {
      await sendWebhook(lead);
    } catch (webhookError) {
      console.error('Lead webhook falhou (ignorado):', webhookError);
    }
    try {
      await persistLead(lead);
    } catch (fileError) {
      console.error('Lead file persist falhou (ignorado):', fileError);
    }

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('Contact capture failed:', error);
    return Response.json({ ok: false, error: 'Não foi possível registrar o contato agora.' }, { status: 500 });
  }
}
