// src/components/StickyHeader.tsx (no site da Loungerie)
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

type NavItem = { label: string; id: string };

const NAV: NavItem[] = [
  { label: "Sobre a Marca", id: "sobre" },
  { label: "Nossas Linhas", id: "linhas" },
  { label: "Localização", id: "localizacao" },
];

function scrollToId(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function StickyHeader() {
  const handleClick = useCallback((id: string) => {
    scrollToId(id);
  }, []);

  const handleWhatsApp = () => {
    const phone = "5596981094159";
    const text = encodeURIComponent("Olá! Gostaria de saber mais sobre a Loungerie Amapá Garden Shopping.");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <button
          onClick={() => scrollToId("topo", 0)}
          aria-label="Ir para o topo"
          className="text-lg font-serif font-semibold"
        >
          Loungerie Amapá Garden
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}

          <Button
            onClick={handleWhatsApp}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            size="sm"
          >
            WhatsApp
          </Button>
        </nav>

        <div className="md:hidden">
          <Button onClick={handleWhatsApp} size="sm" className="bg-accent text-accent-foreground">
            WhatsApp
          </Button>
        </div>
      </div>
    </header>
  );
}
