(function (global) {
  'use strict';

  const cfg = global.SUPABASE_CONFIG || {};
  let client = null;

  function placeholder(value) {
    return !value || /COLE_AQUI|YOUR_|EXEMPLO/i.test(String(value));
  }

  function isConfigured() {
    const key = cfg.publishableKey || cfg.anonKey;
    return !placeholder(cfg.url) && !placeholder(key) && /^https:\/\//i.test(String(cfg.url));
  }

  function getClient() {
    if (!isConfigured()) return null;
    if (client) return client;
    if (!global.supabase || typeof global.supabase.createClient !== 'function') {
      throw new Error('A biblioteca do Supabase não foi carregada. Verifique sua conexão com a internet.');
    }
    client = global.supabase.createClient(cfg.url, cfg.publishableKey || cfg.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return client;
  }

  global.SupabaseApp = {
    config: cfg,
    isConfigured,
    getClient
  };
})(window);
