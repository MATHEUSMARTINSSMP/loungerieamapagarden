// netlify/functions/client-api.ts
import type { Handler } from "@netlify/functions";

/**
 * URL do Apps Script (WebApp /exec)
 * Aceita qualquer uma das envs abaixo. Configure pelo menos UMA no Netlify:
 *  - VITE_GAS_EXEC_URL  (preferida)
 *  - SHEETS_WEBAPP_URL
 *  - ELEVEA_STATUS_URL
 */
const GAS =
  process.env.VITE_GAS_EXEC_URL ||
  process.env.SHEETS_WEBAPP_URL ||
  process.env.ELEVEA_STATUS_URL ||
  "";

const baseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
};

export const handler: Handler = async (event) => {
  try {
    // Preflight CORS
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 204, headers: baseHeaders, body: "" };
    }

    if (!GAS) {
      return bad({ ok: false, error: "missing_apps_url" });
    }

    if (event.httpMethod === "GET") {
      const qs = new URLSearchParams(event.rawQuery || "");
      const action = (qs.get("action") || "").toLowerCase();
      const site   = (qs.get("site") || "").toUpperCase();
      const page   = qs.get("page") || "1";
      const size   = qs.get("size") || "20";
      const range  = (qs.get("range") || "30d").toLowerCase();

      if (!site) return bad({ ok:false, error:"missing_site" });

      if (action === "get_settings") {
        const r = await fetch(`${GAS}?type=get_settings&site=${encodeURIComponent(site)}`, {
          headers: { "Cache-Control": "no-cache" },
        });
        const j = await r.json().catch(() => ({}));
        return ok({ ok: true, settings: (j as any).settings || {} });
      }

      if (action === "list_leads") {
        const r = await fetch(
          `${GAS}?type=list_leads&site=${encodeURIComponent(site)}&page=${page}&pageSize=${size}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        const j = await r.json().catch(() => ({} as any));
        const items = (j.items || []).map((it: any) => ({
          name: it.name,
          phone: it.phone,
          email: it.email,
          date: it.ts?.slice(0, 10) || "",
        }));
        return ok({ ok: true, items });
      }

      if (action === "list_feedbacks") {
        const r = await fetch(
          `${GAS}?type=list_feedbacks&site=${encodeURIComponent(site)}&page=${page}&pageSize=${size}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        const j = await r.json().catch(() => ({} as any));
        const items = (j.items || []).map((it: any) => ({
          name: it.name,
          rating: it.rating,
          comment: it.comment,
          date: it.ts?.slice(0, 10) || "",
        }));
        return ok({ ok: true, items });
      }

      if (action === "get_traffic") {
        const r = await fetch(
          `${GAS}?type=get_traffic&site=${encodeURIComponent(site)}&range=${range}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        const j = await r.json().catch(() => ({} as any));
        const items = (j.daily || []).map((d: any) => ({ date: d.day, views: d.hits }));
        return ok({ ok: true, items });
      }

      return bad({ ok: false, error: "invalid_action" });
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const action = String(body.action || "").toLowerCase();
      const site   = String(body.site || "").toUpperCase();

      if (!site) return bad({ ok:false, error:"missing_site" });

      // Salvar configurações (aceita PIN opcional)
      if (action === "save_settings") {
        const payload = {
          type: "save_settings",
          site,
          settings: body.settings || {},
          pin: body.pin || body.vipPin || "", // PIN VIP (se seu GAS exigir)
        };
        const r = await fetch(GAS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const j = await r.json().catch(() => ({}));
        return ok(j);
      }

      // Criar lead
      if (action === "submit_lead") {
        const payload = {
          type: "lead_new",
          site,
          name: String(body.name || ""),
          email: String(body.email || ""),
          phone: String(body.phone || ""),
          source: String(body.source || "site"),
        };
        const r = await fetch(GAS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const j = await r.json().catch(() => ({}));
        return ok(j);
      }

      // Criar feedback
      if (action === "submit_feedback") {
        const ratingNum =
          Math.max(1, Math.min(5, parseInt(String(body.rating || "0"), 10) || 0)) || 1;
        const payload = {
          type: "feedback_new",
          site,
          name: String(body.name || ""),
          rating: ratingNum,
          comment: String(body.comment || ""),
        };
        const r = await fetch(GAS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const j = await r.json().catch(() => ({}));
        return ok(j);
      }

      return bad({ ok: false, error: "invalid_action" });
    }

    return bad({ ok: false, error: "invalid_method" });
  } catch (e: any) {
    return err(e);
  }
};

const ok  = (b: any) => ({ statusCode: 200, headers: baseHeaders, body: JSON.stringify(b) });
const bad = (b: any) => ({ statusCode: 400, headers: baseHeaders, body: JSON.stringify(b) });
const err = (e: any) => ({
  statusCode: 500,
  headers: baseHeaders,
  body: JSON.stringify({ ok: false, error: String(e?.message || e) }),
});
