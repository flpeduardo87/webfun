# Deploy — Hostinger / webfun.com.br

A hospedagem informada suporta Next.js e Node 18/20/22/24. Para esta release, use **Node.js 22**.

## 0. Antes de trocar o site atual

1. Faça backup integral do site atual e do `public_html`.
2. Guarde qualquer `.htaccess`, redirecionamento ou configuração existente que ainda seja necessária.
3. Não altere nameservers: o domínio já está apontando para a Hostinger conforme as informações fornecidas.
4. Faça o primeiro teste da aplicação Node antes de remover definitivamente a versão antiga.

## 1. Enviar o projeto

Envie os arquivos desta pasta para a raiz configurada para a aplicação Node do domínio. Não envie `node_modules` nem `.next` de outra máquina.

## 2. Node

Selecione Node.js **22.x**.

## 3. Variáveis de ambiente

Cadastre conforme `.env.example`. **Todas são opcionais.**

Recomendado antes do lançamento:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=...
```

**Leads:** o canal principal é o handoff do formulário para o WhatsApp — o formulário
funciona e mostra "Conversa preparada" mesmo sem nenhuma variável de lead. Para um
registro extra, configure `CONTACT_WEBHOOK_URL` (Make/Zapier/n8n/Supabase). Evite
`LEADS_FILE_PATH` em Node containerizado (o arquivo fica isolado e some no redeploy).

## 4. Instalar, validar e construir

```bash
npm install --no-audit --no-fund
npm run validate
npm run release
```

`npm run release` executa a validação de produção (incluindo destino de leads) e o build. Ele precisa terminar sem erro antes da troca do site.

## 5. Inicialização

Comando de start:

```bash
npm start
```

A porta é fornecida pelo ambiente Node da hospedagem; não fixe `PORT` no código.

## 6. Domínio

Canonical definido no projeto: `https://webfun.com.br`.

Configure `https://www.webfun.com.br` para redirecionar permanentemente (301) para `https://webfun.com.br`, evitando duas versões indexáveis do mesmo site.

Confirme SSL antes de habilitar o tráfego definitivo. O HSTS desta release só é enviado em produção.

## 7. Smoke test pós-deploy

Abra:

- `/`
- `/sobre`
- `/servicos`
- `/projetos`
- `/contato`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`

Teste tema claro, escuro e sistema; menu mobile; carrosséis; mockups; formulário e WhatsApp.

## 8. Captura de leads

Envie um formulário de teste e confirme que:

1. o WhatsApp abre com a mensagem preenchida (nome, e-mail, telefone, contexto);
2. a tela mostra "Conversa preparada";
3. se `CONTACT_WEBHOOK_URL` estiver configurado, o fluxo externo recebeu o JSON do lead.

## 9. Analytics e Search Console

- GA4 só carrega após o visitante aceitar analytics.
- Cadastre a propriedade do domínio no Search Console.
- Configure `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` se usar verificação por meta tag.
- Envie `https://webfun.com.br/sitemap.xml` ao Search Console.

## 10. Lighthouse

Com a versão de produção rodando:

```bash
LIGHTHOUSE_BASE_URL=https://webfun.com.br npm run lighthouse
```

Os relatórios são gerados em `reports/`.

Metas:

- Performance: >= 90 desktop e idealmente >= 85 mobile.
- Accessibility: >= 95.
- Best Practices: >= 95.
- SEO: >= 95.
- LCP < 2,5 s.
- CLS < 0,1.
- INP < 200 ms.
