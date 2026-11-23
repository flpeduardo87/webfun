'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Revela o conteúdo com um leve fade/slide ao entrar na viewport.
 *
 * Ao contrário da versão anterior (framer-motion + whileInView), o estado de
 * repouso é VISÍVEL: sem JS, sem IntersectionObserver, ou com o
 * requestAnimationFrame suspenso (aba em segundo plano, throttling, WebView,
 * motor de preview), o conteúdo aparece — nunca fica preso em opacity:0.
 * A transição em si é puro CSS.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  // 'rest'  -> SSR / sem JS: visível (fallback)
  // 'armed' -> escondido, aguardando entrar em cena
  // 'shown' -> revelado
  const [phase, setPhase] = useState('rest');

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('shown');
      return undefined;
    }

    const near = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight + 80 && rect.bottom > -80;
    };

    // Acima da dobra no carregamento: aparece direto, sem animação de entrada.
    if (near()) {
      setPhase('shown');
      return undefined;
    }

    setPhase('armed');

    let done = false;
    const cleanups = [];
    const reveal = () => {
      if (done) return;
      done = true;
      cleanups.forEach((fn) => fn());
      setPhase('shown');
    };

    const observer = new IntersectionObserver(
      (entries) => { if (entries.some((entry) => entry.isIntersecting)) reveal(); },
      { rootMargin: '0px 0px -48px 0px' },
    );
    observer.observe(el);
    cleanups.push(() => observer.disconnect());

    // Fallback caso o observer não dispare: confere a posição a cada scroll/resize.
    const onCheck = () => { if (near()) reveal(); };
    window.addEventListener('scroll', onCheck, { passive: true });
    window.addEventListener('resize', onCheck, { passive: true });
    cleanups.push(() => {
      window.removeEventListener('scroll', onCheck);
      window.removeEventListener('resize', onCheck);
    });

    // Último recurso: se em 3s o bloco já estiver visível mas ainda "armado", revela.
    const timer = setTimeout(onCheck, 3000);
    cleanups.push(() => clearTimeout(timer));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const classes = ['wf-reveal'];
  if (phase === 'armed') classes.push('is-armed');
  if (phase === 'shown') classes.push('is-shown');
  if (className) classes.push(className);

  return (
    <div
      ref={ref}
      className={classes.join(' ')}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
