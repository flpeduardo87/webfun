import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { navigation, site, whatsappHref } from '../lib/data';
import BrandLogo from './BrandLogo';
import BackToTopButton from './BackToTopButton';

export default function SiteFooter() {
  return (
    <footer className="v4-footer">
      <div className="shell v4-footer-cta">
        <div className="v4-footer-cta-copy">
          <span className="v4-tag v788-section-tag">Vamos conversar</span>
          <h2>Seu próximo projeto pode começar aqui.</h2>
          <p>Conte o que precisa melhorar, construir ou organizar. A primeira conversa serve para entender o cenário e indicar o próximo passo.</p>
          <a href={whatsappHref('Olá, Webfun! Quero começar um projeto.')} target="_blank" rel="noreferrer" className="v4-primary-button">Começar meu projeto</a>
        </div>
        <div className="v777-footer-orbit" aria-hidden="true">
          <span className="v777-orbit-ring is-one" />
          <span className="v777-orbit-ring is-two" />
          <span className="v777-orbit-ring is-three" />
          <span className="v777-orbit-node is-a" />
          <span className="v777-orbit-node is-b" />
          <span className="v777-orbit-node is-c" />
          <span className="v777-orbit-core"><img src="/brand/webfun-icon.svg" alt="" /></span>
        </div>
      </div>
      <div className="shell v4-footer-grid">
        <div className="v4-footer-brand"><Link href="/" className="v4-brand" aria-label="Webfun — início"><BrandLogo footer/></Link><p>{site.positioning}</p></div>
        <nav>{navigation.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <div className="v4-footer-contact"><small>CONTATO</small><a href={site.whatsapp} target="_blank" rel="noreferrer">{site.phone} <ArrowRight size={13}/></a><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.instagram} target="_blank" rel="noreferrer">Instagram <ArrowRight size={13}/></a><span>{site.location}</span></div>
      </div>
      <div className="shell v4-footer-bottom"><span>© {new Date().getFullYear()} Webfun</span><BackToTopButton/><div className="v768-footer-bottom-actions"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos">Termos</Link></div></div>
    </footer>
  );
}
