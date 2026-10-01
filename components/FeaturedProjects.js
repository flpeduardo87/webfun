'use client';

import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { projectHref, projectLinkProps, projects } from '../lib/data';

const desktopOrder = [
  'noma-imoveis',
  'lume-odontologia',
  'farina-84',
  'nexo-consultoria',
  'casa-serena',
  'match-racquet-club',
  'aura-estetica',
];


const editorialHeadlines = {
  'noma-imoveis': 'Um portal que trabalha como uma plataforma.',
  'lume-odontologia': 'Clínica premium com jornada completa.',
  'farina-84': 'Cardápio, pedido e operação no mesmo produto.',
  'nexo-consultoria': 'Clareza que transforma estratégia em oportunidade.',
  'casa-serena': 'Reservas sem sair da experiência da marca.',
  'match-racquet-club': 'Reserva, sócio e operação do clube.',
  'aura-estetica': 'Experiência premium do contato ao agendamento.',
};

const editorialVisuals = {
  'noma-imoveis': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=88',
  'lume-odontologia': 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1300&q=88',
  'farina-84': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1300&q=88',
  'casa-serena': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=88',
  'match-racquet-club': 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=88',
  'nexo-consultoria': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=86',
  'aura-estetica': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=86',
};

function ProjectCardContent({item,index,mobile=false}){
  const heading = editorialHeadlines[item.slug] || item.meta || item.name;
  return <>
    <div
      className="v741-project-photo"
      style={{backgroundImage:`url("${editorialVisuals[item.slug] || item.preview}")`}}
      aria-hidden="true"
    />
    <div className="v741-project-shade" aria-hidden="true"/>
    <div className="v740-project-topline">
      <span>{String(index+1).padStart(2,'0')}</span>
      <em>{item.tags[0]}</em>
    </div>
    <div className="v740-project-copy">
      <small className="v744-project-identity"><strong>{item.name}</strong><span>{item.kicker}</span></small>
      <h3>{heading}</h3>
      {index===0 ? <p className="v744-project-description">{item.short}</p> : null}
      <div className="v742-project-card-bottom">
        <div className="v742-project-card-tags">{item.tags.slice(0,2).map(tag=><span key={tag}>{tag}</span>)}</div>
        <div className="v740-project-action">Ver projeto <SquareArrowOutUpRight size={15}/></div>
      </div>
    </div>
  </>;
}

export default function FeaturedProjects(){
  const list = useMemo(() => {
    const ordered = desktopOrder.map(slug=>projects.find(project=>project.slug===slug)).filter(Boolean);
    const fallback = projects.filter(project=>project.featured && project.preview && !ordered.some(item=>item.slug===project.slug));
    return [...ordered,...fallback].slice(0,7);
  }, []);

  const [active,setActive]=useState(0);
  const railRef=useRef(null);

  const goTo=(index)=>{
    const rail=railRef.current;
    if(!rail) return;
    const cards=[...rail.querySelectorAll('.v742-mobile-project-card')];
    const card=cards[index];
    if(!card) return;
    rail.scrollTo({left:card.offsetLeft-rail.offsetLeft,behavior:'smooth'});
    setActive(index);
  };

  useEffect(()=>{
    const rail=railRef.current;
    if(!rail) return undefined;
    let frame=0;
    const sync=()=>{
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const cards=[...rail.querySelectorAll('.v742-mobile-project-card')];
        if(!cards.length) return;
        const current=rail.scrollLeft;
        let nearest=0;
        let distance=Infinity;
        cards.forEach((card,index)=>{
          const value=Math.abs((card.offsetLeft-rail.offsetLeft)-current);
          if(value<distance){distance=value;nearest=index;}
        });
        setActive(nearest);
      });
    };
    rail.addEventListener('scroll',sync,{passive:true});
    return()=>{cancelAnimationFrame(frame);rail.removeEventListener('scroll',sync);};
  },[]);

  return (
    <>
      <div className="v740-desktop-projects v741-editorial-projects" aria-label="Projetos em destaque">
        <div className="v740-project-mosaic">
          {list.map((item,index)=>(
            <Link
              key={item.slug}
              href={projectHref(item)}
              {...projectLinkProps(item)}
              className={`v740-project-card v740-project-card-${index+1} v741-project-card`}
              aria-label={`Abrir projeto ${item.name}`}
            >
              <ProjectCardContent item={item} index={index}/>
            </Link>
          ))}
        </div>
        <div className="v740-projects-footer">
          <span>Projetos diferentes, cada um com uma solução pensada para o contexto real.</span>
          <Link href="/projetos">Explorar portfólio <SquareArrowOutUpRight size={16}/></Link>
        </div>
      </div>

      <div className="v742-mobile-editorial" aria-label="Projetos em destaque">
        <div className="v742-mobile-editorial-rail" ref={railRef}>
          {list.map((item,index)=>(
            <Link
              key={item.slug}
              href={projectHref(item)}
              {...projectLinkProps(item)}
              className="v742-mobile-project-card"
              aria-label={`Abrir projeto ${item.name}`}
            >
              <ProjectCardContent item={item} index={index} mobile/>
            </Link>
          ))}
        </div>
        <div className="v742-mobile-project-dots" role="group" aria-label="Selecionar projeto">
          {list.map((item,index)=><button key={item.slug} type="button" aria-pressed={active===index} className={active===index?'is-active':''} onClick={()=>goTo(index)} aria-label={`Mostrar ${item.name}`}/>) }
        </div>
      </div>
    </>
  );
}
