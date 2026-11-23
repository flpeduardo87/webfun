'use client';

import { useMemo, useState } from 'react';
import { LayoutTemplate, ShoppingBag, Layers, Zap, HelpCircle, Search, CalendarCheck, CreditCard, Plug, MessageSquare } from 'lucide-react';
import { whatsappHref } from '../lib/data';

const solutions = [
  { id: 'landing',      icon: LayoutTemplate, label: 'Landing page',        price: 1800 },
  { id: 'site',         icon: LayoutTemplate, label: 'Site institucional',   price: 2800 },
  { id: 'loja',         icon: ShoppingBag,    label: 'Loja virtual',         price: 4500 },
  { id: 'sistema',      icon: Layers,         label: 'Sistema sob medida',   price: 6000 },
  { id: 'ia',           icon: Zap,            label: 'Automação & IA',       price: 3800 },
  { id: 'naosei',       icon: HelpCircle,     label: 'Ainda não sei',        price: 0    },
];

const extras = [
  { id: 'seo',      icon: Search,        label: 'SEO',               price: 600  },
  { id: 'agenda',   icon: CalendarCheck, label: 'Agendamento',       price: 500  },
  { id: 'pay',      icon: CreditCard,    label: 'Pagamento online',  price: 500  },
  { id: 'integra',  icon: Plug,          label: 'Integrações',       price: 400  },
  { id: 'chat',     icon: MessageSquare, label: 'Chat / WhatsApp',   price: 400  },
];

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

export default function OrcamentoRapido() {
  const [sol, setSol] = useState(null);
  const [exSet, setExSet] = useState(new Set());

  const toggleExtra = (id) => {
    setExSet(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const base = solutions.find(s => s.id === sol)?.price ?? 0;
  const extrasTotal = extras.filter(e => exSet.has(e.id)).reduce((a, e) => a + e.price, 0);
  const total = base + extrasTotal;
  const isNaoSei = sol === 'naosei';

  const waMsg = sol
    ? isNaoSei
      ? 'Olá, Webfun! Ainda não sei exatamente o que preciso, mas quero conversar sobre meu projeto.'
      : `Olá, Webfun! Tenho interesse em: ${solutions.find(s => s.id === sol)?.label}${exSet.size ? ` + ${extras.filter(e => exSet.has(e.id)).map(e => e.label).join(', ')}` : ''}. Referência: a partir de ${fmt(total)}.`
    : 'Olá, Webfun! Quero conversar sobre meu projeto.';

  return (
    <section className="wf-orc2-section">
      <div className="shell">
        <div className="wf-orc2-layout">
        <div className="wf-orc2-header">
          <span className="v4-tag">Orçamento</span>
          <h2 className="wf-orc2-title">
            Já sabe o que precisa?<br/>
            <span>Vamos dar um norte.</span>
          </h2>
          <p className="wf-orc2-sub">Escolha uma solução e alguns recursos para ter uma referência inicial. O próximo passo já sai pronto para o WhatsApp.</p>
          <div className="wf-orc2-pills">
            {['Sem formulário gigante','Sem compromisso','Conversa direta'].map(p => (
              <span key={p} className="wf-orc2-pill">{p}</span>
            ))}
          </div>
        </div>

        <div className="wf-orc2-card">
          <div className="wf-orc2-step">
            <span className="wf-orc2-step-label">01 / QUAL SOLUÇÃO FAZ MAIS SENTIDO?</span>
            <div className="wf-orc2-grid">
              {solutions.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`wf-orc2-opt${sol === id ? ' is-active' : ''}`}
                  onClick={() => { setSol(sol === id ? null : id); setExSet(new Set()); }}
                >
                  <Icon size={16} strokeWidth={1.8} />
                  <span>{label}</span>
                  {sol === id && <span className="wf-orc2-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {sol && !isNaoSei && (
            <div className="wf-orc2-step">
              <span className="wf-orc2-step-label">02 / ALGO A MAIS?</span>
              <div className="wf-orc2-grid">
                {extras.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={`wf-orc2-opt${exSet.has(id) ? ' is-active' : ''}`}
                    onClick={() => toggleExtra(id)}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    <span>{label}</span>
                    {exSet.has(id) && <span className="wf-orc2-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="wf-orc2-result">
            <div className="wf-orc2-result-info">
              <span className="wf-orc2-result-label">REFERÊNCIA INICIAL</span>
              <strong className="wf-orc2-result-price">
                {sol && !isNaoSei ? `A partir de ${fmt(total)}` : isNaoSei ? 'Vamos conversar' : '—'}
              </strong>
              {sol && !isNaoSei && <span className="wf-orc2-result-note">Valor estimado · sujeito a escopo</span>}
            </div>
            <a
              href={whatsappHref(waMsg)}
              target="_blank"
              rel="noreferrer"
              className="wf-orc2-cta"
            >
              {isNaoSei ? 'Quero conversar' : 'Falar sobre o projeto'} →
            </a>
          </div>
        </div>
        </div>{/* wf-orc2-layout */}
      </div>
    </section>
  );
}
