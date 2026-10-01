import ServiceHeroIllustration from '../../../components/ServiceHeroIllustration';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  BellRing,
  Bot,
  Braces,
  Cable,
  CalendarCheck2,
  Component,
  CreditCard,
  Database,
  FlaskConical,
  Gauge,
  LayoutDashboard,
  LayoutGrid,
  LockKeyhole,
  MonitorSmartphone,
  PackageSearch,
  Palette,
  PanelsTopLeft,
  Route,
  SearchCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Waypoints,
  Workflow,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import SectionIntro from '../../../components/SectionIntro';
import ProcessExperience from '../../../components/ProcessExperience';
import { services, whatsappHref } from '../../../lib/data';

export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}){const {slug}=await params;const s=services.find(x=>x.slug===slug);if(!s)return {};const url=`/servicos/${s.slug}`;return {title:s.title,description:s.short,alternates:{canonical:url},openGraph:{title:`${s.title} | Webfun`,description:s.short,url,type:'website',images:[{url:'/opengraph-image',width:1200,height:630,alt:`${s.title} — Webfun`}]},twitter:{card:'summary_large_image',title:`${s.title} | Webfun`,description:s.short,images:['/opengraph-image']}}}

const serviceIcons={
  'sites-e-experiencias-digitais':MonitorSmartphone,
  'e-commerce':CreditCard,
  'sistemas-e-plataformas':LayoutDashboard,
  'automacao-e-ia':Workflow,
  'seo-performance':Gauge,
  'ux-ui-produto-digital':PanelsTopLeft,
};

const serviceEyebrows={
  'sites-e-experiencias-digitais':'Websites sob medida',
  'e-commerce':'Venda online',
  'sistemas-e-plataformas':'Operação digital',
  'automacao-e-ia':'Automação inteligente',
  'seo-performance':'Visibilidade & performance',
  'ux-ui-produto-digital':'Produto digital',
};

function serviceHeading(service){
  return service.title;
}

const humanMedia={
  'sites-e-experiencias-digitais':{src:'/media/human-v60/creative-collaboration.webp',alt:'Equipe colaborando na criação de uma experiência digital em um ambiente de trabalho',eyebrow:'EXPERIÊNCIA REAL',caption:'Digital que ajuda pessoas a entender, confiar e agir.'},
  'e-commerce':{src:'/media/human-v60/mobile-professional.webp',alt:'Profissional usando smartphone ao lado de um notebook em um ambiente de trabalho',eyebrow:'JORNADA DE COMPRA',caption:'Uma experiência mais simples para quem está do outro lado da tela.'},
  'sistemas-e-plataformas':{src:'/media/human-v60/dashboard-professional.webp',alt:'Profissional analisando indicadores em um dashboard durante a rotina de trabalho',eyebrow:'OPERAÇÃO REAL',caption:'Mais clareza para quem usa o sistema todos os dias.'},
  'automacao-e-ia':{src:'/media/human-v60/laptop-professional.webp',alt:'Profissional trabalhando em notebook em uma rotina digital',eyebrow:'TEMPO BEM USADO',caption:'Menos tarefas mecânicas. Mais espaço para decisão.'},
  'seo-performance':{src:'/media/human-v60/team-collaboration.webp',alt:'Equipe trabalhando em conjunto diante de uma estação digital',eyebrow:'EXPERIÊNCIA E DESCOBERTA',caption:'Performance técnica que também melhora a experiência das pessoas.'},
  'ux-ui-produto-digital':{src:'/media/human-v60/mobile-planning.webp',alt:'Profissional usando smartphone enquanto organiza uma atividade de trabalho',eyebrow:'PRODUTO PARA PESSOAS',caption:'Interfaces pensadas para uso real, não apenas para parecer bonitas.'},
};

function scopeIcon(label){
  const text=label.toLowerCase();
  if(text.includes('landing')) return PanelsTopLeft;
  if(text.includes('site')) return MonitorSmartphone;
  if(text.includes('arquitetura')) return Waypoints;
  if(text.includes('responsivo')) return Smartphone;
  if(text.includes('cms')||text.includes('integra')||text.includes('api')) return Cable;
  if(text.includes('seo')||text.includes('busca')) return SearchCheck;
  if(text.includes('catálogo')||text.includes('categoria')) return LayoutGrid;
  if(text.includes('produto')) return PackageSearch;
  if(text.includes('checkout')||text.includes('carrinho')) return CreditCard;
  if(text.includes('conversão')) return TrendingUp;
  if(text.includes('dashboard')) return LayoutDashboard;
  if(text.includes('restrita')) return LockKeyhole;
  if(text.includes('agenda')||text.includes('reserva')) return CalendarCheck2;
  if(text.includes('painel')) return PanelsTopLeft;
  if(text.includes('workflow')||text.includes('automação')||text.includes('processo')) return Workflow;
  if(text.includes('ia')) return Bot;
  if(text.includes('dados estruturados')) return Braces;
  if(text.includes('dados')) return Database;
  if(text.includes('notifica')) return BellRing;
  if(text.includes('core web')||text.includes('performance')) return Gauge;
  if(text.includes('monitoramento')) return Activity;
  if(text.includes('fluxo')||text.includes('jornada')) return Route;
  if(text.includes('wireframe')||text.includes('protótipo')) return PanelsTopLeft;
  if(text.includes('interface')) return Palette;
  if(text.includes('design system')) return Component;
  if(text.includes('teste')||text.includes('validação')) return FlaskConical;
  return Sparkles;
}

function relatedServices(currentIndex){return [1,2,3].map(offset=>services[(currentIndex+offset)%services.length])}

export default async function ServicePage({params}){
  const {slug}=await params;
  const s=services.find(x=>x.slug===slug);
  if(!s)notFound();
  const current=services.findIndex(x=>x.slug===s.slug);
  const related=relatedServices(current);
  const human=humanMedia[s.slug]||humanMedia['sites-e-experiencias-digitais'];
  const url=`https://webfun.com.br/servicos/${s.slug}`;
  const serviceJsonLd={'@context':'https://schema.org','@type':'Service',name:s.title,url,description:s.short,provider:{'@id':'https://webfun.com.br/#organization'},areaServed:{'@type':'Country',name:'Brasil'},serviceType:s.title};
  const breadcrumbJsonLd={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Webfun',item:'https://webfun.com.br'},{'@type':'ListItem',position:2,name:'Serviços',item:'https://webfun.com.br/servicos'},{'@type':'ListItem',position:3,name:s.title,item:url}]};

  return <main id="conteudo" className="v4-internal v4-service-page v767-service-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceJsonLd)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbJsonLd)}}/>

    <section className={`v4-service-hero v4-theme-${s.theme} v767-service-hero`}>
      <div className="shell">
        <div className="v4-service-hero-grid v767-service-hero-grid">
          <div className="v767-service-hero-copy">
            <span className="v4-tag v788-section-tag">{serviceEyebrows[s.slug]||s.title}</span>
            <h1>{serviceHeading(s)}</h1>
            <p>{s.lead}</p>
            <a href={whatsappHref(`Olá, Webfun! Quero conversar sobre ${s.title}.`)} target="_blank" rel="noreferrer" className="v4-primary-button">Conversar sobre esta solução</a>
          </div>
          <figure className="v767-service-hero-media wf-service-hero-art">
            <ServiceHeroIllustration slug={s.slug}/>
          </figure>
        </div>
      </div>
    </section>

    <section className="v4-section v4-service-scope v767-service-scope">
      <div className="shell">
        <div className="v767-scope-intro">
          <span className="v4-tag v788-section-tag">O que pode fazer parte</span>
          <h2>Escopo pensado para o contexto.</h2>
          <p>O projeto não precisa usar tudo. Selecionamos o que faz sentido para atingir o objetivo sem inflar complexidade.</p>
        </div>
        <div className="v767-scope-cards">
          {s.bullets.map((item,index)=>{const Icon=scopeIcon(item);return <article key={item}><i><Icon size={21}/></i><h3>{item}</h3><p>{s.scopeDetails?.[index]||'Parte do escopo é definida conforme o objetivo, a jornada e a operação do projeto.'}</p></article>})}
        </div>
      </div>
    </section>

    <section className="v4-section v4-service-fit v767-service-fit">
      <div className="shell">
        <SectionIntro tag="Quando faz sentido" title={<>Alguns sinais de que essa frente pode ajudar.</>} subtitle="A solução começa pelo diagnóstico, mas estes cenários aparecem com frequência."/>
        <div className="v4-fit-signal-grid">{s.fit.map((x,i)=><article key={x}><span>{String(i+1).padStart(2,'0')}</span><h3>{x}</h3><p>{s.fitDetails?.[i]}</p></article>)}</div>
      </div>
    </section>

    <section className="v4-section v767-service-results">
      <div className="shell v767-results-grid">
        <figure className="v767-results-photo">
          <Image src={human.src} alt={human.alt} fill sizes="(max-width: 900px) 100vw, 52vw"/>
          <figcaption><small>{human.eyebrow}</small><b>{human.caption}</b></figcaption>
        </figure>
        <div className="v767-results-copy">
          <SectionIntro tag="Impacto no dia a dia" title={<>Mais do que entrega. Um resultado perceptível.</>} subtitle="O objetivo é melhorar a experiência de quem usa e a clareza de quem opera."/>
          <div className="v767-results-list">
            {s.outcomes.map((item,index)=><article key={item}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{item}</h3><p>{s.outcomeDetails?.[index]}</p></div></article>)}
          </div>
        </div>
      </div>
    </section>

    <section className="v4-section v4-process-section v767-service-process">
      <div className="shell">
        <SectionIntro tag="Como trabalhamos" title={<>Do contexto à solução funcionando.</>} subtitle="O processo é adaptado ao escopo, mas a lógica de trabalho permanece clara."/>
        <ProcessExperience/>
      </div>
    </section>

    <section className="v4-section v767-related-services">
      <div className="shell">
        <SectionIntro tag="Serviços relacionados" title={<>Outras soluções que podem fazer sentido.</>} subtitle="Nem todo projeto termina em uma única frente. Quando necessário, estratégia, experiência e tecnologia trabalham juntas."/>
        <div className="v767-related-grid">
          {related.map((item)=>{const Icon=serviceIcons[item.slug]||Sparkles;return <Link href={`/servicos/${item.slug}`} key={item.slug}><div className="v767-related-top"><i><Icon size={19}/></i><ArrowRight size={19}/></div><small>{serviceEyebrows[item.slug]||item.title}</small><h3>{item.title}</h3><p>{item.short}</p></Link>})}
        </div>
      </div>
    </section>
  </main>;
}
