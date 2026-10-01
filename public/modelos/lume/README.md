# LUME — Odontologia Integrada

Projeto-vitrine premium desenvolvido para o portfólio WebFun.

## Páginas
- `index.html` — Home completa
- `tratamentos.html` — Especialidades e tratamentos
- `equipe.html` — Especialistas
- `tecnologia.html` — Estrutura digital e diferenciais
- `resultados.html` — Abordagem e casos-conceito
- `agendar.html` — Agendamento online funcional
- `paciente.html` — Área do paciente
- `contato.html` — Contato
- `admin.html` — Painel administrativo demonstrativo da agenda

## O que já funciona
- Menu desktop e mobile
- CTA de agendamento no mobile
- Dropdown de tratamentos no desktop
- Formulários e microinterações
- Agendamento em múltiplas etapas
- Filtro de profissionais por especialidade
- Datas e horários disponíveis
- Bloqueio de horário já reservado para o mesmo profissional
- Persistência dos agendamentos no `localStorage`
- Código de confirmação
- Área do paciente com busca por código + e-mail
- Cancelamento pelo portal do paciente
- Painel administrativo com filtros
- Confirmação, cancelamento e exclusão de reservas
- Exportação da agenda em CSV
- Layout responsivo

## Teste rápido
Abra `agendar.html`, faça uma reserva e depois abra `admin.html`. O agendamento aparecerá no painel.

Para testar a Área do Paciente com um registro pré-carregado:
- Código: `LUME-4821`
- E-mail: `mariana@example.com`

## Observação de produção
Este é um projeto funcional de front-end para portfólio. Em uma clínica real, o agendamento deve ser conectado a backend/banco de dados, autenticação, LGPD, notificações (WhatsApp/e-mail/SMS), controle de permissões, logs, integrações com prontuário/CRM e regras de disponibilidade definidas pela operação.

## Referência visual
`assets/design-reference.png` contém o conceito visual aprovado usado como direção para esta evolução.


## Ajustes v2.1
- Tipografia de apoio ampliada para melhorar legibilidade em cards, formulários, depoimentos, footer, agenda e admin.
- Corpo mobile mantido em 16px, com parágrafos principais em 16–17px.
- Hero mobile com padding lateral simétrico e imagem sem estouro para a direita.
