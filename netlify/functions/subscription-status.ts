// netlify/functions/subscription-status.ts
import type { Handler } from "@netlify/functions";

const GAS = process.env.VITE_GAS_EXEC_URL!;

export const handler: Handler = async (event) => {
  try {
    const qs = new URLSearchParams(event.rawQuery || "");
    const email = (qs.get("email") || "").toLowerCase().trim(); // vamos preferir email
    const site  = (qs.get("site")  || "").toUpperCase().trim();

    if (!email) {
      return resp(400, { ok:false, error:"missing_email" });
    }

    // POST type=client_billing
    const r = await fetch(GAS, {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ type:"client_billing", email })
    });
    const j = await r.json();

    if (!j?.ok) return resp(200, { ok:false, error:j?.error || "billing_fail" });

    // Mapeia para StatusResp do front
    return resp(200, {
      ok: true,
      siteSlug: site || "",
      plan: j.plan,                           // "vip" | "essential"
      status: j.status || "active",           // "active" | "paused" | "cancelled"...
      nextCharge: j.next_renewal || null,
      lastPayment: null,                      // (não expomos ainda)
      history: []                             // (não expomos ainda)
    });
  } catch (e:any) {
    return resp(500, { ok:false, error:String(e?.message||e) });
  }
};

function resp(code:number, body:any){
  return { statusCode: code, body: JSON.stringify(body) };
}
