'use client';

import { ArrowUp } from 'lucide-react';

export default function BackToTopButton(){
  return <button
    type="button"
    className="v768-back-to-top"
    onClick={()=>{const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});}}
    aria-label="Voltar ao topo da página"
  >
    <span>Voltar ao topo</span>
    <ArrowUp size={16}/>
  </button>
}
