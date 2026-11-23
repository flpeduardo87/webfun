import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const isProd = process.env.NODE_ENV === 'production';

const baseSecurityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
];

const productionSecurityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self' https://wa.me https://api.whatsapp.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ancora a raiz de file tracing na pasta do projeto — evita o Next escolher
  // C:\Users\flped como workspace root por causa de um package-lock.json solto.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  // qualidades usadas nas chamadas <Image quality={...}> — obrigatório a partir do Next 16.
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 92, 94, 100] },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.webfun.com.br' }],
        destination: 'https://webfun.com.br/:path*',
        permanent: true,
      },
      { source: '/portfolio', destination: '/projetos', permanent: true },
      { source: '/planos', destination: '/investimento', permanent: true },
      { source: '/criacao-de-sites', destination: '/servicos/sites-e-experiencias-digitais', permanent: true },
      { source: '/lojas-virtuais', destination: '/servicos/e-commerce', permanent: true },
      { source: '/trafego-pago', destination: '/servicos/seo-performance', permanent: true },
      { source: '/social-media', destination: '/servicos', permanent: true },
      { source: '/manutencao-mensal', destination: '/servicos', permanent: true },
      { source: '/cookies', destination: '/politica-de-privacidade', permanent: true },
      { source: '/termos-de-uso', destination: '/termos', permanent: true },
      { source: '/landing-page', destination: '/servicos/sites-e-experiencias-digitais', permanent: true },
      { source: '/landing-pages', destination: '/servicos/sites-e-experiencias-digitais', permanent: true },
      { source: '/seo-google', destination: '/servicos/seo-performance', permanent: true },
      { source: '/gestao-de-trafego', destination: '/servicos/seo-performance', permanent: true },
      { source: '/depoimentos', destination: '/sobre', permanent: true },
      { source: '/demos/:path*', destination: '/modelos/:path*', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/(.*)', headers: [...baseSecurityHeaders, ...(isProd ? productionSecurityHeaders : [])] },
      { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/brand/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};

export default nextConfig;
