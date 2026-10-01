import { fitProfiles, whatsappHref } from '../lib/data';

export default function FitSection(){
 return <div className="v4-fit-grid"><div className="v4-fit-copy"><span className="v4-tag v788-section-tag">Para quem</span><h2>Talvez esteja na hora <em>de resolver isso.</em></h2><p>Se o digital da sua empresa ficou para trás, a operação começou a travar ou uma ideia precisa sair do papel, vale uma conversa antes de decidir a solução.</p><a href={whatsappHref('Olá, Webfun! Acho que vocês podem me ajudar a resolver isso.')} target="_blank" rel="noreferrer" className="v4-primary-button">Quero resolver isso</a></div><div className="v4-fit-cards">{fitProfiles.map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>;
}
