'use client';

import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projectHref, projectLinkProps, projectPortfolioLabel, projects, sortProjectsForPortfolio } from '../lib/data';
import ProjectVisualV4 from './ProjectVisualV4';

const filters=[
  ['all','Todos'],
  ['Website','Websites'],
  ['Sistema','Sistemas'],
  ['Lojas virtuais','Lojas virtuais'],
  ['Landing page','Landing pages'],
  ['Institucional','Institucional'],
];

function matchesFilter(project, filter){
  if(filter==='all') return true;
  const haystack = `${project.portfolioCategories?.join(' ') || ''} ${project.type} ${project.tags.join(' ')} ${project.services.join(' ')}`.toLowerCase();
  return haystack.includes(filter.toLowerCase());
}

function ProjectTileContent({project}){
  return <>
    <ProjectVisualV4 project={project} compact/>
    <div className="v4-project-tile-copy">
      <span className="v760-project-kind">{projectPortfolioLabel(project)}</span>
      <div className="v5-project-tile-eyebrow"><small>{project.kicker}</small><em>{project.type}</em></div>
      <div><h2>{project.name}</h2></div>
      <p>{project.short}</p>
      <div className="v4-project-card-meta">
        <div className="v734-project-tags">{project.tags.map((tag)=><span key={tag}>{tag}</span>)}</div>
        <i><SquareArrowOutUpRight size={17}/></i>
      </div>
    </div>
  </>;
}

export default function ProjectsGridV4(){
  const [filter,setFilter]=useState('all');
  const list=useMemo(()=>sortProjectsForPortfolio(projects.filter((project)=>matchesFilter(project, filter))),[filter]);

  return <>
    <div className="v4-project-filters" role="tablist" aria-label="Filtrar projetos por tipo">
      {filters.map(([key,label])=><button type="button" role="tab" aria-selected={filter===key} key={key} className={filter===key?'is-active':''} onClick={()=>setFilter(key)}>{label}</button>)}
    </div>
    <div className="v4-projects-grid">
      {list.map((p)=><Link href={projectHref(p)} {...projectLinkProps(p)} className="v4-project-tile" key={p.slug} aria-label={`Ver projeto ${p.name}`}>
        <ProjectTileContent project={p}/>
      </Link>)}
    </div>
  </>;
}
