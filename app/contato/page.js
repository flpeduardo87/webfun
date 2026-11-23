import { Clock3, Globe2, Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import SectionIntro from '../../components/SectionIntro';
import ContactForm from '../../components/ContactForm';
import FAQ from '../../components/FAQ';
import { site } from '../../lib/data';

export const metadata={title:'Contato',description:'Conte seu projeto para a Webfun. Sites, lojas virtuais, sistemas, UX/UI, automações e experiências digitais.',alternates:{canonical:'/contato'},openGraph:{title:'Contato | Webfun',description:'Conte seu projeto para a Webfun. Sites, lojas virtuais, sistemas, UX/UI, automações e experiências digitais.',url:'/contato',type:'website',images:[{url:'/opengraph-image',width:1200,height:630,alt:'Webfun | Contato'}]},twitter:{card:'summary_large_image',title:'Contato | Webfun',description:'Conte seu projeto para a Webfun. Sites, lojas virtuais, sistemas, UX/UI, automações e experiências digitais.',images:['/opengraph-image']}};

export default function ContactPage(){return <main id="conteudo" className="v4-internal v4-contact-page">
 <section className="v4-contact-hero"><div className="shell"><SectionIntro tag="CONTATO" title={<>Vamos conversar sobre o seu próximo projeto.</>} subtitle="Site, loja, sistema ou uma ideia ainda sem formato: envie o contexto e começamos por aí." align="center" level="h1"/><div className="v4-contact-grid"><div className="v722-contact-main"><ContactForm/><div className="v722-contact-fill"><span>COMEÇAR SIMPLES</span><h2>Você não precisa chegar com tudo definido.</h2><p>Problema, objetivo e contexto já são suficientes. A partir daí, organizamos o caminho e indicamos a solução certa.</p><div><i>Site</i><i>Lojas virtuais</i><i>Sistema</i><i>Automação</i></div></div></div><aside className="v4-contact-aside v52-contact-aside">
  <figure className="v41-contact-human"><Image src="/media/human-v60/mobile-professional.webp" alt="Profissional usando smartphone durante a rotina de trabalho" fill sizes="(max-width: 900px) 100vw, 42vw"/><span><small>CONVERSA REAL</small><b>Projetos começam entendendo o contexto.</b></span></figure>
  <div><i><MessageCircle size={18}/></i><small>WHATSAPP</small><a href={site.whatsapp} target="_blank" rel="noreferrer">{site.phone}</a></div>
  <div><i><Mail size={18}/></i><small>E-MAIL</small><a href={`mailto:${site.email}`}>{site.email}</a></div>
  <div><i><Instagram size={18}/></i><small>INSTAGRAM</small><a href={site.instagram} target="_blank" rel="noreferrer">@webfun.com.br</a></div>
  <div><i><MapPin size={18}/></i><small>BASE</small><b>{site.location}</b></div>
  <div><i><Clock3 size={18}/></i><small>HORÁRIO</small><b>{site.hours}</b></div>
  <div className="v52-contact-reach"><i><Globe2 size={18}/></i><small>ATENDIMENTO</small><b>Projetos em todo o Brasil</b></div>
  <div className="v52-contact-note"><span>PRIMEIRO CONTATO</span><b>Você traz o contexto. A gente organiza o próximo passo.</b><p>Antes de qualquer proposta técnica, alinhamos objetivo, momento, prioridades e o que realmente precisa ser construído.</p></div>
 </aside></div></div></section>
 <section className="v4-section v4-contact-steps"><div className="shell"><SectionIntro tag="O QUE ACONTECE DEPOIS" title={<>Você conta o cenário. <em>A gente transforma em caminho.</em></>} subtitle="Sem exigir briefing pronto: entendemos o objetivo e indicamos o próximo passo."/><div className="v4-contact-step-grid"><article><span>01</span><h3>Você conta o contexto</h3><p>Problema, objetivo, momento e o que já existe.</p></article><article><span>02</span><h3>A gente organiza</h3><p>Necessidades, prioridades, escopo e possíveis caminhos.</p></article><article><span>03</span><h3>Definimos o próximo passo</h3><p>Projeto, proposta, diagnóstico ou uma conversa mais aprofundada.</p></article></div></div></section>
 <section className="v4-section v4-faq-section"><div className="shell v4-faq-grid"><SectionIntro tag="ANTES DE ENVIAR" title={<>Dúvidas comuns <em>sobre o início.</em></>} subtitle="Algumas respostas rápidas antes da conversa."/><FAQ/></div></section>
 </main>}