import React, { useEffect, useState } from "react";

/** Helpers */
async function getJSON<T = any>(url: string) {
  const r = await fetch(url, { credentials: "include" });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((data as any)?.error || `HTTP ${r.status}`);
  return data as T;
}
async function postJSON<T = any>(url: string, body: any) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((data as any)?.error || `HTTP ${r.status}`);
  return data as T;
}

/** Tipos */
type FeedbackItem = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  ts?: string;
  approved?: boolean;
};

export default function FeedbackSection() {
  const siteSlug =
    (window as any).__ELEVEA_SITE_SLUG__ ||
    (window as any).__SITE_SLUG__ ||
    "";

  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  // form
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState(""); // opcional
  const [phone, setPhone] = useState(""); // opcional

  const [sending, setSending] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await getJSON<{
          ok: boolean;
          items: Array<{ id: string; name: string; rating: number; comment: string; ts?: string }>;
        }>(
          `/.netlify/functions/client-api?action=list_feedbacks_public&site=${encodeURIComponent(
            siteSlug
          )}&page=1&pageSize=50`
        );
        if (!alive) return;
        setItems(res.items || []);
      } catch (_) {
        // silencioso
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [siteSlug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg(null);
    setOkMsg(null);
    if (!siteSlug) {
      setErrMsg("Site não configurado.");
      return;
    }
    if (!name.trim() || !comment.trim()) {
      setErrMsg("Preencha seu nome e comentário.");
      return;
    }
    setSending(true);
    try {
      await postJSON(`/.netlify/functions/client-api`, {
        action: "submit_feedback",
        site: siteSlug,
        name,
        rating,
        comment,
        email: email || undefined,
        phone: phone || undefined,
      });
      setOkMsg("Obrigado! Seu feedback foi enviado e passará por aprovação.");
      setName("");
      setRating(5);
      setComment("");
      setEmail("");
      setPhone("");
    } catch (e: any) {
      setErrMsg(e?.message || "Não foi possível enviar seu feedback.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="avaliacoes" className="scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
          O que nossos clientes dizem
        </h2>

        {/* Lista de depoimentos aprovados */}
        {!loading && items.length > 0 ? (
          <ul className="grid md:grid-cols-2 gap-4 mb-10">
            {items.map((it) => (
              <li
                key={it.id}
                className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white/90"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Stars value={it.rating} />
                  <span className="text-sm text-white/60">
                    {it.ts ? new Date(it.ts).toLocaleDateString("pt-BR") : ""}
                  </span>
                </div>
                <div className="font-medium">{it.name}</div>
                <p className="text-white/80 mt-1 whitespace-pre-wrap">{it.comment}</p>
              </li>
            ))}
          </ul>
        ) : !loading ? (
          <div className="text-white/70 mb-10">
            Ainda não temos avaliações públicas. Seja o primeiro a avaliar! 👇
          </div>
        ) : (
          <div className="text-white/50 animate-pulse mb-10">Carregando…</div>
        )}

        {/* Formulário */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Deixe seu feedback
          </h3>
          <form onSubmit={submit} className="grid gap-4 max-w-xl">
            <div className="grid gap-2">
              <label className="text-sm text-white/70">Seu nome</label>
              <input
                className="rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/40"
                placeholder="Ex.: Maria S."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-white/70">Sua nota</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    className={`rounded-lg px-2 py-1 border ${
                      rating >= n
                        ? "bg-white text-black border-white"
                        : "bg-black/30 text-white/70 border-white/10"
                    }`}
                    aria-label={`${n} estrelas`}
                  >
                    ★
                  </button>
                ))}
                <span className="text-white/70 text-sm ml-1">{rating}/5</span>
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-white/70">Comentário</label>
              <textarea
                className="rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/40 min-h-[100px]"
                placeholder="Conte como foi sua experiência."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Campos opcionais (privados) */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-white/70">E-mail (opcional)</label>
                <input
                  className="rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/40"
                  placeholder="Para contato da loja (não será publicado)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm text-white/70">Telefone (opcional)</label>
                <input
                  className="rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-white placeholder-white/40"
                  placeholder="(xx) xxxxx-xxxx — não será publicado"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {errMsg ? (
              <div className="text-red-300 text-sm">{errMsg}</div>
            ) : okMsg ? (
              <div className="text-emerald-300 text-sm">{okMsg}</div>
            ) : null}

            <div>
              <button
                type="submit"
                disabled={sending}
                className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
              >
                {sending ? "Enviando..." : "Enviar feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Stars({ value = 0 }: { value?: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= value ? "text-yellow-300" : "text-white/30"}>
          ★
        </span>
      ))}
    </div>
  );
}
