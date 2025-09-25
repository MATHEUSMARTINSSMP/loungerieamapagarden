import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  try {
    const qs = new URLSearchParams(event.rawQuery || "");
    const site = (qs.get("site") || "").toLowerCase().trim();
    if (!site) return json(400, { ok: false, error: "missing_site" });

    const url = `https://${site}.netlify.app/elevea.manifest.json`;
    const r = await fetch(url, { headers: { "cache-control": "no-cache" } });
    if (!r.ok) return json(200, { ok: true, sections: [] });

    const j = await r.json().catch(() => ({}));
    return json(200, { ok: true, ...(j || {}) });
  } catch (e: any) {
    return json(200, { ok: true, sections: [] });
  }
};

function json(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body ?? {})
  };
}
