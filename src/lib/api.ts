import { API_URL, SITE_SLUG } from "./config";

export async function fetchStatus() {
  const slug = (SITE_SLUG || "").toUpperCase();
  if (!slug) throw new Error("SITE_SLUG ausente");

  const url = `${API_URL}?type=status&site=${encodeURIComponent(slug)}&_=${Date.now()}`;
  const r = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: { "cache-control": "no-cache" },
  });

  if (!r.ok) throw new Error(`status proxy HTTP ${r.status}`);
  return r.json();
}
