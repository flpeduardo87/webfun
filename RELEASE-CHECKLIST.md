# Release checklist — Webfun V7.91

## Produção

- [ ] Node.js 22.x.
- [ ] `LEADS_FILE_PATH` ou `CONTACT_WEBHOOK_URL` configurado.
- [ ] `npm run validate` aprovado.
- [ ] `npm run release` aprovado.
- [ ] `/api/health` retorna `ok: true` e versão `7.91.0`.

## QA visual

- [ ] Desktop 1440 / 1366 / 1024: header, mega menu, hero, processo 3×2, FAQ 2 colunas e footer.
- [ ] iPhone 390×844 / 430×932: header, hero, swipe, tags 16px, formulário e controles fixos.
- [ ] Android 360×800 / 412×915: sem overflow horizontal, inputs sem zoom e menu navegável.
- [ ] Light/dark: contraste, logo, hero, mega menu opaco, CTAs e cards.
- [ ] CTAs: azul no repouso, gradiente azul-dominante no hover/active e sem borda de cor invertida.
- [ ] Menu Serviços: não fecha antes do clique; submenu mobile fechado não recebe foco.
- [ ] Formulário real salva lead e abre WhatsApp com contexto.

## SEO / performance

- [ ] Canonical sem `www`.
- [ ] Open Graph correto nas páginas principais.
- [ ] `robots.txt` e `sitemap.xml`.
- [ ] SSL + 301 `www` → domínio sem `www`.
- [ ] Lighthouse produção: Performance ≥ 85 mobile / ≥ 90 desktop, Accessibility ≥ 95, SEO ≥ 95.
- [ ] Sem erros no console, CLS perceptível ou overflow horizontal.
