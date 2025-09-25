// Proxy interno: evita CORS, repassa para o GAS configurado no projeto Elevea
export const API_URL =
  import.meta.env.VITE_ELEVEA_API_URL ||
  (window as any).__ELEVEA_API_URL__ ||
  "/.netlify/functions/sheets-proxy";

// Slug fixo deste site (pode vir de env, injeção global ou fallback hardcoded)
export const SITE_SLUG = (
  import.meta.env.VITE_ELEVEA_SITE_SLUG ||
  (window as any).__ELEVEA_SITE_SLUG__ ||
  (window as any).__SITE_SLUG__ || // legado
  "LOUNGERIEAMAPAGARDEN"
).toUpperCase();
