export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: 'https://webfun.com.br/sitemap.xml',
    host: 'https://webfun.com.br',
  };
}
