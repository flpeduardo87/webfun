# Webfun V7.91 — QA final

Release de hardening sobre a V7.90. Não redesenha o site: fecha inconsistências antes da publicação.

## Ajustes aplicados no QA

- Tags semânticas de seção travadas em 16px com prioridade suficiente para vencer overrides históricos.
- Submenu mobile de Serviços deixa de manter links invisíveis focáveis quando fechado.
- Controles do carrossel do hero recebem área de toque maior sem aumentar visualmente os dots.
- ARIA do carrossel simplificado para botões `aria-pressed`, evitando padrão de tabs incompleto.
- Fotos abaixo da dobra na seção humana deixam de ser preloaded como prioridade.
- `Voltar ao topo` respeita `prefers-reduced-motion`.
- Open Graph/Twitter específico para Sobre, Serviços, Projetos e Contato.
- Sitemap, versão do health check e versões de pacote sincronizadas com a release.
- Preflight de produção separado e obrigatório em `npm run release`.

## Validação ainda obrigatória após publicação

O QA de código não substitui o smoke test no domínio real. Depois do deploy, validar em Safari iOS e Chrome Android reais, formulário real, redirects, SSL, console e Lighthouse.
