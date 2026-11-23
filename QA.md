# QA — Webfun V7.30 — Domain Ready

## Validado neste ambiente

- `npm run check`: aprovado.
- `npm run preflight`: aprovado.
- 51 arquivos de código verificados pelo checker do projeto.
- 14 mockups reais encontrados e referenciados.
- Logos oficiais light/dark presentes.
- Hero preservado em 3 linhas, com ajuste responsivo adicional para 320–375px.
- Referências de assets locais válidas.
- CSS balanceado.
- CSS morto do hero V4 removido (redução aproximada de 14 KB no fonte).
- Google Fonts externo removido do layout; Lexend migrada para `next/font`.
- Formulário com endpoint server-side, honeypot, validação e rate limit básico.
- Endpoint de contato testado diretamente em Node: HTTP 201 e gravação JSONL confirmados.
- GA4 condicionado a consentimento.
- SEO e dados estruturados de projetos/serviços adicionados.
- Headers de segurança configurados.
- Endpoint `/api/health` incluído.

## Build / Lighthouse neste ambiente

O código foi preparado para build, mas este ambiente de execução não consegue resolver `registry.npmjs.org`. Por isso as dependências não puderam ser instaladas aqui e o executável `next` não ficou disponível.

Tentativas registradas:

- `npm install --no-audit --no-fund`: bloqueado por DNS/rede do ambiente.
- `npm run build`: não executável sem `node_modules` (`next: not found`).
- Lighthouse: script preparado, mas depende de aplicação construída/rodando e do pacote Lighthouse via `npx`.

**Condição de release:** executar `npm install`, `npm run validate`, `npm run build` e Lighthouse no computador local ou na Hostinger antes de substituir o site em produção.

## QA manual obrigatório

- Chrome/Edge Windows.
- Safari iPhone.
- Chrome Android.
- 360, 390, 430, 768, 1024, 1366, 1440 e 1920 px.
- Light/Dark/System.
- Teclado e foco visível.
- WhatsApp desktop/mobile.
- Formulário + gravação de lead.
- Compartilhamento Open Graph.

## V7.1 — UX coherence pass
- [x] Hero preservado.
- [x] Cards de serviços com mockups reais e contexto visual.
- [x] Logo light com contraste reforçado sem recolorir a marca oficial.
- [x] Pessoas no Centro reexportada em qualidade superior.
- [x] Copy da seção humana sem 12px funcional.
- [x] Resultado na prática reconstruído com foto + fluxo compreensível.
- [x] Processo com imagens contextuais por etapa.
- [x] Projetos mobile com seletor imediatamente abaixo do mockup.
- [x] Footer sem texto funcional em 12px.
- [x] npm run validate aprovado.

## V7.6 — Brand system + production QA
- [x] Azul `#2563eb` mantido como cor funcional principal.
- [x] Lime `#c9ff42` restrito a assinatura visual pontual.
- [x] Microtipografia visível elevada; corpo e apoio em 15–16px.
- [x] Seção “Nossa posição” corrigida para tag → título → texto em fluxo vertical.
- [x] Hero de 3 linhas protegido em telas estreitas.
- [x] Labels de cases/projetos e tema revisados.
- [x] `prefers-reduced-motion` tratado explicitamente.
- [x] CSS de produção consolidado em `app/styles/site.css`.
- [x] `npm run validate` aprovado.
- [ ] `npm run build` ainda precisa ser executado em ambiente com dependências instaladas.


## V7.30 — final domain QA
- [x] `npm run check` approved.
- [x] `npm run preflight` approved.
- [x] Canonical production domain is `https://webfun.com.br`.
- [x] Permanent redirects added for known indexed legacy URLs.
- [x] `www` canonical redirect configured.
- [x] Open Graph copy synchronized with the final hero.
- [x] Sitemap release timestamp updated.
- [x] Security headers and health endpoint preserved.
- [ ] `npm run build` requires an environment where Next.js dependencies are installed.
