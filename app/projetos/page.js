import SectionIntro from '../../components/SectionIntro';
import ProjectsGridV4 from '../../components/ProjectsGridV4';
import { whatsappHref } from '../../lib/data';

export const metadata={title:'Projetos',description:'Projetos de sites, lojas virtuais, sistemas, UX/UI e experiências digitais desenvolvidos pela Webfun.',alternates:{canonical:'/projetos'},openGraph:{title:'Projetos | Webfun',description:'Projetos de sites, lojas virtuais, sistemas, UX/UI e experiências digitais desenvolvidos pela Webfun.',url:'/projetos',type:'website',images:[{url:'/opengraph-image',width:1200,height:630,alt:'Webfun | Projetos'}]},twitter:{card:'summary_large_image',title:'Projetos | Webfun',description:'Projetos de sites, lojas virtuais, sistemas, UX/UI e experiências digitais desenvolvidos pela Webfun.',images:['/opengraph-image']}};

export default function ProjectsPage(){return <main id="conteudo" className="v4-internal">
 <section className="v4-page-hero v77-projects-hero v4-projects-page"><div className="shell v77-projects-hero-grid"><div className="v77-projects-hero-copy"><SectionIntro tag="PROJETOS" title={<>Projetos diferentes. O mesmo cuidado.</>} subtitle="Sites, landing pages, lojas virtuais, sistemas e produtos digitais desenvolvidos para contextos, públicos e operações diferentes." align="center" level="h1"/></div><div className="v77-projects-content"><ProjectsGridV4/></div></div></section>
 <section className="v4-inline-cta"><div className="shell"><span className="v4-tag v788-section-tag">Seu projeto</span><h2>O próximo projeto pode <em>começar por uma conversa.</em></h2><p>Se existe um problema real para resolver, existe espaço para construir uma experiência melhor.</p><a href={whatsappHref('Olá, Webfun! Vi os projetos e quero um projeto assim.')} target="_blank" rel="noreferrer" className="v4-primary-button">Quero um projeto assim</a></div></section>
 </main>}
