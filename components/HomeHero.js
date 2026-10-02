'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { whatsappHref } from '../lib/data';

const ease = [0.16, 1, 0.3, 1];
const CYCLE_MS = 4400;

const tabs = [
  { id: 'site',     label: 'Site',           icon: '🌐' },
  { id: 'loja',     label: 'Loja virtual',   icon: '🛍️' },
  { id: 'sistemas', label: 'Sistemas',       icon: '⚙️' },
  { id: 'ia',       label: 'Automação & IA', icon: '✨' },
];

function SitePanel() {
  return (
    <div className="wf2-panel wf2-panel-site">
      <div className="wf2-ps-nav">
        <div className="wf2-ps-logo" />
        <div className="wf2-ps-links"><span/><span/><span/></div>
        <div className="wf2-ps-cta-pill" />
      </div>
      <div className="wf2-ps-hero">
        <div className="wf2-ps-copy">
          <div className="wf2-ps-eyebrow">SUA MARCA</div>
          <strong className="wf2-ps-h1">Sua marca,<br/><span>apresentada.</span></strong>
          <p className="wf2-ps-sub">Sites que comunicam valor e geram contato.</p>
          <div className="wf2-ps-btns">
            <span className="wf2-ps-btn-p">Contratar</span>
            <span className="wf2-ps-btn-g">Ver mais</span>
          </div>
        </div>
        <div className="wf2-ps-img" />
      </div>
      <div className="wf2-ps-cards">
        {[['⊕','Conversão','Estruturado para gerar contato'],
          ['▭','Responsivo','Perfeito em qualquer tela'],
          ['⌕','SEO','Encontrado no Google'],
        ].map(([icon, title, sub]) => (
          <div key={title} className="wf2-ps-card">
            <span className="wf2-ps-card-ico">{icon}</span>
            <strong>{title}</strong>
            <span>{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LojaPanel() {
  return (
    <div className="wf2-panel wf2-panel-loja">
      <div className="wf2-pl-header">
        <div className="wf2-pl-logo" />
        <div className="wf2-pl-cart">🛒 <span>3</span></div>
      </div>
      <div className="wf2-pl-products">
        {[['👟','Tênis Urban','R$ 289'],
          ['👜','Bolsa Couro','R$ 459'],
          ['🌿','Kit Natural','R$ 129'],
          ['💎','Joia Fina','R$ 890'],
        ].map(([emoji, name, price]) => (
          <div key={name} className="wf2-pl-product">
            <div className="wf2-pl-img">{emoji}</div>
            <div className="wf2-pl-info">
              <span className="wf2-pl-name">{name}</span>
              <span className="wf2-pl-price">{price}</span>
            </div>
            <div className="wf2-pl-btn">Comprar</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SistemasPanel() {
  return (
    <div className="wf2-panel wf2-panel-sys">
      <div className="wf2-sys-head">
        <span className="wf2-sys-title">Dashboard</span>
        <span className="wf2-sys-badge">● Ativo</span>
      </div>
      <div className="wf2-sys-stats">
        {[['847','Pedidos'],['94%','Satisfação'],['R$38k','Receita']].map(([v, l]) => (
          <div key={l} className="wf2-sys-stat"><b>{v}</b><span>{l}</span></div>
        ))}
      </div>
      <div className="wf2-sys-grid">
        {[
          { l:'Faturamento', v:'R$12.4k', ok:true  },
          { l:'Pedidos',     v:'23 abertos', ok:true  },
          { l:'Clientes',    v:'+8 novos',   ok:false },
          { l:'Tarefas',     v:'5 pendentes',ok:false },
        ].map(({ l, v, ok }) => (
          <div key={l} className={`wf2-sys-card${ok ? ' is-ok' : ''}`}>
            <span className="wf2-sys-dot" />
            <span className="wf2-sys-lbl">{l}</span>
            <span className="wf2-sys-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IAPanel() {
  return (
    <div className="wf2-panel wf2-panel-ia">
      <div className="wf2-ia-top">
        <div className="wf2-ia-avatar">✨</div>
        <div>
          <div className="wf2-ia-name">Webfun IA</div>
          <div className="wf2-ia-status"><span />Online agora</div>
        </div>
      </div>
      <div className="wf2-ia-chat">
        <div className="wf2-ia-msg wf2-ia-in">Tem pedidos novos hoje?</div>
        <div className="wf2-ia-msg wf2-ia-out">✅ Sim! 12 pedidos. Faturamento: R$&nbsp;4.280</div>
        <div className="wf2-ia-msg wf2-ia-in">Alguém aguardando resposta?</div>
        <div className="wf2-ia-msg wf2-ia-out wf2-ia-typing"><span/><span/><span/></div>
      </div>
      <div className="wf2-ia-chips">
        {['📊 Relatório diário', '📦 Ver pedidos', '📩 Responder'].map(c => (
          <button key={c} type="button" className="wf2-ia-chip">{c}</button>
        ))}
      </div>
    </div>
  );
}

const panelComponents = [SitePanel, LojaPanel, SistemasPanel, IAPanel];

export default function HomeHero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (reduce) return;
    const tick = (ts) => {
      if (!pausedRef.current) {
        if (startRef.current === null) startRef.current = ts;
        const p = Math.min((ts - startRef.current) / CYCLE_MS, 1);
        setProgress(p);
        if (p >= 1) {
          setActive(a => (a + 1) % tabs.length);
          setProgress(0);
          startRef.current = null;
        }
      } else {
        startRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduce]);

  const Panel = panelComponents[active];

  const up = (delay) => reduce ? {} : {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  };

  return (
    <section className="wf2-hero">
      <div className="wf2-glow-a" aria-hidden="true" />
      <div className="wf2-glow-b" aria-hidden="true" />

      <div className="shell wf2-hero-inner">

        {/* ── Copy ── */}
        <div className="wf2-copy">

          <motion.span className="wf2-tag" {...up(0.04)}>
            Webfun · Serviços Digitais
          </motion.span>

          <h1 className="wf2-h1">
            <motion.span className="wf2-h1-l" {...up(0.10)}>Seu negócio</motion.span>
            <motion.span className="wf2-h1-l" {...up(0.19)}>
              merece{' '}<em className="wf2-stamp">mais</em>
            </motion.span>
            <motion.span className="wf2-h1-l" {...up(0.28)}>do que um site.</motion.span>
          </h1>

          <motion.p className="wf2-lead" {...up(0.40)}>
            Criamos sites, lojas e sistemas para ajudar seu negócio a{' '}
            <strong>vender mais</strong> e trabalhar melhor — com design que
            comunica e tecnologia que entrega.
          </motion.p>

          <motion.div className="wf2-ctas" {...up(0.50)}>
            <a
              href={whatsappHref('Olá, Webfun! Quero conversar sobre um projeto.')}
              target="_blank"
              rel="noreferrer"
              className="wf2-cta-primary"
            >
              Falar sobre meu projeto
              <i aria-hidden="true"><ArrowRight size={16} /></i>
            </a>
            <Link href="/projetos" className="wf2-cta-ghost">Ver projetos</Link>
          </motion.div>

          <motion.div className="wf2-proof" {...up(0.60)}>
            <div className="wf2-faces">
              <span style={{ background: '#c9ff42', color: '#1e2700' }}>E</span>
              <span style={{ background: '#3b5bdb' }}>F</span>
              <span style={{ background: '#25292e' }}>G</span>
              <span style={{ background: '#2d6a4f' }}>H</span>
            </div>
            <span>
              <strong>+100 projetos entregues</strong><br />
              <small>para negócios em todo o mundo</small>
            </span>
          </motion.div>

        </div>

        {/* ── Window ── */}
        <motion.div
          className="wf2-win-outer"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.14, ease }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; startRef.current = null; }}
        >
          <div className="wf2-window">
            <div className="wf2-win-bar">
              <span className="wf2-win-dots"><i /><i /><i /></span>
              <span className="wf2-win-url">webfun.com.br/projeto</span>
            </div>

            <div className="wf2-win-tabs" role="tablist" aria-label="Tipo de projeto">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={i === active}
                  className={`wf2-win-tab${i === active ? ' is-active' : ''}`}
                  onClick={() => { setActive(i); setProgress(0); startRef.current = null; }}
                  type="button"
                >
                  <span aria-hidden="true">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="wf2-win-body" role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  className="wf2-win-panel"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: [0.25, 1, 0.3, 1] }}
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </div>

            {!reduce && (
              <div className="wf2-win-prog" aria-hidden="true">
                <div className="wf2-win-prog-bar" style={{ width: `${progress * 100}%` }} />
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
