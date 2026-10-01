'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  ChevronDown,
  Gauge,
  Instagram,
  LayoutDashboard,
  Menu,
  MonitorSmartphone,
  PanelsTopLeft,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { services, site, whatsappHref } from '../lib/data';
import ThemeToggle from './ThemeToggle';
import BrandLogo from './BrandLogo';

const navItems = [
  ['/', 'Início'],
  ['/sobre', 'Sobre'],
  ['/servicos', 'Serviços'],
  ['/projetos', 'Projetos'],
  ['/contato', 'Contato'],
];

const serviceIcons = {
  'sites-e-experiencias-digitais': MonitorSmartphone,
  'e-commerce': ShoppingBag,
  'sistemas-e-plataformas': LayoutDashboard,
  'automacao-e-ia': Bot,
  'seo-performance': Gauge,
  'ux-ui-produto-digital': PanelsTopLeft,
};

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const servicesCloseTimerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) {
      lastFocusedRef.current?.focus();
      lastFocusedRef.current = null;
      return () => { document.body.style.overflow = ''; };
    }
    lastFocusedRef.current = document.activeElement;
    const panel = menuPanelRef.current;
    const focusable = panel?.querySelectorAll('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  const cancelServicesClose = () => {
    if (servicesCloseTimerRef.current) {
      window.clearTimeout(servicesCloseTimerRef.current);
      servicesCloseTimerRef.current = null;
    }
  };

  const openServicesMenu = () => {
    cancelServicesClose();
    setServicesOpen(true);
  };

  const scheduleServicesClose = () => {
    cancelServicesClose();
    servicesCloseTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimerRef.current = null;
    }, 260);
  };

  useEffect(() => () => cancelServicesClose(), []);

  return (
    <>
      <a className="v4-skip" href="#conteudo">Pular para o conteúdo</a>
      <header className={`v4-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="shell v4-nav">
          <Link href="/" className="v4-brand" aria-label="Webfun — início"><BrandLogo/></Link>

          <nav className="v4-nav-pill" aria-label="Navegação principal">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={pathname === '/' ? 'is-active' : ''}>Início</Link>
            <Link href="/sobre" aria-current={isActive('/sobre') ? 'page' : undefined} className={isActive('/sobre') ? 'is-active' : ''}>Sobre</Link>

            <div
              className={`v51-services-nav ${servicesOpen ? 'is-open' : ''}`}
              onMouseLeave={scheduleServicesClose}
              onFocusCapture={openServicesMenu}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) scheduleServicesClose();
              }}
            >
              <button
                type="button"
                className={isActive('/servicos') ? 'is-active' : ''}
                onClick={() => { cancelServicesClose(); setServicesOpen((value) => !value); }}
                onMouseEnter={openServicesMenu}
                onFocus={openServicesMenu}
                aria-expanded={servicesOpen}
                aria-controls="desktop-services-menu"
              >
                Serviços <ChevronDown size={14}/>
              </button>
              <div
                id="desktop-services-menu"
                className="v51-mega-menu"
                aria-hidden={!servicesOpen}
                onMouseEnter={openServicesMenu}
                onMouseLeave={scheduleServicesClose}
              >
                <div className="v51-mega-menu-head">
                  <div>
                    <small>O QUE CONSTRUÍMOS</small>
                    <strong>Soluções digitais que combinam conforme o negócio precisa.</strong>
                  </div>
                  <Link href="/servicos" onClick={() => { cancelServicesClose(); setServicesOpen(false); }}>Ver todos <ArrowRight size={16}/></Link>
                </div>
                <div className="v51-mega-menu-grid">
                  {services.map((service) => {
                    const Icon = serviceIcons[service.slug] || MonitorSmartphone;
                    return (
                      <Link key={service.slug} href={`/servicos/${service.slug}`} onClick={() => { cancelServicesClose(); setServicesOpen(false); }}>
                        <i><Icon size={19}/></i>
                        <span><b>{service.title}</b><small>{service.short}</small></span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link href="/projetos" aria-current={isActive('/projetos') ? 'page' : undefined} className={isActive('/projetos') ? 'is-active' : ''}>Projetos</Link>
            <Link href="/contato" aria-current={isActive('/contato') ? 'page' : undefined} className={isActive('/contato') ? 'is-active' : ''}>Contato</Link>
          </nav>

          <div className="v41-nav-actions">
            <ThemeToggle binary/>
            <a href={whatsappHref('Olá, Webfun! Quero conversar sobre um projeto.')} target="_blank" rel="noreferrer" className="v4-header-cta">Vamos conversar</a>
          </div>

          <div className="v51-mobile-nav-actions">
            <ThemeToggle className="v51-theme-toggle-header" binary/>
            <button ref={menuButtonRef} className="v4-menu-button" type="button" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open} aria-controls="menu-mobile"><Menu size={24}/></button>
          </div>
        </div>
      </header>

      <div id="menu-mobile" className={`v4-mobile-menu ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open} onMouseDown={(event) => { if(event.target === event.currentTarget) setOpen(false); }}>
        <div ref={menuPanelRef} className="v4-mobile-menu-panel">
          <div className="v4-mobile-top">
            <Link href="/" className="v4-brand" onClick={() => setOpen(false)} aria-label="Webfun — início"><BrandLogo/></Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu"><X size={22}/></button>
          </div>

          <div className="v4-mobile-search-label">NAVEGAÇÃO</div>
          <nav className="v4-mobile-links" aria-label="Navegação mobile">
            <Link href="/" onClick={() => setOpen(false)} aria-current={pathname === '/' ? 'page' : undefined} className={pathname === '/' ? 'is-active' : ''}>
              <small>01</small><span>Início</span><ArrowRight size={18}/>
            </Link>
            <Link href="/sobre" onClick={() => setOpen(false)} aria-current={isActive('/sobre') ? 'page' : undefined} className={isActive('/sobre') ? 'is-active' : ''}>
              <small>02</small><span>Sobre</span><ArrowRight size={18}/>
            </Link>

            <div className={`v51-mobile-services ${mobileServicesOpen ? 'is-open' : ''}`}>
              <button type="button" onClick={() => setMobileServicesOpen((value) => !value)} aria-expanded={mobileServicesOpen}>
                <small>03</small><span>Serviços</span><ChevronDown size={19}/>
              </button>
              <div className="v51-mobile-service-links" aria-hidden={!mobileServicesOpen}>
                {services.map((service) => {
                  const Icon = serviceIcons[service.slug] || MonitorSmartphone;
                  return (
                    <Link key={service.slug} href={`/servicos/${service.slug}`} onClick={() => setOpen(false)}>
                      <i><Icon size={17}/></i><span>{service.title}</span><ArrowRight size={15}/>
                    </Link>
                  );
                })}
                <Link href="/servicos" className="v51-mobile-all-services" onClick={() => setOpen(false)}>
                  <i><ArrowRight size={17}/></i><span>Ver todos os serviços</span><ArrowRight size={15}/>
                </Link>
              </div>
            </div>

            <Link href="/projetos" onClick={() => setOpen(false)} aria-current={isActive('/projetos') ? 'page' : undefined} className={isActive('/projetos') ? 'is-active' : ''}>
              <small>04</small><span>Projetos</span><ArrowRight size={18}/>
            </Link>
            <Link href="/contato" onClick={() => setOpen(false)} aria-current={isActive('/contato') ? 'page' : undefined} className={isActive('/contato') ? 'is-active' : ''}>
              <small>05</small><span>Contato</span><ArrowRight size={18}/>
            </Link>
          </nav>

          <div className="v4-mobile-contact">
            <div><small>FALE COM A WEBFUN</small><a href={`mailto:${site.email}`}>{site.email}</a></div>
            <a className="v4-mobile-instagram" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram Webfun"><Instagram size={18}/></a>
          </div>
          <a href={whatsappHref('Olá, Webfun! Quero conversar sobre um projeto.')} target="_blank" rel="noreferrer" className="v4-mobile-cta" onClick={() => setOpen(false)}>Vamos conversar</a>
        </div>
      </div>
    </>
  );
}
