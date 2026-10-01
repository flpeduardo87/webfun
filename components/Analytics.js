'use client';

import Script from 'next/script';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'webfun-analytics-consent';

export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export default function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    if (!measurementId) return;
    const stored = localStorage.getItem(CONSENT_KEY);
    setConsent(stored === 'granted' ? true : stored === 'denied' ? false : null);
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || consent !== true || typeof window.gtag !== 'function') return;
    window.gtag('config', measurementId, { page_path: pathname });
  }, [measurementId, pathname, consent]);

  useEffect(() => {
    if (!measurementId || consent !== true) return undefined;
    const onClick = (event) => {
      const anchor = event.target.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
        trackEvent('whatsapp_click', { link_url: href, page_path: window.location.pathname });
      } else if (href === '/contato' || href.startsWith('/contato?')) {
        trackEvent('contact_cta_click', { page_path: window.location.pathname });
      } else if (href.startsWith('/projetos/')) {
        trackEvent('project_view_intent', { project_path: href });
      } else if (href.startsWith('/servicos/')) {
        trackEvent('service_view_intent', { service_path: href });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [measurementId, consent]);

  if (!measurementId) return null;

  const choose = (allowed) => {
    localStorage.setItem(CONSENT_KEY, allowed ? 'granted' : 'denied');
    setConsent(allowed);
  };

  return (
    <>
      {consent === null && (
        <aside className="v7-cookie" role="dialog" aria-label="Preferências de analytics" aria-live="polite">
          <div><b>Analytics opcional</b><p>Usamos métricas de navegação para entender o que funciona no site. Você pode aceitar ou continuar sem analytics. <Link href="/politica-de-privacidade">Saiba mais</Link>.</p></div>
          <div className="v7-cookie-actions"><button type="button" onClick={() => choose(false)}>Continuar sem</button><button type="button" className="is-primary" onClick={() => choose(true)}>Aceitar analytics</button></div>
        </aside>
      )}
      {consent === true && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="webfun-ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', { analytics_storage: 'granted' });
            gtag('config', '${measurementId}', { send_page_view: false, anonymize_ip: true });
          `}</Script>
        </>
      )}
    </>
  );
}
