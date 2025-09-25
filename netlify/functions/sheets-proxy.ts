export const handler = async (event: any) => {
  try {
    const BASE = process.env.ELEVEA_STATUS_URL as string;
    if (!BASE) return resp(500, { ok: false, error: "missing_env:ELEVEA_STATUS_URL" });

    const url = new URL(BASE);
    const qsIn = new URLSearchParams(event.queryStringParameters || {});
    qsIn.set("_", Date.now().toString());
    qsIn.forEach((v, k) => url.searchParams.set(k, v));

    const upstream = await fetch(url.toString(), { method: "GET", headers: { "cache-control": "no-cache" } });
    const text = await upstream.text();
    let data: any = null;
    try { data = JSON.parse(text); } catch {}

    if (qsIn.get("debug") === "1") {
      return resp(upstream.status, { ok: upstream.ok, sourceUrl: url.toString(), rawText: text, parsed: data });
    }

    if (!upstream.ok) return resp(upstream.status, { ok: false, error: "upstream_error", status: upstream.status, body: text });
    if (data == null)  return resp(502,          { ok: false, error: "invalid_json_from_upstream", body: text });
    return resp(200, data);
  } catch (err: any) {
    return resp(500, { ok: false, error: String(err) });
  }
};

function resp(status: number, body: any) {
  return {
    statusCode: status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    body: JSON.stringify(body),
  };
}
