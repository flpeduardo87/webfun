import { whatsappHref } from '../lib/data';

export default function MidCTA() {
  return (
    <section className="wf-midcta" aria-label="Fale com a Webfun">
      <div className="shell wf-midcta-inner">
        <div className="wf-midcta-copy">
          <strong>Tem um projeto em mente?</strong>
          <p>Conte o que precisa — a gente responde no mesmo dia.</p>
        </div>
        <a
          href={whatsappHref('Olá, Webfun! Quero conversar sobre um projeto.')}
          target="_blank"
          rel="noreferrer"
          className="wf-midcta-btn"
        >
          <span aria-hidden="true">→</span> Falar sobre meu projeto
        </a>
      </div>
    </section>
  );
}
