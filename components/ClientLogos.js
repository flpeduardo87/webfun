// Substitua os objetos abaixo pelos logos reais quando disponíveis.
// Troque `logo: null` por `logo: '/media/clients/nome.svg'` (ou .png/.webp).

const clients = [
  { id: 1, name: 'Mielke Energia Solar', logo: null },
  { id: 2, name: 'Frigorífico Três Reis', logo: null },
  { id: 3, name: 'Flávia Advocacia',      logo: null },
  { id: 4, name: 'Cliente 4',             logo: null },
  { id: 5, name: 'Cliente 5',             logo: null },
  { id: 6, name: 'Cliente 6',             logo: null },
  { id: 7, name: 'Cliente 7',             logo: null },
];

export default function ClientLogos() {
  return (
    <section className="wf-clients-section" aria-label="Clientes Webfun">
      <div className="shell">
        <p className="wf-clients-label">Empresas que confiam na Webfun</p>
        <div className="wf-clients-row">
          {clients.map(client => (
            <div key={client.id} className="wf-client-logo" title={client.name}>
              {client.logo ? (
                <img src={client.logo} alt={client.name} width={130} height={44} loading="lazy" />
              ) : (
                <span className="wf-client-placeholder">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
