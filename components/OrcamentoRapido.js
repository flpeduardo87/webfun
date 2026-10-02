'use client';

import { useMemo, useState } from 'react';
import { whatsappHref } from '../lib/data';

const services = [
  { id: 'site',    icon: '🌐', label: 'Site',           price: 2800 },
  { id: 'loja',    icon: '🛍️', label: 'Loja Virtual',   price: 4500 },
  { id: 'sistema', icon: '⚙️', label: 'Sistema',        price: 6000 },
  { id: 'ia',      icon: '✨', label: 'Automação & IA', price: 3800 },
];

const extras = [
  { id: 'blog',  icon: '✍️', label: 'Blog',              price: 800 },
  { id: 'chat',  icon: '💬', label: 'Chat / WhatsApp',   price: 400 },
  { id: 'admin', icon: '🛠️', label: 'Painel admin',      price: 900 },
  { id: 'pay',   icon: '💳', label: 'Pagamento online',  price: 500 },
  { id: 'lang',  icon: '🌍', label: 'Multi-idiomas',     price: 600 },
];

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export default function OrcamentoRapido() {
  const [svc, setSvc] = useState(null);
  const [exSet, setExSet] = useState(new Set());

  const toggleExtra = (id) => {
    setExSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const total = useMemo(() => {
    const base = services.find(s => s.id === svc)?.price ?? 0;
    const ex = extras.filter(e => exSet.has(e.id)).reduce((a, e) => a + e.price, 0);
    return base + ex;
  }, [svc, exSet]);

  const waMsg = svc
    ? `Olá, Webfun! Tenho interesse em: ${services.find(s => s.id === svc)?.label}${exSet.size ? ` + extras: ${extras.filter(e => exSet.has(e.id)).map(e => e.label).join(', ')}` : ''}. Estimativa: ${fmt(total)}.`
    : 'Olá, Webfun! Quero um orçamento para meu projeto.';

  return (
    <section className="wf-orc-section">
      <div className="shell">
        <div className="wf-orc-header">
          <span className="v4-tag">ORÇAMENTO</span>
          <h2 className="wf-orc-title">Quanto custa o meu projeto?</h2>
          <p>Selecione o tipo de projeto e os recursos extras para ter uma estimativa de investimento.</p>
        </div>

        <div className="wf-orc-body">
          <div className="wf-orc-step">
            <div className="wf-orc-step-label"><span className="wf-orc-step-num">01</span><h3>Qual o tipo do projeto?</h3></div>
            <div className="wf-orc-svc-grid">
              {services.map(s => (
                <button
                  key={s.id}
                  type="button"
                  className={`wf-orc-svc-card${svc === s.id ? ' is-active' : ''}`}
                  onClick={() => setSvc(svc === s.id ? null : s.id)}
                >
                  <span className="wf-orc-card-icon">{s.icon}</span>
                  <span className="wf-orc-card-label">{s.label}</span>
                  {svc === s.id && <span className="wf-orc-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="wf-orc-step">
            <div className="wf-orc-step-label"><span className="wf-orc-step-num">02</span><h3>Quais recursos extras?</h3></div>
            <div className="wf-orc-extras-grid">
              {extras.map(e => (
                <button
                  key={e.id}
                  type="button"
                  className={`wf-orc-extra-card${exSet.has(e.id) ? ' is-active' : ''}`}
                  onClick={() => toggleExtra(e.id)}
                >
                  <span className="wf-orc-card-icon">{e.icon}</span>
                  <span className="wf-orc-card-label">{e.label}</span>
                  <span className="wf-orc-extra-price">+{fmt(e.price)}</span>
                  {exSet.has(e.id) && <span className="wf-orc-check" aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="wf-orc-result">
            <div className="wf-orc-result-info">
              <span className="wf-orc-result-label">Estimativa de investimento</span>
              <strong className="wf-orc-result-price">{svc ? fmt(total) : '—'}</strong>
              <span className="wf-orc-result-note">Valores de referência · sujeito a escopo</span>
            </div>
            <a
              href={whatsappHref(waMsg)}
              target="_blank"
              rel="noreferrer"
              className="wf-orc-result-cta"
            >
              Conversar sobre o projeto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
