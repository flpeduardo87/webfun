## V7.99.34 — Card AZAFF em /projetos: link errado (subdomínio antigo)
- `liveUrl` do projeto AZAFF em `lib/data.js` apontava pro subdomínio de teste `https://nova.lojasazaff.com.br/`. Loja já está no domínio definitivo — trocado para `https://lojasazaff.com.br/`. Conferido que não havia outra referência ao subdomínio antigo no projeto.

## V7.99.33 — Prisma chooser: ajustes no ar hero (H1 quebra + mockup maior)
- Feedback do usuário já no site publicado (v7.99.32 no ar): "de verdade" quebrava sozinho, separado de "Negócios diferentes" pela largura da linha. Trocado o espaço por `<br>` — agora sempre "Um motor. / Negócios diferentes / de verdade." em 3 linhas fixas, não depende mais da largura da tela.
- Mockup de mão pequeno demais pro espaço que tem: `max-width` 400px → 560px, `.intro__visual` (altura mínima) 380px → 500px. Testado, ficou com presença de verdade na coluna direita.

## V7.99.32 — Prisma chooser: mockup de mão na coluna direita + H1 maior
- O vão vazio à direita do hero (que só tinha os glows desde a v7.99.27) ganhou um mockup de verdade: celular na mão mostrando a vitrine da Áurea Store (arquivo do usuário, `Desktop/Mockups/mockp-prisma.png` — confirmado com canal alpha real, igual fiz com os mockups do hero da home). Convertido pra `public/modelos/prisma/hero-mockup.webp` (1000px, ~65KB).
- Os 5 orbs viraram um "halo" atrás do celular (reposicionados pra dentro de `.intro__visual`) em vez de decoração solta no vazio — mesmo efeito, agora com propósito.
- `h1` aumentado: `clamp(30px,4.4vw,46px)` → `clamp(34px,5.2vw,56px)`.
- `.intro` virou grid de 2 colunas (texto | visual), empilha em `max-width:900px`. Testado desktop e mobile.

## V7.99.31 — Card de Sites: o retângulo do "hero" tava sem graça
- Usuário apontou que o bloco visual do card de Sites & experiências digitais (`.wf-si-site-visual`) ficou "cinza, sem graça" — era um gradiente navy bem apagado, quase se perdia no fundo escuro do próprio card.
- Trocado por um gradiente tipo "aurora": base roxo-azulada mais saturada + um glow quente (coral) no canto superior direito + um glow frio (menta) no canto inferior esquerdo. Mantém o chip "+40% Conversão" por cima. Testado no browser, bem mais vivo.

## V7.99.30 — Ilustrações reais dos 6 cards de serviço + pills de atalho
- Levou pro código o que foi validado no protótipo (várias rodadas de revisão): os 6 cards de `/servicos` (e o rail correspondente na home, `ServicesExperience.js`) trocaram o mockup de projeto reciclado (a mesma foto do Nexo/Noma/Match/Aura/Lume/AZAFF que já aparece na home e no portfólio) por uma ilustração do que cada serviço entrega:
  - **Automação & IA**: 4 ferramentas soltas convergindo pra 1 fluxo automático.
  - **SEO & performance**: resultado de busca + nota de performance (98).
  - **Sistemas & plataformas**: painel admin (reservas, ocupação, status) em vez da vitrine pública.
  - **UX/UI & produto digital**: paleta, botões, tipografia, controles — o sistema por trás da interface.
  - **Sites & experiências digitais**: hero em miniatura com copy real, prova social e chip "+40% conversão".
  - **E-commerce**: produtos com ícone/favorito + carrinho com stepper de quantidade e checkout completo.
- Implementado em `components/ServiceIllustration.js` (componente único, reusado nos dois lugares — evita duplicar os 6 em dois arquivos). Ícones via `lucide-react` (já era dependência do projeto). CSS novo no fim do `site.css` (`.wf-si-*`, `.wf-svc-illust`).
- **Decisão de tema**: cada ilustração é sempre escura, independente do tema do site — é um "preview de interface", igual a foto de mockup que substituiu (não mudava com light/dark). Testado nos dois temas.
- **Pills de atalho em `/servicos`**: adicionado um pill por serviço (mesmo padrão visual dos filtros de `/projetos`), no lugar da nota "6 frentes principais" (já estava escondida via CSS, redundante com a lista abaixo). Ao contrário de `/projetos`, aqui não filtra — ancora direto pra linha do serviço (`href="#svc-{slug}"` + `id` na linha + `scroll-margin-top` pra não ficar embaixo do menu fixo). Testado: clique, hash da URL e posição de scroll conferidos.
- `lib/data.js`: campos `heroImage` de `sistemas-e-plataformas` e `ux-ui-produto-digital` (corrigidos na v7.99.29 pra apontar pro hero-mockups) agora ficam sem uso nos 6 serviços — não removi os campos (podem voltar a ser úteis), só pararam de ser lidos pelo componente.

## V7.99.29 — Cards de /servicos: imagem pequena demais (Sistemas & UX/UI)
- Bug apontado pelo usuário com print: nos cards de serviço de `/servicos` ("Sistemas & plataformas" e "UX/UI & produto digital"), o mockup aparecia bem menor que os outros 4 cards, sobrando bastante espaço vazio ao redor.
- Causa: `lib/data.js` usava `heroImage: '/media/portfolio/match.webp'` e `'/media/portfolio/aura.webp'` — dois arquivos antigos (27/08) com proporção quase quadrada (1.08:1, conteúdo preenchendo só ~91%x76% do canvas) dentro de um quadro `figure` de proporção 1.90:1. Com `object-fit:contain`, uma imagem quase quadrada num quadro bem mais largo sobra espaço vazio nas laterais — mesmo defeito nos dois arquivos, confirmado por script (`sharp`, varredura do canal alpha).
- Fix: apontei os dois `heroImage` pros mesmos arquivos já corrigidos do carrossel do hero (`/media/hero-mockups/match.webp` e `aura.webp`, proporção 1.92:1 — quase idêntica ao quadro). `portfolio/match.webp`/`aura.webp` continuam existindo intactos (ainda usados no grid do portfólio e na página de cada projeto — não mexi ali, fora do escopo do que foi reportado).
- Corrigi por engano primeiro em `components/ServicesExperience.js` (mesmo bug, mas esse componente não é o usado em `/servicos` — é outro trecho, mantive a correção lá também já que é válida onde quer que ele apareça).

## V7.99.28 — Carrossel do hero: mockups novos com recorte de verdade
- Os mockups do carrossel da home (`components/HomeHero.js`) foram refeitos pelo usuário com **laptop + tablet + celular** (antes só laptop + celular) e fundo transparente de verdade — substituem os antigos em `public/media/hero-mockups/`: `match`, `nexo`, `lume`, `noma`, `aura`. Confirmado por amostragem de pixel (canto = alpha 0, ~16% da imagem transparente) antes de trocar, porque a primeira leva (sem essa etapa) veio com fundo preto sólido em vez de transparência — teria criado uma caixa preta atrás do mockup no tema claro (o CSS aplica `drop-shadow`, pensado pra recorte, não pra retângulo).
- **2 slides trocados**: `Farina 84` e `Casa Serena` saíram do carrossel (ficam só como projetos normais do portfólio, imagem própria em `/media/portfolio/`, intocada) — entraram `Com Cristo Kids` e `Forno Alto`, a pedido do usuário.
- Testado no browser: tema claro e escuro (sem caixa preta em nenhum), e mobile 375px (7 dots, texto ainda legível nas telas pequenas do mockup apesar da composição mais densa com 3 aparelhos).
- Backup dos 7 arquivos antigos guardado fora do `public/` (`scratchpad/img-tool/old-hero-mockups-backup/`), não entra no zip de deploy.

## V7.99.27 — Prisma chooser: vão vazio no hero
- O `.intro` não tinha `max-width`, então o texto (H1 limitado a 660px) ficava sozinho na esquerda enquanto o `.container` ia até 1180px — sobrava um vão preto enorme à direita antes do grid de cards começar (apontado pelo usuário com print).
- Preenchido com um agrupamento de 5 glows borrados (`mix-blend-mode:screen`), cada um na cor exata da tag de uma vertical (Alimentação/Varejo/Automotivo/Serviços/Reservas) — em vez de decoração aleatória, antecipa visualmente o "5 negócios, 1 motor" antes mesmo do usuário rolar pro grid. `position:relative;z-index` no texto garante que os glows nunca encostam nas palavras (conferido: h1 termina em x=725, glow mais próximo começa em x=855). Escondido abaixo de 1100px de viewport (mobile/tablet já não tem esse vão).

## V7.99.26 — Link do Canoinhas Tênis Clube corrigido
- O CTA "Ver projeto" do case Canoinhas Tênis Clube apontava pro domínio antigo de teste (`elite-tenis-clube.vercel.app` — do primeiro deploy Vercel, antes do repo ter sido recriado). O projeto migrou pra um repo/domínio novo (`canoinhas-tenis-clube.vercel.app`), mas o `liveUrl` no portfólio da Webfun não tinha sido atualizado.
- Corrigido em `lib/data.js` (campo `liveUrl` do projeto, `slug` interno mantido). Conferido no preview: a página do projeto e a listagem `/projetos` já abrem o link certo, sem sobra do domínio antigo em nenhum lugar.

## V7.99.25 — Botão flutuante: WhatsApp de verdade
- **Ícone**: trocado o `MessageCircle` genérico (lucide) por um SVG inline com o glifo oficial do WhatsApp, em `components/WhatsAppFloat.js`.
- **Cor**: o botão vinha azul (`var(--acid)`), e o CSS acumulou ao longo das versões um `!important` pra azul sólido e depois `:hover`/`:active` com gradiente azul→violeta — nenhuma dessas camadas é a cor real do WhatsApp. Em vez de caçar cada `!important` no meio de 12.900 linhas, adicionei uma regra nova no fim do `site.css` (vence por ordem de cascata) fixando `#25D366` no repouso, `#1ebe5a` no hover e `#1aa750` no active, sem gradiente.
- Conferido no navegador: `getComputedStyle` confirma `rgb(37,211,102)` e `backgroundImage:none`.

## V7.99.24 — Prisma chooser: alinhamento do texto
- O bloco de intro (eyebrow + H1 + parágrafos) tinha `max-width:680px` junto com `margin:0 auto` (herdado de `.container`), então ficava centralizado na tela enquanto o logo e os cards usavam a largura cheia — texto desalinhado à direita. Removido o `max-width` do `.intro`; o cap de largura foi pro `h1` (660px) e os parágrafos já tinham o seu. Agora logo, texto e cards compartilham a mesma borda esquerda.
- H1 com quebra fixa depois de "Um motor." + `text-wrap:balance`.

## V7.99.23 — Prisma: painel administrativo mais acessível
- **"Ver painel" estava escondido** (uma frase no rodapé do chooser). Agora cada um dos 5 cards tem duas ações: "Explorar vitrine →" e "Ver painel" — cada uma abrindo a versão certa (`?template=X`). Cards viraram `<div>` (antes o card inteiro era um `<a>`, não dava pra ter link dentro de link).
- **Painel do Arena Nove não abria** — o admin (`admin.js`) validava o `?template=` só contra `BUSINESS_PROFILES`, então `template=reservas` (que só existe em `TEMPLATES`) caía no default (Forno Alto). Mesma correção de 1 linha que já tinha feito no `backend.js`. Agora `admin/index.html?demo=1&template=reservas` abre a Arena Nove.
- Intro do chooser reforça: "cada modelo tem a vitrine e o painel administrativo — a mesma base gerencia todos, com dados isolados por negócio".

## V7.99.22 — Prisma: barbearia, 5ª vitrine (reservas) + 2 bugs de admin
**Bugs do admin (apontados pelo usuário)**
- **Selects com fundo branco no tema escuro** — os `<select>` do painel (filtros de Pedidos & Leads etc.) não tinham `appearance:none`, então o navegador mostrava o chrome nativo branco. Adicionado `appearance:none` + `background-color` escuro + seta SVG customizada.
- **Scroll horizontal no admin** — bug do CSS original: o checkbox oculto `.closed-check` (padrão `.toggle input{position:absolute;opacity:0}`) também casava com `.hours-row input{width:100%}`, virando um elemento `position:absolute` de 1351px de largura. Travado em `1px`.

**Serviços: Atelier 86 → Barbearia Norte**
- Trocado o nicho de "estética automotiva" (que coincidia com o de Veículos) por **barbearia**. Nova config, 6 serviços (corte, fade, barba, combo, acabamento, pigmentação), categorias e foto próprios. Copy do formulário de agendamento ajustada (era "Veículo / contexto" / "Corolla preto 2022"; agora "Preferência" / "barba na navalha").
- Card do chooser atualizado.

**5ª vitrine: Agenda & Reservas (Arena Nove)**
- Beach tennis & padel — **booking sem catálogo de produto**: o cliente reserva uma quadra por horário. Estruturalmente diferente das outras 4 (que são catálogo).
- Implementado reusando o motor `service_quote` (`config.businessType:'services'`), com um flag novo `bookingSlots:true` no template. Quando ativo, o formulário troca "Período (Manhã/Tarde)" por um **seletor de horário real** (07:00–22:00) e o campo de contexto vira "Quantas pessoas?".
- `backend.js` `resolveTemplate()` agora aceita chaves que existem só em `TEMPLATES` (não só em `BUSINESS_PROFILES`) — 1 linha, permite `?template=reservas`.
- Texto compartilhado do perfil `services` (`highlightsCopy`, `searchPlaceholder`) neutralizado para servir barbearia E reservas.
- 5º card no chooser (largura total, "Agenda & Reservas"). H1 do chooser: "Um motor. Negócios diferentes de verdade."
- `lib/data.js`: descrição do Prisma atualizada (4→5 verticais).

## V7.99.21 — Prisma: correção de regressões (ícones, admin, H1)
Feedback do usuário com o v7.99.20 no ar apontou 3 problemas:
- **Ícones apareciam como texto literal `<i class="wfi wfi-...">` nas vitrines.** Causa: a varredura de glifos que fiz nos outros modelos injetou HTML de ícone nos campos `icon:` do `data.js`/`app.js` do Prisma — mas esse produto renderiza esses valores com `escapeHTML()`, então o HTML virava texto. Solução: `data.js`, `app.js`, `core.js`, `backend.js`, `styles.css` e todo o `admin/` restaurados do original, e os glifos geométricos de categoria (◇ ◈ ○ ◌ ◫ ▣ ♨ ✦ ↗) trocados por **emoji contextual** (🍕👗🚗 já existiam; adicionados 🧵👚🚙🚐 🔍🔧💠🧴🧽 📲 etc.) — emoji passam por `escapeHTML` sem quebrar e são o padrão natural pra chip de categoria.
- **Painel Admin quebrado no mobile.** Bug do CSS original do Core Multinicho: a linha ~71 do `admin.css` redeclara `.admin-main{margin-left:var(--sidebar)}` SEM media query, anulando a regra mobile (`@media(max-width:700px){.admin-main{margin-left:0}}`) que vem antes. Resultado: no celular o conteúdo ficava espremido em ~145px com scroll horizontal. Corrigido com um bloco `@media(max-width:768px)` no fim do arquivo (ganha por ordem de cascata) + H1 do admin reduzido no mobile.
- **H1 das vitrines grande demais no mobile.** Os 5 clamps `clamp(~42px,12vw,~58px)` das media queries mobile baixados para `clamp(29px,8.4vw,40px)` (de ~45px para ~32px num iPhone).
- Extra: a vitrine (`vitrine.html`) tem barra de carrinho fixa embaixo, então o CTA flutuante "Quero saber mais" foi posicionado acima dela (`bottom:max(78px,...)`).

## V7.99.20 — Prisma: página "Escolha um modelo"
- Lacuna encontrada pelo usuário: o "Ver projeto" do Prisma só abria a vitrine de Alimentação (Forno Alto); Varejo/Automotivo/Serviços só existiam via `?template=...`, que ninguém digita sozinho — a história de "motor multi-nicho" não dava pra ser explorada de fato.
- `index.html` do Prisma virou uma página de escolha: 4 cards reais (Forno Alto · Alimentação, Áurea Store · Varejo, Nova Motors · Automotivo, Atelier 86 · Serviços), cada um com foto, pitch de uma linha e link direto pra sua vitrine.
- A vitrine multi-template (o antigo `index.html`) virou `vitrine.html?template=X`. Referências internas do admin (`admin/admin.js`, `admin/login.html`, `admin/login.js`) que apontavam pra `../index.html` atualizadas para `../vitrine.html`.
- Testado ponta a ponta: os 4 cards abrem a vitrine certa — inclusive confirmei que Automotivo (Nova Motors) tem uma 4ª direção visual própria (azul), diferente de Alimentação/Varejo/Serviços.
- CTA flutuante "Quero saber mais" também na página de escolha.

## V7.99.19 — Prisma, Átrio e Vitta: 3 modelos novos
**Prisma** (substitui o card "Cardápio Digital")
- O produto evoluiu de um cardápio único para um motor multi-nicho ("Core Multinicho V2.6"): o mesmo núcleo de pedidos/leads atende Alimentação, Varejo, Automotivo e Serviços via `?template=`, com direção visual própria por vertical (conferido: Alimentação e Serviços realmente têm layouts diferentes, não é reskin raso).
- Renomeado para **Prisma** (nome público — "Core Multinicho" era só codinome interno do arquivo README). Entrada de `lib/data.js` reescrita: `modeloUrl: '/modelos/prisma/index.html'`, `projectStatus:'modelo'`, tema visual próprio (`theme:'prisma'`, roxo/violeta — cor nova em `site.css`).
- `supabase-config.js` conferido: URL/chave ficam com o placeholder (`COLE_AQUI_...`), `isConfigured()` detecta isso e a vitrine cai em modo demonstração local automaticamente — zero chamada de rede quebrada.
- Varredura de glifos (→ ↗ ✓ ⌂ ✦ ● etc., incluindo os usados como `icon:` em `data.js`/`admin.js`) trocados por ícones; emoji de categoria (🍕🚗👗) mantidos — são pictogramas reais, não glifo fingindo ícone.
- Botão flutuante "Quero saber mais" adicionado ao `index.html` (único arquivo de vitrine — as 4 verticais são o mesmo HTML).
- Arquivos de teste/changelog internos (`test-core-v1.js`, `legacy-notes/`, `README*.txt`) não entraram no pacote público.

**Átrio (advocacia)** — novo modelo
- Fonte dos títulos trocada: o CSS já carregava "Instrument Serif" corretamente (não era bug de carregamento — conferido via `document.fonts`), só que o resultado ficava fashion-editorial demais pra "advocacia estratégica". Trocado por **Fraunces** (a mesma família usada na identidade da própria Webfun), em todo o sistema de títulos (hero, seções, timeline, portal do cliente) — resultado com mais autoridade, mantendo a paleta navy + dourado.
- Varredura de glifos (☰ ← → ✓) — zero glifo restante.
- Botão flutuante "Quero saber mais" nas 7 páginas de cliente (fora `admin.html`).
- Entrada nova em `lib/data.js`: `atrio-advocacia`, `modeloUrl`, tema `atrio` (navy/dourado) em `site.css`.

**Vitta (clínica médica)** — novo modelo
- Investiguei a fundo o motivo de "parecer genérico": achei que era CSS reaproveitado do Átrio sem reskin — **essa hipótese estava errada**, conferi a fundo e é um reskin completo e cuidadoso (verde profundo `#164c46` + areia, tudo — admin, portal do paciente, timeline — devidamente re-temizado, corrigindo uma suposição que eu mesmo tinha feito no meio da conversa).
- Achado real (confirmado via `getComputedStyle`): os campos do formulário de contato (`input`, `select`, `textarea`) ainda herdavam o fundo azul-marinho escuro do Átrio — só o `.auth-card input` do login tinha sido corrigido, o `.field` genérico usado em Contato não. Corrigido para os mesmos tons claros do resto da página.
- Fonte "Newsreader" também já carregava corretamente (mesma checagem via `document.fonts`) — não era bug.
- Varredura de glifos (☰ ← → ✓ ⌂ ◷ ▤ ♙ ✉ etc.) — zero restante. 4 ícones novos adicionados ao sistema (`wfi-list`, `wfi-mail`, `wfi-restore`, `wfi-diamond`) pra cobrir os que não tinham equivalente ainda.
- Botão flutuante "Quero saber mais" nas 7 páginas de cliente.
- Entrada nova em `lib/data.js`: `vitta-clinica`, `modeloUrl`, tema `vitta` (verde/areia) em `site.css`.
- **Pendente / próximo passo (não é bug, é direção):** a sensação de "genérico" que sobra é estrutural — Vitta compartilha o mesmo esqueleto (hero+card flutuante, grid numerado 01-04, checklist, preview do admin, timeline, CTA final) que Lume, Aura e Átrio, e usa uma foto de stock bem genérica no hero. Isso é uma conversa de direção de portfólio como um todo, não um conserto pontual — fica pra uma próxima rodada dedicada.

**Geral**
- 3 novos temas de cor em `app/styles/site.css` (`.v5-project-visual.theme-{prisma,atrio,vitta}`) para o card de portfólio funcionar sem imagem de mockup ainda (usa o fallback "janela de navegador" já existente no `ProjectVisualV4.js` — nenhum dos 3 tem o mockup composto notebook+tablet+smartphone que os outros projetos têm; entra como pendência separada).
- Build 48 páginas (+2 líquido: +3 novos projetos, -1 cardápio-digital removido). `check-project.mjs`/`preflight.mjs` OK.

## V7.99.18 — "Demos" → "Modelos" + CTAs direto pro WhatsApp
**Renomeação "demos" → "modelos"**
- Pasta `public/demos/` → `public/modelos/`. URL pública passa de `webfun.com.br/demos/lume/...` para `webfun.com.br/modelos/lume/...`.
- `lib/data.js`: campo `demoUrl` → `modeloUrl` (e todos os valores `/demos/...` → `/modelos/...`); `projectStatus:'demo'` → `projectStatus:'modelo'`; helpers `projectHref`/`projectLinkProps` atualizados.
- `app/projetos/[slug]/page.js` atualizado para o novo nome de campo.
- Redirect 301 `/demos/:path*` → `/modelos/:path*` em `next.config.mjs` — links antigos (indexados no Google, salvos em algum lugar) continuam funcionando.
- Rótulos visíveis "DEMO"/"demo" isolados (badge do painel admin da Aura, "Faturamento da demo" e código de pedido de exemplo na Farina 84, "Abrir/Ver no painel demo" no agendamento da Lume, "Acesso demo:" no Match) trocados por "MODELO"/"modelo". Textos com "demonstração/demonstrativo" como português corrido (não o termo em si) foram mantidos — são descrição, não rótulo.

**CTA flutuante nos modelos**
- Todas as 49 páginas de cliente dos 7 modelos (fora os `admin.html`) ganharam um botão flutuante fixo "Quero saber mais" (verde, canto inferior direito, ícone de balão de mensagem) que abre o WhatsApp da Webfun já com o nome do modelo no texto — ex.: "Olá, Webfun! Vi o modelo Lume e quero saber mais." CSS embutido no `style.css` de cada modelo.

**CTAs do site principal direto pro WhatsApp**
- Por pedido do cliente ("já tenho retorno melhor com WhatsApp do que formulário"): botão do header (desktop + mobile "Vamos conversar"), CTA do Hero da home ("Falar sobre meu projeto"), CTA do rodapé ("Começar meu projeto") e os CTAs de fim de seção em Projetos, Serviços, Serviços (página de cada serviço — menciona o nome do serviço na mensagem), Sobre e no bloco "Você se reconhece aqui?" da home agora abrem o WhatsApp diretamente, sem passar pelo formulário.
- Ficou de fora (continua indo pro `/contato`): o link "Contato" do menu (desktop e mobile) — é navegação para a página, não um CTA de conversão — e a própria página `/contato`, que segue existindo com o formulário para quem preferir detalhar o projeto por escrito.
- `lib/data.js` ganhou o helper `whatsappHref(mensagem)` para montar esses links sem repetir a URL do WhatsApp em cada componente.
- `components/Analytics.js` não precisou de alteração: o rastreamento de clique já é por `href` (qualquer link pra `wa.me` vira evento `whatsapp_click` automaticamente).

## V7.99.17 — Lume: logo nova
- Ícone da marca trocado pelo SVG enviado pelo cliente (`assets/brand-icon.svg`), aplicado como máscara CSS na cor `--blue` do próprio Lume (mesmo tratamento em qualquer fundo, claro ou escuro).
- Lockup "LUME / Odontologia Integrada" mais compacto: gap ícone↔texto 12px→10px, espaço entre as duas linhas 5px→2px.

## V7.99.16 — Farina 84: header desalinhado + botão invisível
- **Header mobile:** mesmo bug do Nexo — `.nav-links{margin-left:auto}` empurrava tudo pra direita, mas some no breakpoint (`display:none`) e nada substituía o empurrão. `.nav-actions{margin-left:auto}` adicionado no breakpoint. Conferido nos outros 6 demos: usam mecanismo mais robusto (`justify-content:space-between` ou `.brand{margin-right:auto}`) — só a Farina tinha o bug.
- **Botão "Meu pedido":** `.btn-light{background:white}` sem `color` — herdava o branco do `.hero{color:#fff}` → texto branco em botão branco (invisível). Adicionado `color:var(--ink)`.

## V7.99.15 — Demos: varredura de glifos → ícones
- **Todos os 7 demos** (aura, casa-serena, farina84, lume, match, nexo, noma): glifos Unicode usados como ícone (★ ✓ ↗ → ← ☰ ⚙ ♡ ♥ ⌄ ✦ ↑ ↓ ⌕ ◫ ⌂ ◎ ◷ ●) trocados por ícones SVG.
  - Lume já carregava lucide → usou lucide.
  - Os outros 6 ganharam um sistema de ícones em CSS `mask` (herda `currentColor` e tamanho), embutido no `style.css` de cada um (e no `admin.css` do Noma).
- **Mantidos:** `—` `–` (travessão/meia-risca, pontuação); `×` como sinal de multiplicação ("2× item", "4,6× ROI"); `→` como separador de intervalo de datas no Casa Serena ("check-in → check-out").
- Nenhuma mudança de layout — só troca de glifo por ícone.
- Pendente: revisão fina de UX/UI por demo (espaçamento, hierarquia, casos responsivos).

## V7.99.14 — Menu mobile + demos (lote 1)
**Site principal**
- Menu mobile: "Serviços" aparecia bem menor que os outros itens — uma regra antiga (`.v4-mobile-nav>a`, classe renomeada) ainda forçava `font-size:16px` só no `<button>` de Serviços. Removido; agora 24px como os demais.

**Demos**
- **Nexo:** hambúrguer mobile não ia pra direita (o `.nav-links{margin-left:auto}` que empurrava tudo some no breakpoint). `.nav-actions{margin-left:auto}`.
- **Noma:** campos do buscador com alturas diferentes (`min-height` 58 vs 54 + `<select>` sem normalização). `appearance:none` + `height` fixo + caret SVG.
- **Lume (completo):** logo circle+ → ícone de dente; H1 "Seu sorriso / em mãos / especializadas" em 3 linhas; todos os glifos (★ ✓ → ⌄ e o "W" do WhatsApp) trocados por ícones lucide (a demo já carregava a lib).
- Pendente: emoji→ícones + revisão de UX/UI nos outros 6 demos (aura, casa-serena, farina84, match, nexo, noma).

## V7.99.13 — Polimento dos heroes internos
- **Contato:** o olhal "Contato" ficava à esquerda do H1 centralizado — `#conteudo .v788-section-tag{margin-left:0!important}` (seletor de id) vencia a regra de centralização do hero. Re-centralizado com especificidade de id.
- **Sobre:** o hero fechava com ~180px de espaço morto antes da 1ª seção. `padding-bottom` do hero 40px + `padding-top` de `.v4-about-position` 52px — conteúdo "emenda" como na página Projetos.
- **Serviços:** a nota "6 FRENTES PRINCIPAIS" (hairline flutuando no hero centralizado, redundante com o subtítulo) foi removida. A lista de 6 serviços logo abaixo já comunica isso. Hero fechado (`padding-bottom:44px`).
- `check` + `build` (46 páginas) limpos.

## V7.99.12 — Alinhamento do CTA do header
- Botão "Vamos conversar" (`.v4-header-cta`): a `line-height` herdada empurrava os glifos pra baixo, deixando a seta `↗` (lucide, traço 2px) flutuando alta e fininha ao lado do texto peso 600.
- Fix: `line-height:1` no botão + `stroke-width:2.4` na seta. Centro vertical do texto e da seta agora coincidem (medido: delta 0px, antes ~2px).

## V7.99.11 — Leads: WhatsApp como canal único
- Destino de registro de leads (`CONTACT_WEBHOOK_URL` / `LEADS_FILE_PATH`) agora é **totalmente opcional**. Motivo: a hospedagem Node da Hostinger é containerizada — `LEADS_FILE_PATH` grava num filesystem isolado do gerenciador de arquivos e some no redeploy.
- `app/api/contact/route.js`: sem a trava de produção; webhook e arquivo viram **best-effort** (falha neles é logada e ignorada, a resposta continua `ok`).
- `components/ContactForm.js`: a tela "Conversa preparada" passa a depender **só** do handoff para o WhatsApp (que já abre com nome, e-mail, telefone e contexto). O POST para a API é registro em segundo plano e nunca mostra erro ao visitante.
- `scripts/preflight.mjs`: a ausência de destino de leads virou **aviso**, não erro — `npm run release` passa.
- `.env.example` e `DEPLOY.md` atualizados: leads = WhatsApp; para registro extra, preferir webhook.
- Remova a variável `LEADS_FILE_PATH` do painel da Hostinger (não faz nada de útil lá).

## V7.99.10 — Health check sincronizado
- `app/api/health/route.js` agora lê a versão do `package.json` (`pkg.version`) em vez de string fixa (`'7.91.0'`, desatualizada). Nunca mais dessincroniza — remove um item do checklist de release.

## V7.99.9 — Peso dos títulos 600 → 700
- Plus Jakarta Sans lê mais leve que o Google Sans nos tamanhos grandes; os títulos de display foram para **700** para recuperar autoridade.
- Flip no sistema de "peso único" que o projeto já tinha: tokens `--wf-heading-weight` / `--wf-weight-heading` / `--weight-display` / `--weight-heading` → 700 (o `--weight-card` fica 600); regra mestra `h1,h2,h3` → 700; overrides `!important:600` de títulos em media queries e o `.v54-hero-headline` do hero → 700.
- **Mantidos em 600:** os `<b>` de UI que se comportam como título mas são texto pequeno (pergunta do FAQ 19px, `.v41-human-signals b`, `.v5-proof-card b`, `.v71-system-copy>strong`) — 700 ali pesa e atrapalha a leitura.
- O `<em>` dos títulos de duas cores continua herdando o peso do título (cor muda, peso não) — comportamento já previsto no sistema.
- `check` + `build` (46 páginas) limpos.

## V7.99.8 — B-11 fechado: Google Sans removido
- Decisão do cliente: headings passam a usar **Plus Jakarta Sans** (fonte única do site).
- Google Sans e todo o carregamento externo de fontes removidos do `app/layout.js` (inclusive os `preconnect` para `fonts.googleapis.com` / `fonts.gstatic.com`).
- `--font-display` agora aponta para a mesma família auto-hospedada do corpo (`next/font`).
- Tracking de display reajustado (`-.05em` / `-.045em`) — Plus Jakarta Sans aceita um aperto um pouco maior que o Google Sans.
- Peso 800 adicionado ao carregamento (o CSS usa 800/850 em tags e botões).
- `V7.94-CHANGES.md` removido (teste tipográfico encerrado).
- **`preflight:prod` agora passa no item de fontes** — zero origem de terceiros no caminho crítico. Resta só a config de `CONTACT_WEBHOOK_URL`/`LEADS_FILE_PATH` (env de deploy).
- `check` + `build` (46 páginas) limpos.

## V7.99.7 — Auditoria de finalização, lote 4 (limpeza)
- **B-11 (parcial)** — `Plus Jakarta Sans` (corpo/UI) migrada para `next/font/google`: auto-hospedada, com métricas de fallback anti-CLS, sem requisição de render-blocking. O `<link>` do Google Fonts agora carrega **só o Google Sans** (headings). Falta o self-host do Google Sans para o `preflight:prod` passar — depende dos arquivos `.woff2` do cliente (ver `V7.94-CHANGES.md`) **ou** de aprovar trocar os headings para Plus Jakarta Sans.
- **B-12 — falso alarme.** O gradiente da signal strip já é azul→violeta (`#2563eb → #6d28d9 → #7c3aed → #8b5cf6`, `--wf-accent-gradient`), alinhado à identidade. O achado veio de uma string de sondagem truncada.
- **M-05** — a duplicação da lista de projetos (desktop + mobile) já é neutralizada por `display:none` no breakpoint (sai da árvore de acessibilidade). Ajuste feito: os dots do carrossel mobile em `FeaturedProjects` trocaram `role="tablist"/"tab"` (sem `tabpanel` correspondente) por `role="group"` + `aria-pressed`, alinhando com o padrão já correto dos carrosséis do hero.
- `check` + `build` (46 páginas) limpos.

## V7.99.6 — Auditoria de finalização, lote 3 (robustez de animação)
- **M-04** — `components/Reveal.js` reescrito sem framer-motion. Antes: `initial={{opacity:0}}` + `whileInView`, que podia deixar seções **presas invisíveis** se o `requestAnimationFrame` fosse suspenso (aba oculta, throttling, WebView). Agora:
  - Estado de repouso **visível** (`.wf-reveal` sem modificador) — sem JS / observer / rAF, o conteúdo aparece.
  - Transição em **puro CSS** (compositor, não depende de rAF).
  - Acima da dobra: aparece direto. Abaixo: anima na entrada via IntersectionObserver, com fallback por `scroll`/`resize` e um último recurso de 3s que só revela se o bloco estiver de fato visível (não estoura a animação de quem lê devagar).
  - `prefers-reduced-motion` respeitado no CSS e no JS.
- **B-13** — verificado: o autoplay dos dois carrosséis (`HomeHero`, `ProjectsHeroCarousel`) **já** não é armado quando `useReducedMotion()` é verdadeiro (o `setInterval` nem é criado), e pausa no hover/foco/toque. Nenhuma mudança necessária. Observação para o futuro: não há botão de pausa explícito (a pausa por foco de teclado cobre o essencial da WCAG 2.2.2).
- `framer-motion` continua como dependência (usado em `HomeHero`, `ProjectsHeroCarousel`, `PageTransition`).
- `check` + `build` (46 páginas) limpos.

## V7.99.5 — Auditoria de finalização, lote 2 (CSS + acessibilidade)
- **A-01** — removidos dois blocos `@media(min-width:901px)` que estavam aninhados dentro de `@media(max-width:560px)` em `site.css` (condição impossível → código morto). Eram cópias exatas de regras que já funcionam mais adiante no arquivo (~L7437 e ~L7643); layout de `/projetos` no desktop conferido: 3 colunas, filtros centralizados e azul — inalterado. Chaves do arquivo revalidadas (saldo 0, sem profundidade negativa).
- **A-02** — rótulos micro (`<small>` de numeração, olhais e legendas: FAQ, menu mobile, `.v4-page-hero-note`, etc.) estavam em ~2.3:1 sobre os fundos claros. Escurecidos para `#565b60` **apenas no tema claro** (agora 4.5–9:1). Tema escuro intocado.
- **M-08** — olhal de seção (`.v788-section-tag`) em `#2563eb` dava 3.84–4.45:1 sobre fundos claros. Trocado por `#1c47bf` no tema claro (5.7–6.9:1), mantendo leitura de marca.
- **M-07** — reavaliado: os dots de paginação do carrossel medem 28×32px (atendem o mínimo 24×24 da WCAG 2.5.8) e os demais alvos pequenos são links inline de texto (exceção da norma). Nenhuma mudança necessária.
- Sem mudança visual perceptível além do tom dos rótulos. `check` + `build` (46 páginas) limpos.

## V7.99.4 — Auditoria de finalização, lote 1
- Corrigido o warning React "unique key prop" no grid de projetos (`ProjectsGridV4`): conteúdo do tile extraído para o componente `ProjectTileContent`, filho único do `<Link>` (mesmo padrão de `FeaturedProjects`). Some o "1 Issue" do overlay dev em `/projetos`.
- `next.config.mjs`: adicionado `images.qualities: [75, 92, 94, 100]` — elimina os warnings de `<Image quality>` e previne erro de build no Next 16.
- `next.config.mjs`: `outputFileTracingRoot` ancorado na pasta do projeto — resolve o aviso "multiple lockfiles" causado por um `package-lock.json` solto em `C:\Users\flped`.
- Sem mudança visual. `npm run check` e `npm run build` (46 páginas) passam limpos.

## V7.96
- Internal hero tag center lock, 16px desktop navigation, mobile reading scale, bottom-aligned service CTAs and crisp normalized service previews.

## V7.94 — Typography test
- Google Sans for display headings.
- Plus Jakarta Sans for body/UI.
- Lexend removed from the application shell.


## V7.91 — Final QA / Release hardening
- Lock final de tags de seção em 16px.
- Melhorias de foco/ARIA no menu mobile e carrossel.
- Menos preload de imagens abaixo da dobra.
- Open Graph por página principal.
- Health/sitemap/package sincronizados.
- `preflight:prod` e `release` agora bloqueiam deploy sem destino de leads.
## V7.85 — Interaction reliability + optical edge cleanup
- Desktop Services mega-menu keeps a safe hover corridor plus 260 ms grace period, preventing premature close before link selection.
- Gradient CTA seams removed by painting through the full rounded edge; final CTA no longer uses a transparent 1 px border.
- Mobile/touch CTAs receive a gradient press state instead of relying on hover.
- Mobile section labels align to the exact heading axis.
- Hero “mais” is fully opaque and more saturated in dark mode.


## V7.84 — Floating CTA consistency
- “Vamos conversar” floating CTA icon moved to the right, matching every other CTA.
- Added the same blue → violet/lilac hover language used across the site.
- Preserved clean gradient edges, focus-visible and reduced-motion behavior.


## 7.82.0 — Senior UX/UI refinement
- Final visual hierarchy and spacing pass across Home and internal pages.
- Legacy lime signature removed from the visible UI; lilac is now the secondary accent.
- Contextual CTAs replace repeated copy; redundant Human-section CTA removed.
- Facilities composition flattened, service metadata reduced, hover motion softened.
- Desktop theme toggle simplified and CTA/header proportions refined.
- FAQ, cards, process and footer CTA typography/rhythm normalized.

## V7.70 — microinterações da Home + timeline do processo
- Facilidades: hover com elevação, realce azul e resposta sutil dos ícones.
- Focado em pessoas: microinterações em Entender rápido, Usar sem esforço e Confiar e agir.
- Nosso processo: substituição do grid rígido por timeline premium com seis etapas, ícones e progresso animado.
- Mobile/tablet: timeline vertical para preservar leitura e sensação de sequência.
- Movimento respeita prefers-reduced-motion.

## 7.69.0 — Mobile service hero stack fix
- Corrige definitivamente o hero de todas as páginas individuais de serviço no mobile.
- A regra de tablet em duas colunas não vaza mais para telas <= 760px.
- Ordem mobile padronizada: tag, H1, texto, CTA e mockup.
- Texto e H1 voltam a ocupar 100% da largura útil, sem colunas estreitas ou sobreposição com o mockup.
- Mockup fica abaixo do CTA, responsivo e sem card de fundo.
# V7.66 — Heading weight cascade fix

- Corrige regras antigas mais específicas que ainda mantinham H1/H2/H3 em 500 nas páginas internas.
- Padroniza semanticamente todos os H1, H2 e H3 em peso 600 no CSS de origem.
- Mantém tags, navegação, botões e textos corridos com seus pesos próprios.
- Adicionada verificação de auditoria: nenhuma regra de heading permanece explicitamente em 500.


## V7.65 — Heading weight system
- Padroniza H1, H2 e H3 em `font-weight: 600` em todo o site.
- Palavras destacadas dentro de headings herdam o mesmo peso, incluindo `mais` no hero.
- Títulos visuais de FAQ, sinais e cards de prova acompanham o mesmo peso 600.
- Mantém pesos de texto corrido, tags, botões e navegação independentes da hierarquia de títulos.

## V7.62 — 404 typography refinement
- Reduzido o H1 da página 404 de até ~180px para máximo de 112px no desktop.
- Ajustada a escala mobile para 58px e 52px em telas muito estreitas.
- Refinados line-height e tracking para manter impacto sem dominar a página.

# V7.60 — Portfolio Architecture & Direct Project Links

- Organizada uma fonte única de destino para os projetos: site real, demo funcional ou case interno como fallback.
- Página Projetos passa a priorizar clientes reais e produtos publicados antes dos estudos conceituais.
- CTAs/cards de clientes reais e demos abrem diretamente o projeto em nova aba, sem obrigar passagem pelo case com mockup repetido.
- Adicionada identificação discreta: Cliente real, Produto Webfun ou Projeto autoral.
- Filtros simplificados para Todos, Websites, Sistemas, E-commerce, Landing pages e Institucional.
- Criado `PROJECTS-CATALOG.md` com vitrine atual e acervo antigo aguardando revisão.
- Pousada e Serelepe ficam fora da vitrine pública enquanto offline; Pousada permanece como acervo de baixa prioridade por ser uma página de links simples.

# V7.15 — Image Card Hierarchy

- Refinada a tipografia dos cards com texto sobre imagem: labels 500, títulos 600, line-height mais respirado e overlays mais leves.

# V7.13 — Contact Contrast

- Corrigido contraste do card WhatsApp no modo claro da página Contato.
- Corrigido seletor legado que aplicava cor branca ao card errado após a inclusão da imagem na coluna lateral.
- Dark mode preservado.

# Changelog

## 7.5.0 — Premium-ready QA pass
- Criada uma camada final de consistência visual para reduzir conflitos herdados das versões anteriores.
- Piso de legibilidade elevado: textos funcionais, labels, cards, FAQ, formulários e metadados deixam de depender de microtipografia.
- Ritmo vertical, headings, espaçamentos e larguras de leitura harmonizados entre Home e páginas internas.
- Header e mega menu refinados com hierarquia mais calma e legível.
- Hero preserva a composição aprovada em três linhas, com copy e CTAs mais equilibrados.
- Cards de serviços, projetos, resultados, fit e processo recebem densidade, bordas, sombras e raios mais consistentes.
- FAQ, contato e footer ganham leitura e áreas de interação mais confortáveis.
- Mobile estabilizado com H1 de 40px, H2 de 40px e corpo mínimo legível.
- Removida quebra de linha forçada em heading secundário da seção de resultados.
- Identidade V7.4 preservada: Lexend, azul #2563eb, dark/light, mockups e direção editorial.

 — Webfun

Histórico consolidado das rodadas V5.1 até V7.4. Os arquivos individuais `README-V5.1.md` a `README-V7.4.md` foram removidos; este arquivo reúne o conteúdo de todos, do mais recente para o mais antigo.

## V7.4 — Final Typography & Brand Polish

- Nova logo oficial aplicada em light/dark usando os SVGs fornecidos.
- Novo favicon oficial aplicado em `app/favicon.ico`, ícones App Router, Apple Touch Icon e manifest/PWA.
- `theme_color` do manifest alinhado ao azul `#2563eb`.
- Segunda linha colorida/cinza dos headings mantém exatamente o mesmo peso tipográfico da linha principal.
- Removidas quebras de linha forçadas antes de `<em>` nos títulos editoriais; os headings agora quebram naturalmente conforme a largura disponível.
- `text-wrap: pretty` e limites de largura revisados para reduzir linhas curtas com espaço sobrando.
- Estrutura, layouts, mockups e conteúdo funcional preservados.

**Validação:** `npm run validate` aprovado — 51 arquivos de código verificados, 20 assets locais referenciados, 7 mockups reais configurados, imports/CSS/scripts/fonte OK, preflight de produção OK. Build/Lighthouse seguem dependentes de instalação em ambiente com acesso ao registry npm.

**Pendente conhecido:** nenhum. Os 14 projetos do portfólio têm mockup real desde a rodada de limpeza pós-V7.4 (Voltta foi substituído pelo conceito Pulse). Ver `README.md` para detalhes.

## V7.3 — Typography + Blue Accent

Rodada de teste focada em coerência tipográfica e contraste da cor principal.

- Cor de destaque alterada para `#2563eb` (antes, verde-limão `#c9ff42`).
- Todo elemento com fundo azul usa texto branco para contraste.
- Hierarquia tipográfica normalizada: display 650, heading 600, card 600, body 400, UI 550–600.
- Segunda linha cinza de títulos (`em`) reduzida para peso 440, sempre subordinada ao título principal.
- Mega menu deixou de parecer 800/900: títulos 550–600 e descrições 400.
- Navegação e CTAs usam peso de UI, não peso de título.
- Sombras dos elementos azuis atualizadas para remover o antigo tom esverdeado.
- Dark mode segue a mesma regra azul + branco.
- Objetivo: validar visualmente a paleta azul tradicional da Webfun sem alterar a estrutura aprovada do site.

## V7.2 — Final Refine

- Logo limpa no tema claro, sem card preto.
- Item "Início" adicionado aos menus desktop/mobile e ao rodapé.
- Pessoas no Centro usa os WebPs 1448px sem reprocessamento do Next para preservar nitidez.
- Heros das páginas de serviço agora usam mockups reais relacionados ao serviço (antes, composição genérica).
- Cards de resultados foram refeitos com ícones, microcopy e melhor aproveitamento vertical.
- Hero da Home preservado.

## V7.1 — Final UX Coherence Pass

A V7.1 fecha os pontos visuais e de usabilidade identificados após a V7.0, sem alterar o hero aprovado.

- Cards de serviços deixam de usar wireframes abstratos e passam a apresentar mockups reais do portfólio, com ícone e contexto de cada serviço.
- Logo no header light ganha uma placa compacta em ink usando a versão oficial branca + verde, melhorando a leitura do símbolo sem alterar a cor oficial da marca.
- Banco de fotos humanas foi reexportado a partir dos PNGs originais em WebP quality 92; a galeria Pessoas no Centro solicita quality 90 ao Next Image.
- Seção Resultado na prática foi reconstruída: remove as janelas flutuantes abstratas e passa a combinar copy, fotografia e fluxo claro Apresentar → Converter → Operar → Evoluir.
- Cards do processo agora usam fotografias reais/contextuais em cada etapa.
- Carrossel de projetos no mobile recebe controles imediatamente abaixo do mockup. Os tabs distantes são ocultados no mobile, eliminando o vai-e-volta de scroll para trocar projeto.
- Piso tipográfico corrigido em Pessoas no Centro e Footer: textos de leitura deixam de operar em 12px.
- Hero não foi alterado.

## V7.0 — Production Candidate

Release candidate de produção.

1. Nova marca oficial em SVG para light/dark.
2. Mockups reais adicionados ao portfólio sem alterar o hero.
3. Featured Projects passa a priorizar projetos que já possuem mockup real.
4. Captura persistente de formulário via `/api/contact`, com honeypot, validação e limitação básica por IP.
5. Webhook opcional para automação/CRM.
6. GA4 opcional condicionado ao consentimento do visitante.
7. Search Console preparado por variável de ambiente.
8. `next/font` para Lexend, removendo dependência de Google Fonts em runtime.
9. `next/image` em fotografias editoriais e previews do portfólio.
10. SEO expandido com Open Graph por projeto/serviço, BreadcrumbList, Service e CreativeWork.
11. Sitemap com data de release estável e robots bloqueando `/api/`.
12. CSP, HSTS em produção e headers adicionais de segurança.
13. Endpoint `/api/health` para validação pós-deploy.
14. Remoção de CSS morto do antigo hero V4 e documentação antiga da release.
15. Scripts de preflight e Lighthouse adicionados.

## V6.3 — Final visual polish

- Logos oficiais em SVG aplicados em header, menu mobile e footer, com troca automática light/dark.
- Hero simplificado no código: somente copy, mockup transparente e dots do carrossel.
- Removidos do DOM os cards, contador e setas antigos do hero que já estavam escondidos por CSS.
- Removidos os antigos cards de prova abaixo do hero para reduzir ruído e linguagem técnica.
- Copy da Home, Sobre, Serviços e Contato encurtada e tornada mais comercial.
- Ajuste final de legibilidade para labels/metadados no desktop.
- Acessibilidade dos tabs do carrossel de projetos refinada.
- Metadata principal atualizada para o posicionamento comercial atual.
- Pendente (na época): inserir os mockups/previews finais dos projetos que ainda usam composição genérica.

## V6.2 — Conversion Pass

- Hero com benefício mais concreto e CTA "Falar sobre meu projeto".
- Projetos movidos para cima, logo após o hero/signal rail.
- Seção de serviços reposicionada como problemas que a empresa precisa resolver.
- Pessoas no Centro com linguagem de uso real, menos jargão de UX.
- Bloco de sistema convertido de discurso técnico para resultados de negócio: vender, atender, operar e crescer melhor.
- "Faz sentido para" reescrito em primeira pessoa, para gerar identificação rápida.
- Processo simplificado para Conversa → Direção → Construção → Publicação & evolução.
- FAQ e CTA final com linguagem mais comercial e objetiva.
- Nenhuma métrica, cliente ou resultado foi inventado.

## V6.1 — Brand Refresh

- Logo oficial horizontal no header, menu mobile e footer.
- Versão preta no tema claro e branca no tema escuro.
- Símbolo verde preservado nas duas versões.
- Favicon oficial aplicado via `app/favicon.ico` e `app/icon.png`.
- Apple Touch Icon criado a partir do favicon oficial.
- Ícones PWA 192×192 e 512×512 adicionados ao manifest.
- Manifest atualizado com a nova cor de marca.

## V6.0 — Human Content Pass

- Home: galeria 2x2 de "Pessoas no Centro" substituída por fotos editoriais de uso real de tecnologia.
- Sobre: imagem principal e galeria atualizadas com colaboração, planejamento e contexto de produto.
- Serviços: nova seção editorial "No mundo real" com trabalho em notebook e análise de dashboard.
- Contato: imagem humana integrada à coluna de informações sem substituir os caminhos de contato.
- 6 imagens PNG originais convertidas para WebP otimizado (aprox. 55–86 KB cada).
- Dark mode e responsividade contemplados nas novas seções.

## V5.9 — Typography + Signal Marquee

- Removidos os círculos decorativos dos cards "Faz sentido para", evitando falsa aparência de elemento clicável.
- Escala tipográfica desktop revista: corpo principal 16px, apoio 15px, UI 15px, labels/meta 13px e microdados 12px apenas quando não essenciais.
- Faixa de serviços abaixo do hero transformada em marquee/carrossel contínuo, automático e infinito em desktop e mobile.
- Movimento pausa no hover e respeita `prefers-reduced-motion`.

## V5.8 — Dark contrast + carousel controls

- Catálogo de serviços no modo escuro: hover permanece dentro da paleta dark.
- Círculos de ação do catálogo com cor explícita, visíveis no dark.
- Checks de círculo verde-limão com foreground escuro explícito e maior contraste.
- Reforço geral de contraste no tema escuro (títulos, texto auxiliar, números, divisórias).
- Setas dos carrosséis de Serviços e Processo centralizadas no desktop; setas de Projetos em destaque em linha centralizada abaixo dos tabs.

## V5.7 — Hero + Pessoas no Centro

- Hero desktop começa 20px antes.
- Modo escuro: removido o painel/background atrás do mockup transparente do hero.
- H1 do hero mobile com teto de 40px (fallback 38/36px em telas muito estreitas).
- Pessoas no Centro: 2 colunas no desktop (conteúdo editorial + grid 2x2 de imagens); mobile empilha.

## V5.6 — Tipografia, Pessoas e Projetos

- Nova hierarquia tipográfica global e pesos racionalizados (display 600, títulos 540–600, corpo 400, UI 650–700).
- Mobile: H1 principal a 44px (42px em telas estreitas), H2 de seção a 36px.
- Pessoas no Centro reorganizada em três áreas no desktop.
- Projetos em Destaque com painel lateral mais informativo, card ativo em verde-limão, autoplay a cada 5,2s (pausa em hover/foco/redução de movimento).

## V5.5 — Hero Clean

- Removidos cabeçalho, contagem, cards informativos e setas do hero no desktop; mantidas só as dots.
- Mockups passam a usar os WebP transparentes finais.
- Transição em fade suave, sem movimento vertical.

## V5.4 — Hero desktop refinado

- Removido o card branco ao redor do mockup; mockup flutua sobre o fundo do hero.
- Navegação do carrossel mais discreta; troca de projeto só com fade.
- Autoplay pausa em hover/foco. Informações de destaque personalizadas por projeto.

## V5.3 — Hero Carousel

- Hero substituído por carrossel com 7 mockups reais: Nexo, Farina 84, Casa Serena, Noma, Match, Aura e Lume.
- CTA secundário "Ver projetos" adicionado. Autoplay com setas e indicadores.

## V5.2 — Focused visual fixes

- Mega menu com hierarquia de tamanho revisada (16px/14px).
- Toggle Light/Dark mobile só com ícone.
- H1 da Home preservado em três linhas.
- CTA "Vamos conversar" em verde-limão.
- Hero reorganizado com `client-phone-wide.webp`.
- Contato com grid 2x3 e novo card de atendimento nacional.

## V5.1 — Navegação, contraste e Sobre

- Header fixo com fundo translúcido após rolagem.
- Mega menu de Serviços no desktop + submenu mobile.
- Ordem de navegação: Sobre → Serviços → Projetos → Contato.
- Toggle Claro/Escuro no header mobile.
- Accent global em teste: `#c9ff42` (verde-limão — depois substituído pelo azul na V7.3).
- Página Sobre com nova composição editorial.

## 7.6.0 — Brand system + production QA
- Mantém `#2563eb` como azul funcional principal da Webfun.
- Introduz `#c9ff42` apenas como assinatura visual pontual (dots/linhas de memória), sem competir com CTAs azuis.
- Eleva a escala mínima da microtipografia visível e normaliza textos de apoio em 15–16px.
- Corrige a seção “Nossa posição” da página Sobre para o padrão vertical tag → título → texto.
- Reforça consistência de pesos, controles, formulários, footer e estados de foco.
- Adiciona tratamento explícito para `prefers-reduced-motion`.

## V7.14 — Founder / human trust
- Added the “À frente da Webfun” section to About with a real founder portrait and responsive light/dark treatment.

## V7.18 — Desktop grids
- Serviços da Home: 6 cards em grid 3x2 no desktop; carrossel apenas abaixo de 901px.
- Adicionado UX/UI & produto digital como sexta frente.
- Como funciona: 4 cards em grid no desktop; carrossel apenas abaixo de 901px.

## V7.61 — Organização do portfólio e limpeza dos cases
- Reordenada a vitrine de `/projetos`: AZAFF abre a sequência, seguida por Mapear, Mielke e demais projetos reais antes dos estudos autorais.
- Cases internos deixaram de repetir o mesmo mockup em uma segunda seção de detalhes.
- Cases com site/demo disponível agora exibem CTA direto “Ver projeto”.
- O CTA de próximo projeto também leva ao destino real/demo quando disponível.
- Páginas de case permanecem apenas como conteúdo editorial/SEO, sem serem um pedágio obrigatório para acessar o trabalho.

## V7.67 — Páginas individuais de serviços
- Padronização das 6 páginas individuais de serviços com a mesma arquitetura visual.
- Hero com mockup solto, sem card/fundo colorido.
- Escopo convertido em grid de cards com ícones e descrições contextuais.
- Seção "Quando faz sentido" refinada para uma linguagem visual mais calma e editorial.
- Seção de resultados transformada em composição premium com fotografia humana + resultados em linhas abertas.
- Fotografias contextuais específicas por serviço para reduzir repetição de cards e trazer vida às páginas.
- Banner "Outra frente" removido e substituído por "Serviços relacionados" com três links editoriais.
- Responsividade e dark mode contemplados no mesmo padrão para todas as páginas.
## V7.68 — Service hero rhythm + back to top
- Removed the redundant “Todos os serviços” link from individual service heroes.
- Replaced numeric hero labels with meaningful service-specific tags.
- Tightened hero spacing and aligned the composition with the Home hero language.
- Forced the first service H1 to a deliberate two-line desktop composition.
- Differentiated the Landing Page icon from the Website icon in service scope cards.
- Added a discreet “Voltar ao topo” control to the footer across the site.


## V7.71 — Prova social editorial + hero mais direto
- Nova seção de depoimentos logo após Projetos, com fundo escuro e composição editorial assimétrica.
- Depoimentos reaproveitados do material antigo fornecido pelo cliente (Adriano de Liz, Felippe Davet e Flávia Veras Sussenbach).
- Hero: subheadline simplificada para uma linguagem mais objetiva: sites, lojas e sistemas para vender mais e trabalhar melhor.
- Microinterações sutis nos cards de depoimento e adaptação mobile/dark-first da seção.

## V7.72 — Timeline serpentina 3 + 3
- Timeline desktop reconstruída em duas linhas de três etapas, mantendo leitura 01→02→03 e retornando 04→05→06 em formato serpentina.
- Caminho em “S” invertido com trilho neutro e preenchimento azul progressivo ligado ao scroll.
- Nós e ícones são ativados conforme o progresso da rolagem, preservando microinterações no hover.
- Tablet e mobile continuam com timeline vertical, agora também com preenchimento progressivo conforme o scroll.
- Mecânica adaptada do modelo HTML fornecido pelo cliente, preservando a identidade visual Webfun.


## V7.73 — Roadmap de processo 3×2
- Timeline serpentina removida após revisão visual; novo modelo prioriza alinhamento, leitura e sensação mais amigável.
- Desktop: roadmap em 2 linhas de 3 etapas, com painel único, ícones alinhados e progresso horizontal 01–06 preenchido em azul conforme o scroll.
- Cada etapa reage progressivamente ao scroll com acento lateral, ícone ativo e fundo sutil, sem depender de uma linha geométrica entre os cards.
- Mobile: leitura vertical com trilho simples à esquerda, mantendo a sequência 01→06 e evitando qualquer sobreposição.
- Dark mode, hover e prefers-reduced-motion preservados.


## V7.74 — Human section rhythm + active client avatars
- Equalized the desktop gutter between the Focado em pessoas copy column and the 2x2 image gallery.
- Added the supplied João, Flávia and Jean avatars to social proof.
- Flávia keeps the existing testimonial; João and Jean are identified only as active clients until exact testimonial copy is supplied.

- V7.75: ajustados depoimentos com nomes e empresas reais (João Kühl, Flávia Sussenbach e Jean Mielke); removidos placeholders de 'cliente ativo'; reforçada a qualidade de carregamento das imagens da seção 'Focado em pessoas' com quality 100 e prioridade nas primeiras imagens.


## V7.76 — social proof + human gallery final polish
- Depoimentos de Flávia, João e Jean foram encurtados e humanizados, mantendo o sentido do material antigo fornecido e evitando linguagem promocional artificial.
- A seção `Focado em pessoas` recebeu uma seleção visual mais forte e variada: colaboração, uso real de celular, trabalho no notebook e leitura de dashboard.
- As quatro imagens agora são servidas sem reprocessamento do Next Image (`unoptimized`) para preservar os WebPs originais de 1448×1086.
- Removido o `translateZ(0)` que podia suavizar a rasterização em alguns navegadores; hover preservado com escala discreta.

- V7.77: novo sistema cromático de apoio (violeta/lilás) mantendo o azul #2563EB como cor principal; marquee do hero e progresso do processo ganham gradientes pontuais; CTA final redesenhado com gradiente lilás-violeta-azul e composição cinética baseada no símbolo WebFun, removendo a ilustração genérica; primeira visita agora inicia em modo escuro, preservando escolhas de tema salvas pelo visitante.

- V7.78: teste de CTA cromático — ações principais permanecem azuis em repouso e transitam para azul/violeta/lilás no hover; CTA final mantém gradiente fixo como ponto de clímax.

- V7.79: criado ritmo cromático por capítulos: Facilidades em lilás suave, depoimentos com acentos violeta, terceiro bloco de dores em gradiente, Processo como clímax escuro com progressão azul-violeta-lilás e FAQ em lilás sutil. Azul permanece como cor principal de ação.

## V7.80 — Theme-aware CTA + gradient edge cleanup
- CTA final agora respeita o tema: luminoso lilás/azul no claro e grafite/roxo profundo no escuro.
- CTA do navbar desktop ficou mais compacto, com menos padding horizontal e ícone menor.
- Bordas que brigavam com superfícies em gradiente foram removidas/neutralizadas.
- Cards/ícones com gradiente deixam o próprio preenchimento definir a borda visual.
- Focus ring acessível foi preservado independentemente da borda decorativa.

- V7.81: padronização global dos CTAs: hover em gradiente azul→violeta→lilás em todos os botões de ação principais/secundários, ícones travados à direita e exceção intencional para o botão flutuante do WhatsApp com ícone à esquerda.

- **V7.83:** footer utility alignment, readable tags, related-service card padding, service CTA gradients, chromatic mega-menu, and gradient cards on Contact/About.

## V7.86
- Standardized major section tags at 15px with exact title alignment.
- Normalized Clientes label casing.
- Neutralized Facilidades and FAQ section/card surfaces.
- Locked CTA hover/active gradient and border behavior site-wide.
- Removed edge seams from expressive gradient cards across Home, Contato and Sobre.


## V7.87
- Process section informational accents moved from lilac to WebFun blue: section tag, step labels, active progress markers and active icons.
- Testimonial card accents moved from violet to blue: quote icon, stars, avatar ring/glow and hover treatment.
- Lilac remains reserved for atmospheric gradients and selected expressive surfaces.

## V7.89
- Added subtle theme-aware depth to the Home hero background.
- Made Services mega menu fully opaque.
- Simplified dark mega menu to graphite + WebFun blue for cleaner readability and visual consistency.


# V7.90 — Final visual system pass

- Hero ganhou iluminação espacial azul/violeta mais perceptível, mantendo leitura e performance.
- Tag do hero alinhada ao H1 e todas as tags de seção travadas em 16px.
- Palavra “mais” no dark agora usa azul sólido; underline reposicionado para não colidir com a linha “site”.
- Processo desktop sem timeline superior; progresso passa para uma linha azul no topo de cada card ao entrar no scroll.
- Ícones de “Focado em pessoas” agora usam fundo azul e glyph branco.
- Gradiente dos CTAs recalibrado para predominância azul e lilás apenas no fechamento.
- Mega menu claro segue o mesmo padrão do escuro: ícones neutros em repouso e tile azul no hover.
- FAQ desktop reorganizado em duas colunas reais de perguntas, eliminando espaço morto.
- Ícone central do CTA final passou de preto para azul em ambos os temas.

## V7.92 — Final micro polish
- Corrigido o azul de “mais” para o `#2563EB` oficial da WebFun em ambos os temas.
- Sublinhado no tema claro reposicionado/encurtado para não tocar o ponto do “i” de “site”.
- Mega menu desktop agora só abre ao entrar no pill Serviços; a ponte invisível só passa a existir depois da abertura.


## 7.93.0
- Final mobile/nav polish: crisp header vectors, compact carousel dots, stacked service tags, blue→violet CTAs, centered mobile back-to-top, blue FAQ active state.

## V7.95
- Internal hero alignment, mobile readability and 2x3 services catalog card grid.

- V7.97: internal hero tag center lock, navbar 15px, CTA spacing/icon rhythm, smaller orbit core.

## V7.98
- Mobile hero/project dots standardized to the compact service-carousel pattern: tiny inactive dots + blue active capsule, with large invisible touch targets.
- Hero mockup carousel moved closer to the secondary CTA on mobile.
- “Focado em pessoas” mobile section now uses equal 76px top and bottom padding.

## V7.99.2
- A logo do header e do footer agora é um único SVG inline, eliminando a sobreposição de duas imagens e a rasterização suave no header fixo.
- Os ícones de lua, sol e sistema agora são SVGs inline próprios em uma malha exata de 24px, sem dependência de componentes que possam criar camadas intermediárias.
