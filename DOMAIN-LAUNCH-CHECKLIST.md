# WebFun — Domain launch checklist

## Before switching DNS/domain
- [ ] Upload/deploy V7.30 and run `npm install --no-audit --no-fund`.
- [ ] Run `npm run validate`.
- [ ] Run `npm run build`.
- [ ] Start production and confirm `/api/health` returns `ok: true` and version `7.30.0`.
- [ ] Confirm light/dark logos, mobile menu, hero swipe, project swipe, process colors and map on real iPhone/Android.
- [ ] Confirm contact WhatsApp flow and `/api/contact`.
- [ ] Define `LEADS_FILE_PATH` to a private writable persistent path if lead logging is desired.
- [ ] Define GA4/Search Console variables if used.

## Domain / SEO
- [ ] Attach `webfun.com.br` to the new Hostinger app.
- [ ] Attach `www.webfun.com.br` and verify permanent redirect to non-www.
- [ ] Confirm SSL on both hosts before forcing redirect.
- [ ] Test legacy URLs: `/portfolio`, `/planos`, `/criacao-de-sites`, `/lojas-virtuais`, `/trafego-pago`, `/social-media`, `/manutencao-mensal`.
- [ ] Confirm `/robots.txt` and `/sitemap.xml`.
- [ ] Submit the new sitemap in Google Search Console.
- [ ] Do not remove the old deployment until the real domain is fully serving V7.30 and redirects are verified.

## First 24 hours
- [ ] Test the site on mobile data, not only Wi-Fi.
- [ ] Check Search Console coverage and any 404s.
- [ ] Check analytics/consent if enabled.
- [ ] Send one real contact test and verify WhatsApp + lead capture.
