/*
 * Core Multinicho V2.4 — Conexão Supabase
 * 1) Crie um projeto em https://supabase.com
 * 2) Execute supabase/schema.sql no SQL Editor
 * 3) Cole abaixo a Project URL e a Publishable/Anon Key do projeto.
 *
 * IMPORTANTE: nunca coloque a service_role key no navegador.
 */
window.SUPABASE_CONFIG = {
  url: 'COLE_AQUI_SUA_SUPABASE_URL',
  publishableKey: 'COLE_AQUI_SUA_PUBLISHABLE_OU_ANON_KEY',
  defaultBusinessSlug: 'forno-alto',
  defaultRestaurantSlug: 'forno-alto',
  storageBucket: 'catalog-images',
  fallbackToLocalDemo: false
};
