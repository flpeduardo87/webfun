const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'public');
const PAGES = path.join(__dirname, 'pages');
const HOST = 'webfun.com.br';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

function redirect(res, to) {
  res.writeHead(301, { Location: to, 'Cache-Control': 'public, max-age=3600' });
  res.end();
}

http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = parsed.pathname || '/';
  const search = parsed.search || '';

  /* ── Redirecionamentos 301 ── */
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim().toLowerCase().replace(/:\d+$/, '');
  /* URL limpa: só para páginas do site (pages/); arquivos de public/ (ex.: /modelos/...) ficam como estão */
  let base = pathname.replace(/\/+$/, '').replace(/\.html$/i, '');
  if (base === '' || base === '/index') base = '/';
  const isPage = base === '/' || (base.indexOf('..') < 0 && fs.existsSync(path.join(PAGES, base + '.html')));
  const clean = isPage ? base : pathname;
  if (host === 'www.' + HOST) return redirect(res, 'https://' + HOST + clean + search);
  if (clean !== pathname) return redirect(res, clean + search);

  if (pathname.indexOf('..') >= 0 || pathname.indexOf('\0') >= 0) { res.writeHead(400); res.end('Bad Request'); return; }

  /* página (pages/<nome>.html) ou, se não for página, arquivo estático de public/ */
  const pageFile = path.join(PAGES, (pathname === '/' ? '/index' : pathname) + '.html');
  let filePath = fs.existsSync(pageFile) ? pageFile : path.join(ROOT, pathname);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // Página 404 personalizada (public/404.html), com fallback simples
    fs.readFile(path.join(PAGES, '404.html'), (err, data) => {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
      res.end(err ? '<h1>404 Not Found</h1>' : data);
    });
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  /* HTML sempre revalida; arquivos estáticos ficam em cache por 30 dias */
  const cache = ext === '.html' ? 'no-cache' : 'public, max-age=2592000';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cache });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Webfun site running on port ${PORT}`);
});
