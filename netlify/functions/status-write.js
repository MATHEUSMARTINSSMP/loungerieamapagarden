// netlify/functions/status-write.js
// Recebe { slug, active } e grava no Blob: store "sites-status", key "<SLUG>:status.json"

import { getStore } from "@netlify/blobs";

export default async (req) => {
  try {
    // segurança por Header
    const expected = process.env.ADMIN_SYNC_TOKEN || "";
    const auth = req.headers.get("authorization") || "";
    if (!expected || !auth.startsWith("Bearer ") || auth.slice(7) !== expected) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
        status: 405,
        headers: { "content-type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const slug = String(body.slug || "").toUpperCase();
    const active = Boolean(body.active);

    if (!slug) {
      return new Response(JSON.stringify({ ok: false, error: "missing_slug" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const store = getStore("sites-status");
    const key = `${slug}:status.json`;
    const value = { slug, active, updatedAt: new Date().toISOString() };

    await store.set(key, JSON.stringify(value), {
      metadata: { "content-type": "application/json" },
    });

    return new Response(JSON.stringify({ ok: true, key, value }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
