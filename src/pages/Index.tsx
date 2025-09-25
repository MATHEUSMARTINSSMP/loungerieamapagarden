// src/pages/Index.tsx
import { useEffect } from "react";

import EleveaStatusGate from "@/components/EleveaStatusGate";
import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SectionsCarousels from "@/components/SectionsCarousels";
import FeedbackSection from "@/components/FeedbackSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// ✅ garante o slug para o fetchStatus(), caso a env não esteja setada
;(window as any).__ELEVEA_SITE_SLUG__ = (window as any).__ELEVEA_SITE_SLUG__ || "LOUNGERIEAMAPAGARDEN";
// (opcional legado)
;(window as any).__SITE_SLUG__ = (window as any).__SITE_SLUG__ || "LOUNGERIEAMAPAGARDEN";

/* ===== SEO CONSTANTES ===== */
const SITE_URL = "https://loungerieamapagarden.netlify.app/";
const OG_IMAGE =
  "https://s.wordpress.com/mshots/v1/https%3A%2F%2Floungerieamapagarden.netlify.app?w=1200";

const BUSINESS = {
  name: "Loungerie Amapá Garden",
  phone: "+55 96 98109-4159",
  street: "Rodovia Juscelino Kubitschek, 2141, Loja 233",
  city: "Macapá",
  region: "AP",
  postalCode: "68903-419",
  country: "BR",
  lat: 0.0346,
  lng: -51.0694,
  instagram: "https://instagram.com/loungerie_amapagarden",
};

/* ===== HELPERS PARA METAS/LINKS ===== */
function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProp(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
}

const Index = () => {
  /* ===== SEO ===== */
  useEffect(() => {
    const title = "Loungerie Amapá Garden | Lingerie e moda íntima em Macapá";
    const description =
      "Loungerie no Amapá Garden Shopping (Macapá). Lingerie, calcinha, sutiã, conjuntos e cinta modeladora. Segunda a sábado 10h–22h; domingos/feriados 15h–21h.";

    document.title = title;
    upsertMetaByName("description", description);
    upsertMetaByName(
      "keywords",
      [
        "Amapá Garden Shopping",
        "Macapá",
        "Loungerie",
        "lingerie",
        "calcinha",
        "sutiã",
        "conjuntos de lingerie",
        "cinta modeladora",
        "moda íntima",
        "loja de lingerie",
        "presente feminino",
        "lingerie ousada",
        "erótico",
        "fetiche",
        "lubrificante íntimo",
      ].join(", ")
    );
    upsertMetaByName("robots", "index,follow,max-image-preview:large");
    upsertMetaByName("content-language", "pt-BR");

    upsertLink("canonical", SITE_URL);
    upsertLink("alternate", SITE_URL, { hreflang: "pt-BR" });

    upsertMetaByName("theme-color", "#111827");

    upsertMetaByProp("og:locale", "pt_BR");
    upsertMetaByProp("og:site_name", BUSINESS.name);
    upsertMetaByProp("og:type", "website");
    upsertMetaByProp("og:url", SITE_URL);
    upsertMetaByProp("og:title", title);
    upsertMetaByProp("og:description", description);
    upsertMetaByProp("og:image", OG_IMAGE);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", OG_IMAGE);

    const ldLocalBusiness = {
      "@context": "https://schema.org",
      "@type": "ClothingStore",
      name: BUSINESS.name,
      image: OG_IMAGE,
      url: SITE_URL,
      telephone: BUSINESS.phone,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.street,
        addressLocality: BUSINESS.city,
        addressRegion: BUSINESS.region,
        postalCode: BUSINESS.postalCode,
        addressCountry: BUSINESS.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: BUSINESS.lat, longitude: BUSINESS.lng },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "22:00",
        },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "15:00", closes: "21:00" },
      ],
      sameAs: [BUSINESS.instagram],
      areaServed: "Macapá, AP",
      knowsAbout: [
        "lingerie",
        "calcinha",
        "sutiã",
        "conjuntos de lingerie",
        "cinta modeladora",
        "moda íntima",
        "lingerie ousada",
        "erótico",
        "fetiche",
        "lubrificante íntimo",
      ],
    };

    const ldItemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        "Sutiãs",
        "Calcinhas",
        "Conjuntos",
        "Cinta modeladora",
        "Lingerie ousada",
        "Erótico / fetiche",
        "Lubrificante íntimo",
      ].map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
    };

    const s1 = document.createElement("script");
    s1.type = "application/ld+json";
    s1.text = JSON.stringify(ldLocalBusiness);
    document.head.appendChild(s1);

    const s2 = document.createElement("script");
    s2.type = "application/ld+json";
    s2.text = JSON.stringify(ldItemList);
    document.head.appendChild(s2);

    return () => {
      s1.remove();
      s2.remove();
    };
  }, []);

  return (
    <EleveaStatusGate>
      <h1 className="sr-only">
        Loungerie Amapá Garden — lingerie e moda íntima em Macapá (Amapá Garden Shopping).
      </h1>

      <StickyHeader />
      <HeroSection />

      <section id="sobre" className="scroll-mt-24">
        <AboutSection />
      </section>

      <section id="linhas" className="scroll-mt-24">
        <SectionsCarousels />
      </section>

      <section id="localizacao" className="scroll-mt-24">
        <LocationSection />
      </section>

      {/* NOVO: avaliações / feedback */}
      <FeedbackSection />

      <WhatsAppButton />
      <Footer />
    </EleveaStatusGate>
  );
};

export default Index;
