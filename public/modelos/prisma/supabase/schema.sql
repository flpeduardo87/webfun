-- ============================================================
-- CORE MULTINICHO V2.4 — SUPABASE
-- Schema para Alimentação, Varejo, Automotivo, Serviços e próximos motores.
-- Em projetos que já usam o V6.2, execute primeiro migration-v6.2-to-core-v1.sql.
-- ============================================================

create extension if not exists pgcrypto;

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null,
  business_type text not null default 'food' check (business_type in ('food','retail','automotive','services','real_estate','other')),
  business_subtype text not null default '',
  config jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_members (
  business_id uuid not null references public.businesses(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('owner','admin','editor','viewer')),
  created_at timestamptz not null default now(),
  primary key (business_id,user_id)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  product_key text not null,
  section text not null,
  name text not null,
  description text not null default '',
  price numeric(12,2) not null default 0 check (price >= 0),
  image_url text not null default '',
  media jsonb not null default '[]'::jsonb,
  attributes jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  highlight boolean not null default false,
  available boolean not null default true,
  badges jsonb not null default '[]'::jsonb,
  variants jsonb not null default '[]'::jsonb,
  addons jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id,product_key)
);


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

create index if not exists products_business_idx on public.products(business_id,sort_order);
create index if not exists business_members_user_idx on public.business_members(user_id);
create index if not exists businesses_slug_idx on public.businesses(slug);
create index if not exists businesses_type_idx on public.businesses(business_type);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path='' as $$
begin new.updated_at=now(); return new; end; $$;

drop trigger if exists businesses_set_updated_at on public.businesses;
create trigger businesses_set_updated_at before update on public.businesses for each row execute function public.set_updated_at();
drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at before update on public.products for each row execute function public.set_updated_at();
drop trigger if exists interactions_set_updated_at on public.interactions;
create trigger interactions_set_updated_at before update on public.interactions for each row execute function public.set_updated_at();

create or replace function public.has_business_role(p_business uuid,p_roles text[])
returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.business_members bm where bm.business_id=p_business and bm.user_id=(select auth.uid()) and bm.role=any(p_roles));
$$;

create or replace function public.is_business_member(p_business uuid)
returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.business_members bm where bm.business_id=p_business and bm.user_id=(select auth.uid()));
$$;

create or replace function public.create_business_for_current_user(
  p_name text,p_slug text,p_business_type text default 'food',p_business_subtype text default '',p_config jsonb default '{}'::jsonb
)
returns table(id uuid,slug text,name text)
language plpgsql security definer set search_path='' as $$
declare v_user uuid:=auth.uid(); v_business public.businesses%rowtype;
begin
  if v_user is null then raise exception 'Usuário não autenticado'; end if;
  if p_slug is null or p_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then raise exception 'Slug inválido'; end if;
  if p_business_type not in ('food','retail','automotive','services','real_estate','other') then raise exception 'Segmento inválido'; end if;
  insert into public.businesses(slug,name,business_type,business_subtype,config,created_by)
  values(p_slug,nullif(trim(p_name),''),p_business_type,coalesce(trim(p_business_subtype),''),coalesce(p_config,'{}'::jsonb),v_user)
  returning * into v_business;
  insert into public.business_members(business_id,user_id,role) values(v_business.id,v_user,'owner');
  return query select v_business.id,v_business.slug,v_business.name;
end; $$;


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

create or replace function public.can_manage_catalog_image(object_name text)
returns boolean language plpgsql stable security definer set search_path='' as $$
declare v_business uuid;
begin
  begin v_business:=split_part(object_name,'/',1)::uuid; exception when others then return false; end;
  return public.has_business_role(v_business,array['owner','admin','editor']);
end; $$;

alter table public.businesses enable row level security;
alter table public.business_members enable row level security;
alter table public.products enable row level security;
alter table public.interactions enable row level security;

drop policy if exists "businesses_public_or_member_select" on public.businesses;
create policy "businesses_public_or_member_select" on public.businesses for select to anon,authenticated using(is_published=true or public.is_business_member(id));
drop policy if exists "businesses_admin_update" on public.businesses;
create policy "businesses_admin_update" on public.businesses for update to authenticated using(public.has_business_role(id,array['owner','admin','editor'])) with check(public.has_business_role(id,array['owner','admin','editor']));
drop policy if exists "businesses_owner_delete" on public.businesses;
create policy "businesses_owner_delete" on public.businesses for delete to authenticated using(public.has_business_role(id,array['owner']));

drop policy if exists "members_self_select" on public.business_members;
create policy "members_self_select" on public.business_members for select to authenticated using(user_id=(select auth.uid()) or public.has_business_role(business_id,array['owner','admin']));
drop policy if exists "members_admin_insert" on public.business_members;
create policy "members_admin_insert" on public.business_members for insert to authenticated with check(public.has_business_role(business_id,array['owner','admin']));
drop policy if exists "members_admin_update" on public.business_members;
create policy "members_admin_update" on public.business_members for update to authenticated using(public.has_business_role(business_id,array['owner','admin'])) with check(public.has_business_role(business_id,array['owner','admin']));
drop policy if exists "members_admin_delete" on public.business_members;
create policy "members_admin_delete" on public.business_members for delete to authenticated using(public.has_business_role(business_id,array['owner','admin']));

drop policy if exists "products_public_or_member_select" on public.products;
create policy "products_public_or_member_select" on public.products for select to anon,authenticated using(exists(select 1 from public.businesses b where b.id=products.business_id and (b.is_published=true or public.is_business_member(b.id))));
drop policy if exists "products_editor_insert" on public.products;
create policy "products_editor_insert" on public.products for insert to authenticated with check(public.has_business_role(business_id,array['owner','admin','editor']));
drop policy if exists "products_editor_update" on public.products;
create policy "products_editor_update" on public.products for update to authenticated using(public.has_business_role(business_id,array['owner','admin','editor'])) with check(public.has_business_role(business_id,array['owner','admin','editor']));
drop policy if exists "products_editor_delete" on public.products;
create policy "products_editor_delete" on public.products for delete to authenticated using(public.has_business_role(business_id,array['owner','admin','editor']));


drop policy if exists "interactions_member_select" on public.interactions;
create policy "interactions_member_select" on public.interactions for select to authenticated using(public.is_business_member(business_id));
drop policy if exists "interactions_editor_update" on public.interactions;
create policy "interactions_editor_update" on public.interactions for update to authenticated using(public.has_business_role(business_id,array['owner','admin','editor'])) with check(public.has_business_role(business_id,array['owner','admin','editor']));
drop policy if exists "interactions_admin_delete" on public.interactions;
create policy "interactions_admin_delete" on public.interactions for delete to authenticated using(public.has_business_role(business_id,array['owner','admin']));

revoke all on public.businesses from anon,authenticated;
revoke all on public.business_members from anon,authenticated;
revoke all on public.products from anon,authenticated;
revoke all on public.interactions from anon,authenticated;
grant select on public.businesses to anon,authenticated;
grant update,delete on public.businesses to authenticated;
grant select,insert,update,delete on public.business_members to authenticated;
grant select on public.products to anon,authenticated;
grant insert,update,delete on public.products to authenticated;
grant select,update,delete on public.interactions to authenticated;
grant execute on function public.create_business_for_current_user(text,text,text,text,jsonb) to authenticated;
grant execute on function public.create_public_interaction(text,text,text,text,numeric,jsonb,jsonb) to anon,authenticated;
grant execute on function public.has_business_role(uuid,text[]) to anon,authenticated;
grant execute on function public.is_business_member(uuid) to anon,authenticated;
grant execute on function public.can_manage_catalog_image(text) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('catalog-images','catalog-images',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict(id) do update set public=true,file_size_limit=8388608,allowed_mime_types=array['image/jpeg','image/png','image/webp'];

drop policy if exists "catalog_images_public_read" on storage.objects;
create policy "catalog_images_public_read" on storage.objects for select to public using(bucket_id='catalog-images');
drop policy if exists "catalog_images_member_insert" on storage.objects;
create policy "catalog_images_member_insert" on storage.objects for insert to authenticated with check(bucket_id='catalog-images' and public.can_manage_catalog_image(name));
drop policy if exists "catalog_images_member_update" on storage.objects;
create policy "catalog_images_member_update" on storage.objects for update to authenticated using(bucket_id='catalog-images' and public.can_manage_catalog_image(name)) with check(bucket_id='catalog-images' and public.can_manage_catalog_image(name));
drop policy if exists "catalog_images_member_delete" on storage.objects;
create policy "catalog_images_member_delete" on storage.objects for delete to authenticated using(bucket_id='catalog-images' and public.can_manage_catalog_image(name));
