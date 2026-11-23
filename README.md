# Webfun — V7.8 Premium QA

Site institucional da Webfun em Next.js, consolidado para publicação na Hostinger com foco em conversão, portfólio, responsividade, SEO, acessibilidade, captura de leads e performance.

Versão atual: **V7.16**. Azul `#2563eb` permanece como cor funcional principal da Webfun e o lime `#c9ff42` fica restrito a pequenos pontos/indicadores de assinatura. A rodada V7.8 corrige contraste do mega menu, reforça o hero de Projetos, melhora a nitidez dos mockups prioritários, normaliza a hierarquia dos cards com imagem, corrige ícones no dark, resolve a sobreposição dos números e instala a marca oficial (logo preta no light, branca no dark e símbolo como favicon).

Consulte `CHANGELOG.md` para o histórico completo desde a V5.1.

## Estado desta versão

- Nova marca oficial (SVG) em light/dark, com favicon, ícones PWA e Apple Touch Icon atualizados.
- Cor de destaque: azul `#2563eb` — todo elemento com fundo azul usa texto branco para contraste.
- Home, Sobre, Serviços, Projetos e Contato responsivos.
- Light / Dark / System.
- Formulário registra o lead no backend antes/em paralelo ao fluxo para WhatsApp.
- GA4 opcional com consentimento explícito.
- Search Console preparado por variável de ambiente.
- SEO: metadata, canonical, Open Graph, sitemap, robots e dados estruturados.
- Headers de segurança e endpoint de saúde.
- Imagens editoriais e mockups locais em WebP; imagens de conteúdo usam `next/image` quando aplicável.

**Portfólio completo:** os 14 projetos têm mockup real (`preview`) em `lib/data.js`. O projeto Voltta foi substituído por um novo conceito Pulse (fitness/landing page, Webfun Lab), mantendo o slot de destaque. A grade `/projetos` ordena por preview real primeiro (irrelevante agora que todos têm — mas o código de priorização em `ProjectsGridV4.js` continua ativo para qualquer projeto futuro sem mockup).

Nota de estilo (mantida do registro anterior): os previews de AZAFF (flat lay de estúdio) e Caminhos de Luz Kids (celular na mão) usam composição diferente do padrão notebook+tablet+phone flutuante dos demais — decisão deliberada, adequada ao tipo de cada projeto.

## QA final (pré-deploy)

Passagem de QA visual + acessibilidade de contraste em toda a base:

**Correções pontuais do review visual:**
- `.v51-about-gallery` ("Projetamos para quem vai usar de verdade") sem padding superior — corrigido em desktop/tablet/mobile.
- Card de legenda sobre a foto principal dessa seção esticava de ponta a ponta (`right:18px` fixo) — agora tem largura própria, como um card, não uma barra.
- Cards de "Princípios" (Sobre) tinham espaço vazio entre o texto e o fim do card — o número (01-04) virou um numeral decorativo grande em baixo-relevo no fundo do card, preenchendo o espaço com intenção em vez de deixar vazio.
- Botão "Falar sobre meu projeto" do rodapé com texto escuro sobre fundo azul — corrigido para branco.

**Varredura sistêmica de contraste (achado durante o QA, não pedido originalmente):** a troca do destaque de lime para azul (V7.3) não tinha sido aplicada em todos os lugares — histórico do projeto no `CHANGELOG.md` estava incorreto nesse ponto. Encontrados e corrigidos **mais de 45 elementos** com texto ou ícone escuro sobre fundo azul (contraste insuficiente), incluindo: nav pills, badge de CTA do header mobile, pontos ativos de navegação, ícone de sucesso do formulário de contato, banner de cookies, cards de "Qualidade de base" (princípios), "Tecnologia sem teatro" (sistema), cards de contato, tab ativa do showcase de projetos, botão secundário no hover, ícones de escopo de serviço, e o ícone "+" do FAQ ao abrir.

**Outro achado:** a imagem de Open Graph (`app/opengraph-image.js`) — a que aparece ao compartilhar o link do site no WhatsApp/redes sociais — ainda usava o lime antigo, por ser gerada fora do pipeline de CSS. Corrigida para o azul atual.

Nenhum desses itens muda estrutura, copy ou layout — são todos ajustes de cor/espaçamento pontuais, seguros de aplicar sem novo ciclo de aprovação visual.

A folha de estilos de produção está consolidada em `app/styles/site.css`. O arquivo preserva comentários de origem e a ordem histórica da cascata, mas o layout importa **um único CSS**, reduzindo o risco de divergência por múltiplos imports durante manutenção.

A V7.8 mantém CTAs, estados de ação e linhas funcionais em azul. O lime aparece apenas em pontos/indicadores pequenos de assinatura, evitando uma interface bicolor sem regra. A marca oficial alterna automaticamente entre logo preta (tema claro) e branca (tema escuro), enquanto o símbolo oficial abastece favicon/PWA.

## Requisitos

- Node.js 20 ou superior.
- Recomendado: Node.js 22.
- npm 10+.

## Desenvolvimento

```bash
npm install
npm run validate
npm run dev
```

Abra `http://localhost:3000`.

## Produção

```bash
npm install --no-audit --no-fund
npm run validate
npm run build
npm start
```

Health check: `/api/health`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` no desenvolvimento ou cadastre as variáveis no painel da hospedagem.

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4, opcional.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: Search Console, opcional.
- `LEADS_FILE_PATH`: caminho privado para o arquivo JSONL de leads. Recomendado em produção.
- `CONTACT_WEBHOOK_URL`: webhook opcional para Make, n8n, Zapier, Supabase Edge Function ou CRM.

Sem `CONTACT_WEBHOOK_URL`, o formulário continua registrando leads em arquivo. Sem `LEADS_FILE_PATH`, usa `./storage/leads.jsonl`.

## Scripts

```bash
npm run check       # estrutura, imports, assets e CSS
npm run preflight   # pré-requisitos da release
npm run validate    # check + preflight
npm run build       # build Next.js
npm run lighthouse  # Home, Projetos e Contato; servidor deve estar rodando
npm run audit:prod  # auditoria npm de produção
```

Consulte `DEPLOY.md`, `QA.md` e `RELEASE-CHECKLIST.md` antes de trocar o site atual.
