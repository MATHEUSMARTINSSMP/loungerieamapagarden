// src/components/SectionsCarousels.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Sparkles, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { src: string; alt: string };

// === Imagens (caminhos exatamente como estão no /public) ===
const linhasBasica: Item[] = [
  { src: "/basica-1.JPG", alt: "Linha Básica 1" },
  { src: "/basica-2.JPG", alt: "Linha Básica 2" },
  { src: "/basica-3.jpg", alt: "Linha Básica 3" },
];

const linhasFashion: Item[] = [
  { src: "/fashion-1.jpg", alt: "Linha Fashion 1" },
  { src: "/fashion-2.jpg", alt: "Linha Fashion 2" },
  { src: "/fashion-3.jpg", alt: "Linha Fashion 3" },
];

const nossaLoja: Item[] = [
  { src: "/loja-1.jpg", alt: "Nossa Loja 1" },
  { src: "/loja-2.jpg", alt: "Nossa Loja 2" },
  { src: "/loja-3.jpg", alt: "Nossa Loja 3" },
];

const produtos: Item[] = [
  { src: "/PRODUTO-1.jpg", alt: "Nossos Produtos 1" },
  { src: "/PRODUTO-2.jpg", alt: "Nossos Produtos 2" },
  { src: "/PRODUTO-3.jpg", alt: "Nossos Produtos 3" },
  { src: "/PRODUTO-4.jpg", alt: "Nossos Produtos 4" },
  { src: "/PRODUTO-5.jpg", alt: "Nossos Produtos 5" },
];

// === Componente utilitário de carrossel simples (auto-run + 3 cards) ===
function SimpleCarousel({
  items,
  ariaLabel,
  className,
  intervalMs = 3000,
}: {
  items: Item[];
  ariaLabel: string;
  className?: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const perPage = 3;

  const pages = useMemo(() => {
    const out: Item[][] = [];
    for (let i = 0; i < items.length; i += perPage) {
      out.push(items.slice(i, i + perPage));
    }
    return out.length > 0 ? out : [items];
  }, [items]);

  const pageCount = pages.length;

  const next = () => setIndex((i) => (i + 1) % pageCount);
  const prev = () => setIndex((i) => (i - 1 + pageCount) % pageCount);

  useEffect(() => {
    // auto play
    timerRef.current = window.setInterval(next, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, intervalMs]);

  return (
    <div className={cn("relative w-full", className)} aria-label={ariaLabel}>
      {/* Slides */}
      <div className="overflow-hidden rounded-xl border border-white/10">
        {pages.map((group, i) => (
          <div
            key={i}
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 transition-opacity duration-500",
              i === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
            )}
          >
            {group.map((it, idx) => (
              <figure
                key={`${it.src}-${idx}`}
                className="rounded-lg overflow-hidden bg-zinc-900/60 aspect-[4/3] border border-white/10"
              >
                <img
                  src={it.src}
                  alt={it.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>

      {/* Controls */}
      {pageCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20"
            onClick={() => {
              if (timerRef.current) window.clearInterval(timerRef.current);
              prev();
            }}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Próximo"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20"
            onClick={() => {
              if (timerRef.current) window.clearInterval(timerRef.current);
              next();
            }}
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-3 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "inline-block h-2 w-2 rounded-full",
                  i === index ? "bg-white" : "bg-white/30"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// === Blocos superiores (cards estáticos) ===
function TopLines() {
  const items = [
    {
      icon: Heart,
      title: "Linha Básica",
      desc: "Conforto e praticidade para o dia a dia, sem abrir mão da elegância.",
    },
    {
      icon: Sparkles,
      title: "Linha Fashion",
      desc: "Tendências internacionais traduzidas em peças sofisticadas.",
    },
    {
      icon: ShoppingBag,
      title: "Conheça Nossa Loja",
      desc: "No Amapá Garden Shopping — o universo Loungerie pertinho de você.",
    },
  ];

  return (
    <section id="linhas" className="py-12">
      <div className="container mx-auto px-4">
        <header className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="section-title text-white">Nossas Linhas</h2>
          <p className="text-zinc-300">
            Descubra nossa curadoria exclusiva de moda íntima, pensada para cada
            momento da sua vida.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <article
              key={i}
              className="rounded-xl bg-zinc-900/60 border border-white/10 p-6 text-center"
            >
              <div className="mx-auto mb-4 grid place-content-center size-14 rounded-full bg-pink-600/20">
                <Icon className="size-7 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-zinc-300 mt-2">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// === Seção principal com os dois carrosseis ===
export default function SectionsCarousels() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header + cards de linha */}
        <TopLines />

        {/* Carrossel: Nossas Linhas (Básica, Fashion, Nossa Loja) */}
        <div className="mt-8 grid gap-10">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Linha Básica</h3>
            <SimpleCarousel items={linhasBasica} ariaLabel="Carrossel Linha Básica" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Linha Fashion</h3>
            <SimpleCarousel items={linhasFashion} ariaLabel="Carrossel Linha Fashion" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Conheça Nossa Loja</h3>
            <SimpleCarousel items={nossaLoja} ariaLabel="Carrossel Nossa Loja" />
          </div>
        </div>

        {/* Carrossel: Nossos Produtos */}
        <div id="produtos" className="mt-16">
          <header className="text-center mb-6">
            <h2 className="section-title text-white">Nossos Produtos</h2>
            <p className="text-zinc-300">
              Explore nossa curadoria de moda íntima que combina inovação, sensualidade e sofisticação.
            </p>
          </header>

          <SimpleCarousel
            items={produtos}
            ariaLabel="Carrossel Nossos Produtos"
          />
        </div>
      </div>
    </section>
  );
}
