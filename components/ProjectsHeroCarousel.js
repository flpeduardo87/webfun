'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ease = [0.16, 1, 0.3, 1];

const heroProjects = [
  { name: 'Lume', image: '/media/portfolio/lume.webp' },
  { name: 'Canoinhas Tênis Clube', image: '/media/portfolio/elite-tenis-clube.webp' },
  { name: 'Mielke Energia Solar', image: '/media/portfolio/mielke-energia-solar.webp' },
];

export default function ProjectsHeroCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);
  const touchDelta = useRef(0);
  const total = heroProjects.length;
  const previous = () => setActive((current) => (current - 1 + total) % total);
  const next = () => setActive((current) => (current + 1) % total);
  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
    touchDelta.current = 0;
    setPaused(true);
  };
  const onTouchMove = (event) => {
    if (touchStart.current === null) return;
    touchDelta.current = (event.touches[0]?.clientX ?? touchStart.current) - touchStart.current;
  };
  const onTouchEnd = () => {
    const delta = touchDelta.current;
    touchStart.current = null;
    touchDelta.current = 0;
    setPaused(false);
    if (Math.abs(delta) < 42) return;
    if (delta < 0) next(); else previous();
  };

  useEffect(() => {
    if (reduce || paused) return undefined;
    const timer = setInterval(() => setActive((current) => (current + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [paused, reduce, total]);

  const project = heroProjects[active];

  return (
    <div
      className="v77-projects-carousel v63-hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => { touchStart.current = null; touchDelta.current = 0; setPaused(false); }}
      aria-roledescription="carrossel"
      aria-label="Projetos em destaque"
    >
      <div className="v77-projects-carousel-stage v63-carousel-stage">
        <div className="v77-projects-carousel-viewport v63-carousel-viewport" aria-live="off">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={project.image}
              src={project.image}
              alt={`Prévia do projeto ${project.name}`}
              className="v77-projects-carousel-image v63-carousel-image"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.32, ease: 'easeOut' }}
            />
          </AnimatePresence>
        </div>
        <div className="wf-carousel-pagination" role="group" aria-label="Selecionar projeto">
          {heroProjects.map((item, index) => (
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
    </div>
  );
}
