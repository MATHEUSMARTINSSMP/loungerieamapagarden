// netlify/edge-functions/guard-client.js
// Bloqueia o site do CLIENTE quando o GAS disser que está inativo ou manualBlock=true.
// Compatível com Edge Runtime (usa Netlify.env.get). Inclui modo debug (?elevea=debug).

const BLOCK_HTML = (code = "BLOQUEADO") => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Site temporariamente indisponível</title>
<style>
  body{margin:0;background:#0B1220;color:#E5E7EB;font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial}
  .box{max-width:820px;margin:25vh auto 0;padding:32px;border-radius:16px;background:#111827;border:1px solid #1f2937}
  h1{margin:0 0 12px;font-size:28px}
  p{margin:0 0 6px;color:#9CA3AF}
  .code{margin-top:10px;font-size:12px;color:#9CA3AF}
</style></head>
<body>
  <div class="box">
    <h1>Estamos fazendo ajustes</h1>
    <p>Este site está temporariamente indisponível. Tente novamente em alguns minutos.</p>
    <p class="code">Código: ${code}</p>
  </div>
</body></html>`;

// Getter de env compatível com Edge (Netlify.env.get) + fallbacks
function getEnv(name) {
  try {
    // Netlify Edge
    if (typeof Netlify !== "undefined" && Netlify?.env?.get) {
      const v = Netlify.env.get(name);
      if (v) return String(v);
    }
    // Deno (alguns runtimes edge)
    if (typeof Deno !== "undefined" && Deno?.env?.get) {
      const v = Deno.env.get(name);
      if (v) return String(v);
    }
    // Node (fallback – não rola em edge, mas não custa)
    if (typeof process !== "undefined" && process?.env && name in process.env) {
      const v = process.env[name];
      if (v) return String(v);
    }
  } catch (_) {}
  return "";
}

export default async (req, ctx) => {
  const url = new URL(req.url);

  // Nunca intercepta chamadas internas do Netlify
  if (url.pathname.startsWith("/.netlify/")) return ctx.next();

  // Querystring de debug: /?elevea=debug → apenas passa e adiciona headers
  const debug = url.searchParams.get("elevea") === "debug";

  // ENVs do SITE DO CLIENTE (Edge-safe)
  const API = getEnv("ELEVEA_STATUS_URL").trim();
  const SLUG =
    (getEnv("ELEVEA_SITE_SLUG") || globalThis.__ELEVEA_SITE_SLUG__ || "")
      .trim()
      .toUpperCase();

  // Se não estiver configurado, **não bloqueia** (fail-open)
  if (!API || !SLUG) {
    const res = await ctx.next();
    return withDiag(res, { reason: "missing_env", API: !!API, SLUG });
  }

  // Consulta o GAS
  let json = null,
    ok = false,
    statusCode = 0;
  try {
    const r = await fetch(`${API}?type=status&site=${encodeURIComponent(SLUG)}`, {
      headers: { "cache-control": "no-cache" },
      redirect: "follow",
    });
    statusCode = r.status;
    // json() já faz parse; não parsear de novo
    json = await r.json().catch(() => null);
    ok = !!(json && json.ok);
  } catch {
    ok = false;
  }

  // Se falhou a API → não bloqueia
  if (!ok) {
    const res = await ctx.next();
    return withDiag(res, { reason: "gas_fail", statusCode, json });
  }

  // Se pediram debug, nunca bloqueia – só mostra cabeçalhos
  if (debug) {
    const res = await ctx.next();
    return withDiag(res, {
      reason: "debug_mode",
      active: json.active,
      manualBlock: json.manualBlock,
      status: json.status,
      preapproval_id: json.preapproval_id ? "yes" : "no",
      updatedAt: json.updatedAt || "",
    });
  }

  // Bloqueios
  if (json.manualBlock === true) {
    return new Response(BLOCK_HTML("BLOQUEADO"), {
      status: 402,
      headers: {
        "cache-control": "no-store",
        "x-elevea-reason": "manual_block",
        "x-elevea-site": SLUG,
      },
    });
  }

  if (json.active === false) {
    return new Response(BLOCK_HTML("INATIVO"), {
      status: 402,
      headers: {
        "cache-control": "no-store",
        "x-elevea-reason": "inactive",
        "x-elevea-status": String(json.status || ""),
        "x-elevea-site": SLUG,
      },
    });
  }

  // Tudo certo → passa
  const res = await ctx.next();
  return withDiag(res, {
    reason: "ok",
    active: json.active,
    status: json.status,
    manualBlock: json.manualBlock,
    updatedAt: json.updatedAt || "",
  });
};

function withDiag(res, data) {
  const h = new Headers(res.headers);
  try {
    h.set("x-elevea", JSON.stringify(safeShape(data)));
  } catch {
    h.set("x-elevea", "diag");
  }
  // Clona mantendo body/headers/status
  return new Response(res.body, { status: res.status, headers: h });
}

function safeShape(o) {
  return {
    reason: o?.reason || "",
    active: o?.active,
    manualBlock: o?.manualBlock,
    status: o?.status,
    site: o?.SLUG,
    updatedAt: o?.updatedAt,
    api: o?.API ? true : false,
    statusCode: o?.statusCode,
  };
}
