import { projects, services } from '../lib/data';

const base = 'https://webfun.com.br';
const releaseDate = new Date('2026-09-02T08:30:00-03:00');

export default function sitemap() {
  const staticRoutes = [
    ['', 'weekly', 1],
    ['/projetos', 'weekly', .9],
    ['/servicos', 'monthly', .9],
    ['/investimento', 'monthly', .85],
    ['/sobre', 'monthly', .75],
    ['/contato', 'monthly', .8],
    ['/politica-de-privacidade', 'yearly', .2],
    ['/termos', 'yearly', .2],
  ];

  return [
    ...staticRoutes.map(([route, changeFrequency, priority]) => ({ url: `${base}${route}`, lastModified: releaseDate, changeFrequency, priority })),
    ...projects.map((project) => ({ url: `${base}/projetos/${project.slug}`, lastModified: releaseDate, changeFrequency: 'monthly', priority: .75 })),
    ...services.map((service) => ({ url: `${base}/servicos/${service.slug}`, lastModified: releaseDate, changeFrequency: 'monthly', priority: .8 })),
  ];
}
