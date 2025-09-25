// netlify/functions/assets.ts
import type { Handler } from "@netlify/functions";
const GAS = process.env.VITE_GAS_EXEC_URL!;

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      const qs = new URLSearchParams(event.rawQuery || "");
      const site = (qs.get("site") || "").toUpperCase();
      const r = await fetch(`${GAS}?type=assets&site=${encodeURIComponent(site)}`);
      const j = await r.json();
      return ok(j);
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const site = String(body.site || "").toUpperCase();
      const email = String(body.email || "").toLowerCase();
      const name = String(body.name || "upload.jpg");
      const mime = String(body.mime || "image/jpeg");
      const b64  = String(body.b64 || "");

      // 1) Faz upload_base64
      const up = await fetch(GAS, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          type: "upload_base64",
          siteSlug: site,
          email,
          fotos: [{ name, mime, b64 }]
        })
      });
      const upj = await up.json();
      if (!upj?.ok) return bad({ ok:false, error: upj?.error || "upload_fail" });

      // 2) Lista assets e devolve a URL do "key" (nome sem extensão)
      const key = name.replace(/\.[^.]+$/, "");
      const lst = await fetch(`${GAS}?type=assets&site=${encodeURIComponent(site)}`);
      const lj  = await lst.json();
      const found = (lj.items||[]).find((x:any)=> x.key === key);

      return ok({ ok:true, url: found?.url || "" });
    }

    return bad({ ok:false, error:"invalid_method" });
  } catch (e:any) {
    return err(e);
  }
};

const ok  = (b:any)=>({ statusCode:200, body:JSON.stringify(b) });
const bad = (b:any)=>({ statusCode:400, body:JSON.stringify(b) });
const err = (e:any)=>({ statusCode:500, body:JSON.stringify({ ok:false, error:String(e?.message||e) }) });
