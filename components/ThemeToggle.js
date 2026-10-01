'use client';

import { useEffect, useState } from 'react';

const modes = ['system', 'light', 'dark'];
const labels = { system: 'Sistema', light: 'Claro', dark: 'Escuro' };

function ThemeGlyph({ kind }){
  if(kind === 'sun'){
    return (
      <svg className="wf-theme-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
    );
  }

  if(kind === 'moon'){
    return (
      <svg className="wf-theme-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    );
  }

  return (
    <svg className="wf-theme-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function getResolved(mode){
  if(typeof window === 'undefined') return 'dark';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
}

function applyTheme(mode){
  const root = document.documentElement;
  const resolved = getResolved(mode);
  root.dataset.theme = resolved;
  root.dataset.themeMode = mode;
  root.style.colorScheme = resolved;
  const themeMeta = document.querySelector('meta[name=\"theme-color\"]');
  if(themeMeta) themeMeta.setAttribute('content', resolved === 'dark' ? '#0d1013' : '#ecebea');
  return resolved;
}

export default function ThemeToggle({ className = '', binary = false }){
  const [mode, setMode] = useState('dark');
  const [resolved, setResolved] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('webfun-theme') || 'dark';
    setMode(saved);
    setResolved(applyTheme(saved));

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const current = localStorage.getItem('webfun-theme') || 'dark';
      if(current === 'system') setResolved(applyTheme('system'));
    };
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  const changeTheme = () => {
    if(binary){
      const next = resolved === 'dark' ? 'light' : 'dark';
      localStorage.setItem('webfun-theme', next);
      setMode(next);
      setResolved(applyTheme(next));
      return;
    }
    const index = modes.indexOf(mode);
    const next = modes[(index + 1) % modes.length];
    localStorage.setItem('webfun-theme', next);
    setMode(next);
    setResolved(applyTheme(next));
  };

  const iconKind = binary ? (resolved === 'dark' ? 'sun' : 'moon') : mode === 'dark' ? 'moon' : mode === 'light' ? 'sun' : 'monitor';
  const label = binary
    ? (resolved === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro')
    : `Tema atual: ${labels[mode]}. Alterar tema`;

  return (
    <button
      type="button"
      className={`v41-theme-toggle ${className}`}
      onClick={changeTheme}
      data-resolved-theme={resolved}
      aria-label={label}
      title={binary ? label : `Tema: ${labels[mode]}`}
    >
      <ThemeGlyph key={`${iconKind}-${resolved}`} kind={iconKind}/>{!binary && <span>{labels[mode]}</span>}
    </button>
  );
}
