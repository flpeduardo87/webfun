'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { whatsappHref } from '../lib/data';

const ease = [0.16, 1, 0.3, 1];

const heroSlides = [
  { name: 'Nexo', image: '/media/hero-mockups/nexo.webp' },
  { name: 'Com Cristo Kids', image: '/media/hero-mockups/com-cristo-kids.webp' },
  { name: 'Forno Alto', image: '/media/hero-mockups/forno-alto.webp' },
  { name: 'Noma', image: '/media/hero-mockups/noma.webp' },
  { name: 'Match', image: '/media/hero-mockups/match.webp' },
  { name: 'Aura', image: '/media/hero-mockups/aura.webp' },
  { name: 'Lume', image: '/media/hero-mockups/lume.webp' },
];

export default function HomeHero(){
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;
  const touchStart = useRef(null);
  const touchDelta = useRef(0);
  const prev = () => setActive((current) => (current - 1 + total) % total);
  const next = () => setActive((current) => (current + 1) % total);
  const onTouchStart = (event) => { touchStart.current = event.touches[0]?.clientX ?? null; touchDelta.current = 0; setPaused(true); };
  const onTouchMove = (event) => { if (touchStart.current === null) return; touchDelta.current = (event.touches[0]?.clientX ?? touchStart.current) - touchStart.current; };
  const onTouchEnd = () => {
    const delta = touchDelta.current;
    touchStart.current = null; touchDelta.current = 0; setPaused(false);
    if (Math.abs(delta) < 42) return;
    if (delta < 0) next(); else prev();
  };

  useEffect(() => {
    if (reduce || paused) return undefined;
    const timer = setInterval(() => setActive((current) => (current + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [reduce, paused, total]);

  const slide = useMemo(() => heroSlides[active], [active]);

  return (
    <section className="v5-hero v53-hero-carousel-section">
      <div className="shell v5-hero-shell">
        <div className="v5-hero-grid v53-hero-carousel-grid">
          <motion.div className="v5-hero-copy" initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.7, ease }}>
            <span className="v4-tag v788-section-tag v51-hero-tag">Webfun | Serviços Digitais</span>
            <h1 className="v54-hero-headline">
              <span>Seu negócio</span>
              <span>merece mais</span>
              <span>do que um site.</span>
            </h1>
            <p>Criamos sites, lojas e sistemas para ajudar seu negócio a <strong>vender mais</strong> e trabalhar melhor.</p>
            <div className="v53-hero-cta-row">
              <a href={whatsappHref('Olá, Webfun! Quero conversar sobre um projeto.')} target="_blank" rel="noreferrer" className="v5-hero-cta">Falar sobre meu projeto</a>
              <Link href="/projetos" className="v53-hero-secondary">Ver projetos</Link>
            </div>
          </motion.div>

          <motion.div
            className="v53-hero-carousel v63-hero-carousel"
            initial={reduce ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 0.85, delay: reduce ? 0 : 0.08, ease }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={()=>{touchStart.current=null;touchDelta.current=0;setPaused(false)}}
            aria-roledescription="carrossel"
            aria-label="Projetos em destaque"
          >
            <div className="v63-carousel-stage">
              <div className="v63-carousel-viewport" aria-live="off" aria-atomic="true">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={slide.image}
                    src={slide.image}
                    alt={`${slide.name} em versões desktop e mobile`}
                    className="v63-carousel-image"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: 'easeOut' }}
                    loading={active === 0 ? 'eager' : 'lazy'}
                    fetchPriority={active === 0 ? 'high' : 'auto'}
                    decoding="async"
                  />
                </AnimatePresence>
              </div>

              <div className="wf-carousel-pagination" role="group" aria-label="Selecionar projeto do hero">
                {heroSlides.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`wf-carousel-pagination__button ${index === active ? 'is-active' : ''}`}
                    onClick={() => setActive(index)}
                    aria-label={`Mostrar projeto ${item.name}`}
                    aria-pressed={index === active}
                  >
                    <span className="wf-carousel-pagination__mark" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
