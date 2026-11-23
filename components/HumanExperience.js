import Image from 'next/image';
import { MousePointer2, Smartphone, UsersRound } from 'lucide-react';

const humanGallery = [
  { src: '/media/human-v60/creative-collaboration.webp', alt: 'Profissionais trabalhando juntos em uma experiência digital' },
  { src: '/media/human-v60/mobile-professional.webp', alt: 'Profissional usando smartphone durante a rotina de trabalho' },
  { src: '/media/human-v60/laptop-professional.webp', alt: 'Profissional trabalhando em notebook em um ambiente contemporâneo' },
  { src: '/media/human-v60/dashboard-professional.webp', alt: 'Profissional analisando informações em um dashboard' },
];

export default function HumanExperience(){
  return (
    <div className="v41-human-grid v52-human-grid v56-human-grid">
      <div className="v41-human-copy v56-human-copy">
        <span className="v4-tag v788-section-tag">Experiência humana</span>
        <h2>Feito para quem <em>vai usar de verdade.</em></h2>
        <p>Seu cliente quer entender, comprar, agendar ou pedir sem esforço. Sua equipe quer trabalhar sem depender de caminhos confusos. É para essas situações reais que desenhamos.</p>
        <div className="v41-human-signals">
          <article><i><MousePointer2 size={18}/></i><div><b>Entender rápido</b><span>Mensagem e caminhos sem ruído</span></div></article>
          <article><i><Smartphone size={18}/></i><div><b>Usar sem esforço</b><span>Experiência boa no celular e no desktop</span></div></article>
          <article><i><UsersRound size={18}/></i><div><b>Confiar e agir</b><span>Design que ajuda a decisão acontecer</span></div></article>
        </div>
      </div>

      <div className="v56-human-gallery" aria-label="Experiências digitais em diferentes contextos">
        {humanGallery.map((item, index) => (
          <figure key={item.src} className={`v56-human-gallery-item is-${index + 1}`}>
            <Image src={item.src} alt={item.alt} fill quality={100} unoptimized sizes="(max-width: 760px) 50vw, (max-width: 1100px) 34vw, 440px" />
          </figure>
        ))}
      </div>
    </div>
  );
}
