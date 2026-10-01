-- ============================================================
-- MIGRAÇÃO CARDÁPIO V6.2 -> CORE MULTINICHO V1
-- Preserva restaurantes, membros e produtos existentes.
-- 1) Faça backup do banco.
-- 2) Execute este arquivo.
-- 3) Execute schema.sql para instalar as funções/RLS definitivas do Core V1.
-- ============================================================

begin;

do $$
begin
  if to_regclass('public.restaurants') is not null and to_regclass('public.businesses') is null then
    alter table public.restaurants rename to businesses;
  end if;
  if to_regclass('public.restaurant_members') is not null and to_regclass('public.business_members') is null then
    alter table public.restaurant_members rename to business_members;
  end if;
end $$;

do $$
begin
  if exists(select 1 from information_schema.columns where table_schema='public' and table_name='businesses' and column_name='restaurant_type') then
    alter table public.businesses rename column restaurant_type to business_subtype;
  end if;
  if exists(select 1 from information_schema.columns where table_schema='public' and table_name='business_members' and column_name='restaurant_id') then
    alter table public.business_members rename column restaurant_id to business_id;
  end if;
  if exists(select 1 from information_schema.columns where table_schema='public' and table_name='products' and column_name='restaurant_id') then
    alter table public.products rename column restaurant_id to business_id;
  end if;
end $$;

alter table public.businesses add column if not exists business_type text not null default 'food';
alter table public.businesses add column if not exists business_subtype text not null default '';
alter table public.products add column if not exists media jsonb not null default '[]'::jsonb;
alter table public.products add column if not exists attributes jsonb not null default '[]'::jsonb;

update public.businesses set business_type='food' where business_type is null or business_type='';
update public.businesses set config=jsonb_set(jsonb_set(coalesce(config,'{}'::jsonb),'{businessName}',to_jsonb(name),true),'{businessType}',to_jsonb(business_type),true);
update public.businesses set config=jsonb_set(config,'{businessSubtype}',to_jsonb(coalesce(business_subtype,'')),true);
update public.businesses set config=jsonb_set(config,'{conversionMode}',to_jsonb('order_whatsapp'::text),true) where not(config ? 'conversionMode');

-- Remove políticas antigas que referenciam nomes/colunas V6.2. schema.sql recria as novas.
do $$ declare r record; begin
  for r in select policyname,tablename from pg_policies where schemaname='public' and tablename in ('businesses','business_members','products') loop
    execute format('drop policy if exists %I on public.%I',r.policyname,r.tablename);
  end loop;
end $$;

-- Índices antigos podem manter nomes legados; isso não afeta funcionamento.
-- Garante a nova restrição lógica por negócio/produto.
do $$
begin
  if not exists(select 1 from pg_constraint where conrelid='public.products'::regclass and contype='u' and pg_get_constraintdef(oid) like '%business_id%product_key%') then
    alter table public.products add constraint products_business_product_key unique(business_id,product_key);
  end if;
end $$;

commit;

-- IMPORTANTE: execute supabase/schema.sql em seguida.
