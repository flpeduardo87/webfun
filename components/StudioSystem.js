import Image from 'next/image';
import { ArrowRight, Gauge, Layers3, MousePointer2, Workflow } from 'lucide-react';
import { studioPillars } from '../lib/data';

const icons=[MousePointer2,Layers3,Workflow,Gauge];
export default function StudioSystem(){
  return <div className="v4-system-grid v71-system-grid">
    <div className="v4-system-showcase v71-system-showcase">
      <div className="v71-system-copy">
        <small>DO CONTATO À OPERAÇÃO</small>
        <strong>Seu digital precisa trabalhar por você.</strong>
        <p>Não é sobre ter mais telas. É sobre tornar mais simples o caminho entre interesse, decisão e operação.</p>
        <div className="v71-system-path" aria-label="Fluxo de uma experiência digital bem construída">
          <span>Apresentar</span><ArrowRight size={15}/><span>Converter</span><ArrowRight size={15}/><span>Operar</span><ArrowRight size={15}/><span>Evoluir</span>
        </div>
      </div>
      <figure className="v71-system-photo"><Image src="/media/human-v60/laptop-professional.webp" alt="Profissional trabalhando em uma experiência digital no notebook" fill sizes="(max-width: 1180px) 92vw, 36vw" /></figure>
    </div>
    <div className="v4-system-points">{studioPillars.map(([title,text],index)=>{const Icon=icons[index];return <article key={title}><div className="v4-system-icon"><Icon size={18}/></div><small>0{index+1}</small><h3>{title}</h3><p>{text}</p></article>})}</div>
  </div>;
}
