import { whatsappHref } from '../lib/data';
import {
  CalendarDays,
  KeyRound,
  Search,
  LayoutDashboard,
  Calculator,
  ShoppingCart,
  UserRound,
  Cable,
} from 'lucide-react';

const capabilities = [
  { title: 'Agendamento', text: 'Organize horários e facilite o agendamento de serviços.', mobileText: 'Organize e controle sua agenda.', Icon: CalendarDays },
  { title: 'Reservas', text: 'Controle datas e vagas para organizar suas reservas.', mobileText: 'Controle datas e vagas.', Icon: KeyRound },
  { title: 'Busca & filtros', text: 'Facilite a busca por produtos, serviços e conteúdos.', mobileText: 'Encontre o que precisa.', Icon: Search },
  { title: 'Painéis de gestão', text: 'Acompanhe dados e gerencie a operação em um só lugar.', mobileText: 'Gerencie sua operação.', Icon: LayoutDashboard },
  { title: 'Simuladores', text: 'Ajude seus clientes a simular valores e comparar opções.', mobileText: 'Simule e compare valores.', Icon: Calculator },
  { title: 'Checkout', text: 'Simplifique os pedidos com uma compra rápida e clara.', mobileText: 'Simplifique suas vendas.', Icon: ShoppingCart },
  { title: 'Área do cliente', text: 'Reúna informações e serviços em uma área exclusiva.', mobileText: 'Acesse dados e serviços.', Icon: UserRound },
  { title: 'Integrações', text: 'Conecte ferramentas e automatize tarefas da sua equipe.', mobileText: 'Automatize sua rotina e tarefas.', Icon: Cable },
];

export default function CapabilitiesGrid(){
  return (
    <>
    <div className="v745-capability-grid" aria-label="Capacidades de produtos digitais Webfun">
      {capabilities.map(({title,text,mobileText,Icon}) => (
        <article key={title}>
          <i aria-hidden="true"><Icon size={20}/></i>
          <h3>{title}</h3>
          <p><span className="wf-resource-full">{text}</span><span className="wf-resource-compact">{mobileText}</span></p>
        </article>
      ))}
    </div>
    <div className="wf-capabilities-action"><a className="v4-primary-button" href={whatsappHref("Olá, Webfun! Quero conversar sobre os recursos para meu projeto.")} target="_blank" rel="noopener noreferrer">Conversar sobre meu projeto</a></div>
    </>
  );
}
