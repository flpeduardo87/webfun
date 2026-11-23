import Reveal from './Reveal';

function formatTag(value) {
  if (typeof value !== 'string') return value;
  const lower = value.toLocaleLowerCase('pt-BR');
  const sentence = lower.charAt(0).toLocaleUpperCase('pt-BR') + lower.slice(1);
  return sentence
    .replace(/\bwebfun\b/g, 'Webfun')
    .replace(/\bux\/ui\b/g, 'UX/UI')
    .replace(/\bseo\b/g, 'SEO')
    .replace(/\bia\b/g, 'IA')
    .replace(/\bapi\b/g, 'API')
    .replace(/\bb2b\b/g, 'B2B');
}

export default function SectionIntro({ tag, title, subtitle, align = 'left', className = '', level = 'h2' }) {
  const Heading = level;
  return (
    <Reveal>
      <div className={`v4-section-intro v4-section-intro-${align} ${className}`}>
        <span className="v4-tag v788-section-tag">{formatTag(tag)}</span>
        <Heading>{title}</Heading>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </Reveal>
  );
}
