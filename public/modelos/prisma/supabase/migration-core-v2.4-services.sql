-- Core Multinicho V2.4 — Motor de Serviços
-- Execute somente em projetos que já possuem o schema Core V1/V2.x.

alter table public.products
  add column if not exists metadata jsonb not null default '{}'::jsonb;

-- O campo metadata passa a concentrar dados específicos por vertical,
-- como priceMode, duration e leadMode, sem criar colunas por nicho.
update public.products
set metadata = coalesce(metadata, '{}'::jsonb)
where metadata is null;
