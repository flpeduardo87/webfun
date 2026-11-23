const stats = [
  { value: '+5',   label: 'anos no mercado'      },
  { value: '+100', label: 'projetos entregues'    },
  { value: '+40',  label: 'empresas atendidas'    },
];

export default function StatsBar() {
  return (
    <section className="wf-stats-bar" aria-label="Números da Webfun">
      <div className="shell">
        <dl className="wf-stats-row">
          {stats.map(({ value, label }) => (
            <div key={label} className="wf-stat">
              <dt className="wf-stat-value">{value}</dt>
              <dd className="wf-stat-label">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
