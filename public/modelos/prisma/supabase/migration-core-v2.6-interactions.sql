-- Core Multinicho V2.6 — Pedidos + Leads centralizados
-- Execute apenas quando for habilitar o módulo operacional no Supabase.

create table if not exists public.interactions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  record_type text not null check (record_type in ('order','lead')),
  conversion_mode text not null default '',
  status text not null default 'new' check (status in ('new','in_progress','done','cancelled')),
  customer_name text not null default '',
  amount numeric(12,2) not null default 0 check (amount >= 0),
  items jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  source text not null default 'whatsapp',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists interactions_business_created_idx on public.interactions(business_id,created_at desc);
create index if not exists interactions_business_status_idx on public.interactions(business_id,status);

drop trigger if exists interactions_set_updated_at on public.interactions;
create trigger interactions_set_updated_at before update on public.interactions for each row execute function public.set_updated_at();

create or replace function public.create_public_interaction(
  p_business_slug text,p_record_type text,p_conversion_mode text default '',p_customer_name text default '',p_amount numeric default 0,p_items jsonb default '[]'::jsonb,p_metadata jsonb default '{}'::jsonb
)
returns table(id uuid,created_at timestamptz)
language plpgsql security definer set search_path='' as $$
declare v_business uuid; v_row public.interactions%rowtype;
begin
  if p_record_type not in ('order','lead') then raise exception 'Tipo de registro inválido'; end if;
  select b.id into v_business from public.businesses b where b.slug=p_business_slug and b.is_published=true limit 1;
  if v_business is null then raise exception 'Negócio não encontrado ou não publicado'; end if;
  insert into public.interactions(business_id,record_type,conversion_mode,customer_name,amount,items,metadata,source)
  values(v_business,p_record_type,coalesce(p_conversion_mode,''),left(coalesce(p_customer_name,''),160),greatest(coalesce(p_amount,0),0),coalesce(p_items,'[]'::jsonb),coalesce(p_metadata,'{}'::jsonb),'whatsapp')
  returning * into v_row;
  return query select v_row.id,v_row.created_at;
end; $$;

alter table public.interactions enable row level security;
drop policy if exists "interactions_member_select" on public.interactions;
create policy "interactions_member_select" on public.interactions for select to authenticated using(public.is_business_member(business_id));
drop policy if exists "interactions_editor_update" on public.interactions;
create policy "interactions_editor_update" on public.interactions for update to authenticated using(public.has_business_role(business_id,array['owner','admin','editor'])) with check(public.has_business_role(business_id,array['owner','admin','editor']));
drop policy if exists "interactions_admin_delete" on public.interactions;
create policy "interactions_admin_delete" on public.interactions for delete to authenticated using(public.has_business_role(business_id,array['owner','admin']));

revoke all on public.interactions from anon,authenticated;
grant select,update,delete on public.interactions to authenticated;
grant execute on function public.create_public_interaction(text,text,text,text,numeric,jsonb,jsonb) to anon,authenticated;
