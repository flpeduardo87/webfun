import pkg from '../../../package.json';

export const dynamic = 'force-dynamic';

export function GET(){
  return Response.json(
    { ok: true, service: 'webfun', version: pkg.version, time: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
