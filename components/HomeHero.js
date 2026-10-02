'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    <div className="wf-panel wf-panel--site">
      <div className="wf-panel-site-label">SUA MARCA</div>
      <div className="wf-panel-site-body">
        <div className="wf-panel-site-copy">
          <strong className="wf-panel-site-h">Sua marca,<br/><span>apresentada.</span></strong>
          <p className="wf-panel-site-sub">Sites que comunicam valor e geram contato.</p>
          <div className="wf-panel-site-btns">
            <span className="wf-panel-site-btn-primary">Contratar</span>
            <span className="wf-panel-site-btn-ghost">Ver mais</span>
          </div>
        </div>
        <div className="wf-panel-img-box"><span>HERO IMAGE</span></div>
      </div>
      <div className="wf-panel-cards">
        {[
          { icon: '⊕', title: 'Conversão',  sub: 'Estruturado para gerar contato' },
          { icon: '▭', title: 'Responsivo', sub: 'Perfeito em qualquer tela' },
          { icon: '⌕', title: 'SEO',        sub: 'Encontrado no Google' },
        ].map(({ icon, title, sub }) => (
          <div key={title} className="wf-panel-card">
            <span className="wf-panel-card-ico">{icon}</span>
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
    <div className="wf-panel wf-panel--loja">
      <div className="wf-panel-shop-header">
        <div className="wf-panel-logo" />
        <div className="wf-panel-cart">🛒 <span>3</span></div>
      </div>
      <div className="wf-panel-products">
        {[['👟','Tênis Urban'],['👜','Bolsa Couro'],['🌿','Kit Natural'],['💎','Joia Fina']].map(([emoji, name]) => (
          <div key={name} className="wf-panel-product">
            <div className="wf-panel-product-img">{emoji}</div>
            <div className="wf-panel-product-name">{name}</div>
            <div className="wf-panel-product-price" />
            <div className="wf-panel-product-btn">Comprar</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SistemasPanel() {
  return (
    <div className="wf-panel wf-panel--sistemas">
      <div className="wf-panel-sys-head">
        <div className="wf-panel-line wf-panel-line--sm" />
        <div className="wf-panel-sys-badge">Ativo</div>
      </div>
      <div className="wf-panel-stats3">
        {[['847','Pedidos'],['94%','Satisfação'],['R$38k','Receita']].map(([v, l]) => (
          <div key={l} className="wf-panel-stat"><b>{v}</b><span>{l}</span></div>
        ))}
      </div>
      <div className="wf-panel-tasks-grid">
        {[
          {lbl:'Faturamento', num:'R$12.4k', done:true},
          {lbl:'Pedidos',     num:'23 abertos', done:true},
          {lbl:'Clientes',   num:'+8 novos',   done:false},
          {lbl:'Tarefas',    num:'5 pendentes', done:false},
        ].map(({lbl, num, done}) => (
          <div key={lbl} className={`wf-panel-task-card${done ? ' is-done' : ''}`}>
            <span className="wf-panel-task-dot" />
            <span className="wf-panel-task-lbl">{lbl}</span>
            <span className="wf-panel-task-num">{num}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IAPanel() {
  return (
    <div className="wf-panel wf-panel--ia">
      <div className="wf-panel-ia-top">
        <div className="wf-panel-ia-avatar">✨</div>
        <div className="wf-panel-ia-status">
          <div className="wf-panel-line wf-panel-line--sm" />
          <div className="wf-panel-ia-dot" />
        </div>
      </div>
      <div className="wf-panel-chat">
        <div className="wf-panel-chat-msg wf-panel-chat-msg--in">Tem pedidos novos hoje?</div>
        <div className="wf-panel-chat-msg wf-panel-chat-msg--out">✅ Sim! 12 pedidos. Faturamento: R$ 4.280</div>
        <div className="wf-panel-chat-msg wf-panel-chat-msg--in">Alguém aguardando resposta?</div>
        <div className="wf-panel-chat-msg wf-panel-chat-msg--out wf-chat-typing"><span/><span/><span/></div>
      </div>
      <div className="wf-panel-ia-chips">
        {['📊 Relatório diário','📦 Ver pedidos','📩 Responder'].map(c => (
          <button key={c} type="button" className="wf-panel-ia-chip">{c}</button>
        ))}
      </div>
    </div>
  );
}

const panels = [SitePanel, LojaPanel, SistemasPanel, IAPanel];

export default function HomeHero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const total = tabs.length;

  useEffect(() => {
    if (reduce) return;
    const tick = (ts) => {
      if (!pausedRef.current) {
        if (startRef.current === null) startRef.current = ts;
        const p = Math.min((ts - startRef.current) / CYCLE_MS, 1);
        setProgress(p);
        if (p >= 1) {
          setActive(a => (a + 1) % total);
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
  }, [reduce, total]);

  const Panel = panels[active];

  return (
    <section className="wf-hero2">
      <div className="shell wf-hero2-shell">
        <div className="wf-hero2-grid">

          {/* Left: copy */}
          <motion.div
            className="wf-hero2-copy"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease }}
          >
            <span className="v4-tag v788-section-tag v51-hero-tag">Webfun | Serviços Digitais</span>
            <h1 className="wf-hero2-h1">
              <span>Seu negócio</span>
              <span>merece{' '}<span className="wf-stamp">mais</span></span>
              <span>do que um site.</span>
            </h1>
            <p>Criamos sites, lojas e sistemas para ajudar seu negócio a <strong>vender mais</strong> e trabalhar melhor — com design que comunica e tecnologia que entrega.</p>
            <div className="wf-hero2-cta-row">
              <a
                href={whatsappHref('Olá, Webfun! Quero conversar sobre um projeto.')}
                target="_blank"
                rel="noreferrer"
                className="v5-hero-cta wf-hero2-cta-primary"
              >
                Falar sobre meu projeto
                <i aria-hidden="true"><ArrowRight size={16}/></i>
              </a>
              <Link href="/projetos" className="wf-hero2-secondary">Ver projetos</Link>
            </div>
            <div className="wf-hero2-proof">
              <div className="wf-hero2-faces">
                <span style={{ background: '#c9ff42', color: '#1e2700' }}>E</span>
                <span style={{ background: '#3b5bdb' }}>F</span>
                <span style={{ background: '#25292e' }}>G</span>
                <span style={{ background: '#2d6a4f' }}>H</span>
              </div>
              <span><strong>+100 projetos entregues</strong><br/><small>para negócios em todo o mundo</small></span>
            </div>
          </motion.div>

          {/* Right: service window */}
          <motion.div
            className="wf-hero2-window"
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 0.85, delay: reduce ? 0 : 0.08, ease }}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; startRef.current = null; }}
          >
            <div className="wf-win-bar">
              <span className="wf-win-dots"><i/><i/><i/></span>
              <span className="wf-win-url">webfun.com.br/projeto</span>
            </div>

            <div className="wf-win-tabs" role="tablist" aria-label="Tipo de projeto">
              {tabs.map((tab, i) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={i === active}
                  className={`wf-win-tab${i === active ? ' is-active' : ''}`}
                  onClick={() => { setActive(i); setProgress(0); startRef.current = null; }}
                  type="button"
                >
                  <span className="wf-win-tab-icon" aria-hidden="true">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="wf-win-body" role="tabpanel">
              <Panel />
            </div>

            {!reduce && (
              <div className="wf-win-progress" aria-hidden="true">
                <div className="wf-win-progress-bar" style={{ width: `${progress * 100}%` }} />
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
