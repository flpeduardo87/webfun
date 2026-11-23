import { ArrowUpRight, Check, Code2, Database, LayoutGrid, Mail, Menu, Search, ShieldCheck, Shirt, ShoppingBag, Users, Zap } from 'lucide-react';

const labels = {
 'sites-e-experiencias-digitais':'Site em desktop e celular com identidade visual consistente',
 'e-commerce':'Loja virtual com produto, carrinho e confirmação de pedido',
 'sistemas-e-plataformas':'Sistema com painel, tarefas e organização de clientes',
 'automacao-e-ia':'Fluxo conectando contato, organização de dados e equipe',
 'seo-performance':'Busca, estrutura de conteúdo e análise técnica do site',
 'ux-ui-produto-digital':'Jornada de agendamento com escolha de data e confirmação',
};
function Panel({x,y,w,h,children,round=16}){return <g><rect className="wf-h-surface" x={x} y={y} width={w} height={h} rx={round}/>{children}</g>}
function Line({x,y,w=80}){return <rect className="wf-h-line" x={x} y={y} width={w} height="6" rx="3"/>}
function Label({x,y,children,size=13,muted=false,weight=500}){return <text x={x} y={y} fontSize={size} fontWeight={weight} className={muted?'wf-h-muted':'wf-h-text'}>{children}</text>}
function Pill({x,y,w=110,children}){return <g><rect x={x} y={y} width={w} height="30" rx="15" className="wf-h-accent"/><text x={x+w/2} y={y+19} textAnchor="middle" fill="white" fontSize="11" fontWeight="600">{children}</text></g>}
function Browser({children,title='webfun',x=42,y=66,w=442,h=280}){return <Panel x={x} y={y} w={w} h={h}><circle cx={x+18} cy={y+18} r="3" className="wf-h-line"/><circle cx={x+29} cy={y+18} r="3" className="wf-h-line"/><circle cx={x+40} cy={y+18} r="3" className="wf-h-line"/><Label x={x+w/2} y={y+22} size={11} muted>{title}</Label><path d={`M${x} ${y+36}h${w}`} className="wf-h-border"/>{children}</Panel>}
function Phone({x,y,children,w=122,h=227}){return <g><rect x={x} y={y} width={w} height={h} rx="23" className="wf-h-phone"/><rect x={x+w/2-18} y={y+12} width="36" height="5" rx="3" className="wf-h-line"/>{children}</g>}

export default function ServiceHeroIllustration({slug}){
 return <div className={`wf-service-scene wf-scene-${slug}`}><svg viewBox="0 0 560 430" role="img" aria-label={`Ilustração conceitual: ${labels[slug]}`}>
 <circle cx="460" cy="88" r="108" className="wf-h-orbit"/><circle cx="110" cy="355" r="94" className="wf-h-orbit"/>
 {slug==='sites-e-experiencias-digitais' && <>
  <Browser title="sua marca / início" x={34} y={65} w={438} h={285}>
   <Label x={56} y={130} weight={700} size={15}>sua marca</Label><Menu x={427} y={114} width={18}/>
   <Label x={56} y={181} size={26} weight={700}>Uma presença</Label><Label x={56} y={212} size={26} weight={700}>que faz sentido.</Label>
   <Line x={56} y={234} w={160}/><Line x={56} y={248} w={120}/><Pill x={56} y={278} w={120}>Conheça a marca</Pill>
   <rect x={291} y={150} width={151} height={146} rx={12} className="wf-h-tint"/><LayoutGrid x={333} y={190} width={66} height={66} strokeWidth={1.2}/>
  </Browser>
  <Phone x={401} y={183} w={121} h={218}><Label x={418} y={227} size={13} weight={700}>sua marca</Label><rect x={417} y={243} width={89} height={66} rx={8} className="wf-h-tint"/><LayoutGrid x={447} y={261} width={30}/><Line x={418} y={326} w={80}/><Line x={418} y={341} w={58}/><Pill x={417} y={357} w={90}>Conhecer</Pill></Phone>
  <Panel x={58} y={365} w={233} h={39} round={19}><Check x={71} y={375} width={18}/><Label x={98} y={389} size={12}>Uma identidade. Em toda tela.</Label></Panel>
 </>}
 {slug==='e-commerce' && <>
  <Browser title="coleção / essenciais" x={34} y={57} w={443} h={288}>
   <Label x={56} y={125} weight={700} size={16}>essencial.</Label><ShoppingBag x={438} y={108} width={18}/>
   <rect x={56} y={145} width={179} height={175} rx={12} className="wf-h-tint"/><Shirt x={84} y={175} width={120} height={115} strokeWidth={1.1}/>
   <Label x={257} y={166} size={10} muted>COLEÇÃO ESSENCIAL</Label><Label x={257} y={197} size={24} weight={700}>Seu próximo</Label><Label x={257} y={225} size={24} weight={700}>favorito.</Label><Line x={257} y={244} w={129}/>
   {[0,1,2].map(i=><circle key={i} cx={264+i*22} cy={268} r={6} className={i===1?'wf-h-accent':'wf-h-line'}/>)}
   <Pill x={257} y={286} w={145}>Adicionar à sacola</Pill>
  </Browser>
  <Panel x={308} y={325} w={215} h={76}><circle cx={337} cy={352} r={14} className="wf-h-accent"/><Check x={328} y={343} width={18} color="white"/><Label x={361} y={351} size={13} weight={700}>Pedido confirmado</Label><Label x={361} y={371} size={11} muted>Próximo passo: entrega.</Label><Line x={326} y={385} w={161}/></Panel>
  <ShieldCheck x={58} y={363} width={24}/><Label x={92} y={381} size={12}>Compra simples, do início ao fim.</Label>
 </>}
 {slug==='sistemas-e-plataformas' && <>
  <Browser title="painel / visão geral" x={33} y={53} w={491} h={309}>
   <rect x={47} y={105} width={48} height={241} rx={9} className="wf-h-tint"/><LayoutGrid x={61} y={123} width={20}/><Users x={61} y={171} width={20}/><Database x={61} y={219} width={20}/>
   <Label x={114} y={127} size={22} weight={700}>Sua operação, organizada.</Label><Label x={114} y={149} size={11} muted>Uma visão clara do que acontece.</Label>
   {['Clientes','Projetos','Equipe'].map((t,i)=><g key={t}><rect x={114+i*131} y={168} width={120} height={61} rx={9} className="wf-h-tint"/><Label x={127+i*131} y={190} size={11}>{t}</Label><Line x={127+i*131} y={205} w={65}/></g>)}
   {['Revisar proposta','Organizar entregas','Atualizar cadastro'].map((t,i)=><g key={t}><rect x={114} y={244+i*31} width={381} height={25} rx={6} className="wf-h-soft"/><circle cx={128} cy={256+i*31} r={4} className="wf-h-accent"/><Label x={142} y={260+i*31} size={11}>{t}</Label><Label x={425} y={260+i*31} size={10} muted>{i===2?'Concluído':'Em curso'}</Label></g>)}
  </Browser>
  <Panel x={162} y={375} w={250} h={37} round={18}><Users x={178} y={384} width={18}/><Label x={206} y={398} size={12}>Processos e pessoas conectados.</Label></Panel>
 </>}
 {slug==='automacao-e-ia' && <>
  <Panel x={52} y={48} w={456} h={70}><Zap x={72} y={69} width={26}/><Label x={111} y={78} size={20} weight={700}>Menos tarefas repetidas.</Label><Label x={111} y={99} size={12} muted>Mais tempo para o que precisa de você.</Label></Panel>
  <path d="M133 218H427M280 218V310" fill="none" stroke="var(--scene-accent)" strokeWidth="2" strokeDasharray="5 6"/>
  {[{x:41,Icon:Mail,t:'Contato',s:'Uma nova mensagem'},{x:210,Icon:Database,t:'Organização',s:'Dados no lugar certo'},{x:379,Icon:Users,t:'Equipe',s:'A pessoa certa, avisada'}].map(({x,Icon,t,s})=><Panel key={t} x={x} y={163} w={140} h={126}><rect x={x+48} y={180} width={44} height={42} rx={12} className="wf-h-tint"/><Icon x={x+57} y={188} width={26}/><Label x={x+16} y={245} size={14} weight={700}>{t}</Label><Label x={x+12} y={268} size={10} muted>{s}</Label></Panel>)}
  <Panel x={162} y={321} w={238} h={62}><Check x={181} y={338} width={22}/><Label x={215} y={346} size={14} weight={700}>Fluxo concluído</Label><Label x={215} y={367} size={11} muted>Com regras definidas por você.</Label></Panel>
 </>}
 {slug==='seo-performance' && <>
  <Browser title="busca / descoberta" x={38} y={57} w={433} h={287}>
   <rect x={59} y={113} width={389} height={40} rx={20} className="wf-h-soft"/><Search x={73} y={124} width={18}/><Label x={102} y={139} size={14}>O que seu cliente procura?</Label>
   <Label x={60} y={187} size={11} muted>suaempresa.com.br</Label><Label x={60} y={212} size={20} weight={700}>Sua empresa. Bem apresentada.</Label><Line x={60} y={231} w={316}/><Line x={60} y={245} w={245}/>
   <rect x={60} y={267} width={179} height={56} rx={9} className="wf-h-tint"/><Code2 x={75} y={280} width={24}/><Label x={111} y={291} size={12} weight={700}>Base técnica</Label><Label x={111} y={308} size={10} muted>Estrutura bem cuidada</Label>
  </Browser>
  <Panel x={296} y={277} w={224} h={121}><Label x={315} y={304} size={13} weight={700}>Experiência em foco</Label>{['Carregamento','Navegação','Conteúdo'].map((t,i)=><g key={t}><Check x={314} y={318+i*22} width={15}/><Label x={340} y={330+i*22} size={11}>{t}</Label></g>)}</Panel>
  <Label x={58} y={376} size={12} muted>Encontrar. Entender. Navegar.</Label>
 </>}
 {slug==='ux-ui-produto-digital' && <>
  <Panel x={43} y={48} w={270} h={46} round={23}><Label x={65} y={77} size={13} weight={600}>Uma jornada que faz sentido.</Label><ArrowUpRight x={279} y={61} width={19}/></Panel>
  <Phone x={68} y={113} w={189} h={277}><Label x={89} y={162} size={20} weight={700}>Vamos agendar?</Label><Label x={89} y={185} size={11} muted>Escolha o melhor dia.</Label><Label x={91} y={215} size={10}>D   S   T   Q   Q   S   S</Label>
   {Array.from({length:28},(_,i)=><rect key={i} x={90+(i%7)*21} y={228+Math.floor(i/7)*21} width={16} height={16} rx={4} className={i===11?'wf-h-accent':'wf-h-soft'}/>)}<Pill x={89} y={333} w={145}>Confirmar horário</Pill>
  </Phone>
  <path d="M271 258H309" className="wf-h-border" strokeDasharray="4 5"/><ArrowUpRight x={280} y={230} width={22}/>
  <Panel x={318} y={164} w={189} h={181}><circle cx={412} cy={204} r={24} className="wf-h-accent"/><Check x={397} y={189} width={30} height={30} color="white"/><Label x={342} y={255} size={20} weight={700}>Tudo certo!</Label><Label x={341} y={279} size={12} muted>Seu horário está reservado.</Label><Line x={347} y={301} w={130}/><Line x={371} y={315} w={82}/></Panel>
  <Label x={332} y={382} size={12} muted>Menos dúvidas. Mais clareza.</Label>
 </>}
 </svg></div>;
}
