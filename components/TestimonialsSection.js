import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Atendimento excelente, entrega rápida e resultado acima do esperado. Recomendo para quem busca qualidade.',
    name: 'Flávia Sussenbach',
    project: 'Flávia Sussenbach Advocacia',
    avatar: '/media/testimonials/flavia.webp',
    featured: true,
  },
  {
    quote: 'Foi muito bom ver o trabalho começar a aparecer no Google para buscas importantes do negócio. O resultado fez diferença na nossa presença online.',
    name: 'João Kühl',
    project: 'Frigorífico Três Reis',
    avatar: '/media/testimonials/joao.webp',
  },
  {
    quote: 'Atendimento rápido e transparente do início ao fim. Tudo foi explicado com clareza e o resultado ficou do jeito que precisávamos.',
    name: 'Jean Mielke',
    project: 'Mielke Energia Solar',
    avatar: '/media/testimonials/jean.webp',
  },
];

function Stars(){
  return <span className="v771-testimonial-stars" aria-label="5 estrelas">{Array.from({length:5},(_,i)=><Star key={i} size={14} fill="currentColor" aria-hidden="true"/>)}</span>;
}

function TestimonialCard({item}){
  return <article className={`v771-testimonial-card${item.featured?' is-featured':''} has-quote`}>
    <Quote className="v771-testimonial-quote-icon" size={26} aria-hidden="true"/>
    <blockquote>{item.quote}</blockquote>
    <div className="v771-testimonial-footer">
      <div className="v771-testimonial-person">
        <span className="v771-testimonial-avatar">
          <Image src={item.avatar} alt={`Foto de ${item.name}`} width={84} height={84} quality={100} unoptimized/>
        </span>
        <span><strong>{item.name}</strong><small>{item.project}</small></span>
      </div>
      <Stars/>
    </div>
  </article>;
}

export default function TestimonialsSection(){
  return <section className="v771-testimonials" aria-labelledby="v771-testimonials-title">
    <div className="shell">
      <div className="v771-testimonials-head">
        <div>
          <span className="v4-tag v788-section-tag">Depoimentos</span>
          <h2 id="v771-testimonials-title">Quem confia, indica.</h2>
        </div>
        <p>Projetos construídos para resolver problemas reais — e relações que continuam depois da entrega.</p>
      </div>
      <div className="v771-testimonials-grid">
        <TestimonialCard item={testimonials[0]}/>
        <div className="v771-testimonials-stack">
          <TestimonialCard item={testimonials[1]}/>
          <TestimonialCard item={testimonials[2]}/>
        </div>
      </div>
    </div>
  </section>;
}
