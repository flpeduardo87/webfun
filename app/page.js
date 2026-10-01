import ServiceStrip from '../components/ServiceStrip';
import HomeHero from '../components/HomeHero';
import SectionIntro from '../components/SectionIntro';
import ServicesExperience from '../components/ServicesExperience';
import FeaturedProjects from '../components/FeaturedProjects';
import ProcessExperience from '../components/ProcessExperience';
import FitSection from '../components/FitSection';
import FAQ from '../components/FAQ';
import HumanExperience from '../components/HumanExperience';
import CapabilitiesGrid from '../components/CapabilitiesGrid';
import Reveal from '../components/Reveal';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Home(){
 return <main id="conteudo" className="v4-home v62-conversion-home">
  <HomeHero/>

  <ServiceStrip/>

  <section id="servicos-home" className="v4-section v4-services-section"><div className="shell"><SectionIntro tag="SERVIÇOS" title={<>Como podemos te ajudar agora?</>} subtitle="Site, loja, sistema ou automação: começamos pelo que precisa melhorar no seu negócio."/><Reveal className="v42-reveal-block"><ServicesExperience/></Reveal></div></section>

  <section className="v4-section v745-capabilities-section"><div className="shell"><div className="v745-capabilities-panel"><SectionIntro tag="RECURSOS" title={<>Seu site pode vender, atender e operar melhor.</>} subtitle="O projeto é desenhado em torno da jornada real do cliente e do time interno — e não em torno de um template."/><Reveal className="v42-reveal-block"><CapabilitiesGrid/></Reveal></div></div></section>

  <section className="v4-section v4-work-section"><div className="shell"><SectionIntro tag="PROJETOS" title={<>Veja o que isso vira na prática.</>} subtitle="Uma seleção de sites, sistemas e produtos digitais em diferentes segmentos."/><Reveal className="v42-reveal-block"><FeaturedProjects/></Reveal></div></section>

  <Reveal className="v42-reveal-block"><TestimonialsSection/></Reveal>

  <section className="v4-section v41-human-section"><div className="shell"><Reveal className="v42-reveal-block"><HumanExperience/></Reveal></div></section>

  <section className="v4-section v4-fit-section"><div className="shell"><Reveal className="v42-reveal-block"><FitSection/></Reveal></div></section>

  <section className="v4-section v4-process-section v745-process-section"><div className="shell"><SectionIntro tag="PROCESSO" title={<>Clareza antes de código.</>} subtitle="Um processo simples o suficiente para ser ágil e estruturado o bastante para evitar retrabalho e decisões sem direção."/><Reveal className="v42-reveal-block"><ProcessExperience/></Reveal></div></section>

  <section className="v4-section v4-faq-section"><div className="shell v4-faq-grid"><SectionIntro tag="PERGUNTAS FREQUENTES" title={<>Tire suas dúvidas aqui.</>} subtitle="Respostas rápidas sobre escopo, prazo, investimento e forma de trabalho."/><FAQ/></div></section>
 </main>;
}
