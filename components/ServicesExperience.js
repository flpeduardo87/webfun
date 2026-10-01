import Link from 'next/link';
import { services } from '../lib/data';
import ServiceIllustration from './ServiceIllustration';

const descriptions = {
  'sites-e-experiencias-digitais':'Sites institucionais e landing pages para apresentar sua empresa e gerar contatos.',
  'e-commerce':'Facilite a compra e venda com uma loja feita para o seu negócio.',
  'sistemas-e-plataformas':'Organize clientes, tarefas e processos em um só lugar.',
  'automacao-e-ia':'Conecte ferramentas e reduza tarefas manuais da sua equipe.',
  'seo-performance':'Seja encontrado nas buscas e ofereça uma navegação mais rápida.',
  'ux-ui-produto-digital':'UX/UI para tornar sites, aplicativos e sistemas mais claros e fáceis de usar.',
};

export default function ServicesExperience(){
  return <div className="wf-service-grid" aria-label="Serviços da Webfun">
    {services.map(service=><Link key={service.slug} href={`/servicos/${service.slug}`} className="wf-service-card" aria-labelledby={`service-title-${service.slug}`}>
      <div className={`wf-service-art wf-art-${service.slug}`} aria-hidden="true"><ServiceIllustration slug={service.slug}/></div>
      <div className="wf-service-body"><h3 id={`service-title-${service.slug}`}>{service.title}</h3><p>{descriptions[service.slug]}</p><span className="wf-service-cta">Explorar serviço</span></div>
    </Link>)}
  </div>;
}
