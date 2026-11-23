'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  Search,
  PanelsTopLeft,
  Palette,
  Code2,
  CircleCheckBig,
  TrendingUp,
} from 'lucide-react';
import { processSteps } from '../lib/data';

const processIcons = [Search, PanelsTopLeft, Palette, Code2, CircleCheckBig, TrendingUp];
const activationPoints = [0.06, 0.20, 0.36, 0.52, 0.68, 0.84];

export default function ProcessExperience(){
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(reduceMotion){
      setProgress(1);
      return;
    }

    let raf = 0;
    const updateProgress = () => {
      raf = 0;
      const section = ref.current;
      if(!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const travel = Math.max(rect.height + viewportHeight * 0.34, 1);
      let next = (viewportHeight * 0.70 - rect.top) / travel;
      next = Math.max(0, Math.min(1, next));
      setProgress(prev => Math.abs(prev - next) > 0.002 ? next : prev);
    };

    const requestUpdate = () => {
      if(!raf) raf = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if(raf) window.cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  const safeProgress = reduceMotion ? 1 : progress;

  return (
    <div
      ref={ref}
      className={`v773-process-roadmap${reduceMotion ? ' reduce-motion' : ''}`}
      aria-label="Etapas do processo Webfun"
      style={{ '--v773-progress': safeProgress }}
    >
      <div className="v773-process-grid">
        {processSteps.map(([number,label,title,text], index) => {
          const Icon = processIcons[index];
          const active = reduceMotion || safeProgress >= activationPoints[index];
          return (
            <article
              key={number}
              className={`v773-process-step${active ? ' is-active' : ''}`}
              style={{ '--v773-step': index }}
            >
              <div className="v773-process-step-top">
                <div className="v773-process-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8}/></div>
                <span>{number}</span>
              </div>
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
