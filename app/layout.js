import './styles/site.css';
import './styles/refinements.css';
import './styles/investment.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import WhatsAppFloat from '../components/WhatsAppFloat';
import Analytics from '../components/Analytics';

// Fonte única do site (corpo, UI e headings), auto-hospedada pelo Next: sem
// requisição de render-blocking e com size-adjust anti-CLS. O Google Sans (teste
// tipográfico da V7.94) foi removido — decisão do cliente, ver B-11 na auditoria.
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--wf-font-jakarta',
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata = {
  metadataBase: new URL('https://webfun.com.br'),
  title: { default: 'Webfun | Sites, lojas virtuais e sistemas sob medida', template: '%s | Webfun' },
  description: 'Sites, lojas virtuais e sistemas sob medida para empresas que querem vender melhor, organizar processos e crescer no digital.',
  applicationName: 'Webfun',
  authors: [{ name: 'Webfun', url: 'https://webfun.com.br' }],
  creator: 'Webfun',
  publisher: 'Webfun',
  category: 'technology',
  keywords: ['criação de sites', 'desenvolvimento web', 'Webfun', 'Canoinhas', 'UX UI', 'e-commerce', 'sistemas web', 'automação', 'SEO'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Webfun | Sites, lojas virtuais e sistemas sob medida',
    description: 'Design e desenvolvimento para vender melhor, organizar processos e crescer no digital.',
    url: 'https://webfun.com.br', siteName: 'Webfun', locale: 'pt_BR', type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Webfun | Sites, sistemas e soluções digitais' }],
  },
  twitter: { card: 'summary_large_image', title: 'Webfun | Sites, lojas virtuais e sistemas sob medida', description: 'Sites, lojas virtuais e sistemas sob medida.', images: ['/opengraph-image'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d1013',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': 'https://webfun.com.br/#organization',
  name: 'Webfun',
  url: 'https://webfun.com.br',
  email: 'contato@webfun.com.br',
  telephone: '+55 47 99761-8824',
  areaServed: [{ '@type': 'Country', name: 'Brasil' }, { '@type': 'State', name: 'Santa Catarina' }],
  address: { '@type': 'PostalAddress', addressLocality: 'Canoinhas', addressRegion: 'SC', addressCountry: 'BR' },
  sameAs: ['https://instagram.com/webfun.com.br'],
  serviceType: ['Criação de sites', 'Desenvolvimento de sistemas web', 'Lojas virtuais', 'Design de interfaces', 'Automação', 'SEO e performance'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://webfun.com.br/#website',
  name: 'Webfun',
  url: 'https://webfun.com.br',
  publisher: { '@id': 'https://webfun.com.br/#organization' },
  inLanguage: 'pt-BR',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html:`(function(){try{var m=localStorage.getItem('webfun-theme')||'dark';var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.dataset.themeMode=m;document.documentElement.style.colorScheme=d?'dark':'light';var meta=document.querySelector('meta[name=\"theme-color\"]');if(meta)meta.setAttribute('content',d?'#0d1013':'#ecebea');}catch(e){document.documentElement.dataset.theme='dark';document.documentElement.dataset.themeMode='dark';document.documentElement.style.colorScheme='dark';}})();`}} />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFloat />
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </body>
    </html>
  );
}
