import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import ProjectVisualV4 from '../../../components/ProjectVisualV4';
import { projectHref, projectLinkProps, projects } from '../../../lib/data';

export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}

function projectTag(value){const lower=value.toLocaleLowerCase('pt-BR');return (lower.charAt(0).toLocaleUpperCase('pt-BR')+lower.slice(1)).replace(/ux\/ui/gi,'UX/UI').replace(/seo/gi,'SEO').replace(/b2b/gi,'B2B')}

export async function generateMetadata({params}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)return {};const url=`/projetos/${p.slug}`;const image=p.preview||'/opengraph-image';return {title:`${p.name} — Projeto`,description:p.short,alternates:{canonical:url},openGraph:{title:`${p.name} — Projeto | Webfun`,description:p.short,url,type:'article',images:[{url:image,alt:`Projeto ${p.name} — Webfun`}]},twitter:{card:'summary_large_image',title:`${p.name} — Projeto | Webfun`,description:p.short,images:[image]}}}

export default async function ProjectCase({params}){
  const {slug}=await params;
  const p=projects.find(x=>x.slug===slug);
  if(!p)notFound();
  const current=projects.findIndex(x=>x.slug===p.slug);
  const next=projects[(current+1)%projects.length];
  const url=`https://webfun.com.br/projetos/${p.slug}`;
  const hasDirectProject=Boolean(p.liveUrl||p.modeloUrl);
  const projectJsonLd={'@context':'https://schema.org','@type':'CreativeWork',name:p.name,url,description:p.short,creator:{'@id':'https://webfun.com.br/#organization'},dateCreated:p.year,genre:p.type,keywords:p.tags.join(', '),inLanguage:'pt-BR',...(p.preview?{image:`https://webfun.com.br${p.preview}`}:{})};
  const breadcrumbJsonLd={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Webfun',item:'https://webfun.com.br'},{'@type':'ListItem',position:2,name:'Projetos',item:'https://webfun.com.br/projetos'},{'@type':'ListItem',position:3,name:p.name,item:url}]};

  return <main id="conteudo" className="v4-internal v4-case-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(projectJsonLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd)}}/>

    <section className="v4-case-hero"><div className="shell">
      <Link href="/projetos" className="v4-back-link"><ArrowLeft size={15}/> Todos os projetos</Link>
      <div className="v4-case-hero-grid">
        <div>
          <span className="v4-tag v788-section-tag">{projectTag(p.kicker)}</span>
          <h1>{p.name}</h1>
          <p>{p.short}</p>
          {hasDirectProject&&<Link href={projectHref(p)} {...projectLinkProps(p)} className="v4-primary-button v761-case-direct">Ver projeto</Link>}
        </div>
        <div className="v4-case-meta">
          <div><small>ORIGEM</small><b>{p.origin}</b></div>
          <div><small>TIPO</small><b>{p.type}</b></div>
          <div><small>ANO</small><b>{p.year}</b></div>
          <div><small>SERVIÇOS</small><b>{p.services.join(' · ')}</b></div>
        </div>
      </div>
    </div></section>

    <section className="v4-case-visual"><div className="shell"><ProjectVisualV4 project={p}/></div></section>

    <section className="v4-section v4-case-story"><div className="shell">
      <div className="v5-case-origin-note"><b>{p.origin}</b><span>{p.origin === 'Estudo conceitual' ? 'Estudo conceitual criado para explorar produto, UX/UI e desenvolvimento em um cenário completo.' : p.origin === 'Projeto em desenvolvimento' ? 'Projeto em desenvolvimento, apresentado como parte do processo de design e construção — sem indicação de publicação concluída.' : 'Projeto apresentado com seu contexto e estágio identificados no portfólio.'}</span></div>
      <div className="v4-story-grid">
        <article><small>01 · DESAFIO</small><h2>O problema antes da tela.</h2><p>{p.challenge}</p></article>
        <article><small>02 · DIREÇÃO</small><h2>Clareza para escolher o caminho.</h2><p>{p.strategy}</p></article>
        <article><small>03 · CONSTRUÇÃO</small><h2>Interface e tecnologia no mesmo sistema.</h2><p>Arquitetura, conteúdo, componentes, responsividade e desenvolvimento foram tratados como partes do mesmo produto, reduzindo ruído entre ideia e execução.</p></article>
        <article><small>04 · RESULTADO</small><h2>Uma base pronta para evoluir.</h2><p>{p.result}</p></article>
      </div>
    </div></section>

    <section className="v4-next-project"><div className="shell"><small>PRÓXIMO PROJETO</small><Link href={projectHref(next)} {...projectLinkProps(next)}><h2>{next.name}</h2><ArrowRight size={30}/></Link></div></section>
  </main>
}
