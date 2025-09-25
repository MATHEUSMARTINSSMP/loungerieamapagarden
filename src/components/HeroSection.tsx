import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "/BANNER1.jpg",
    title: "Loungerie Amapá Garden Shopping",
    subtitle: "Moda íntima que combina conforto, sensualidade e poder feminino.",
  },
  {
    image: "/BANNER2.jpg",
    title: "Para Todas as Mulheres",
    subtitle:
      "Celebramos todos os corpos e valorizamos cada mulher como ela é, com peças que realçam sua beleza única.",
  },
  {
    image: "/BANNER3.jpg",
    title: "Conheça Nossos Produtos",
    subtitle:
      "Descubra nossa coleção exclusiva pensada para valorizar sua feminilidade e confiança.",
  },
];

function scrollToId(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(
    () => setCurrentSlide((p) => (p + 1) % slides.length),
    []
  );
  const prevSlide = useCallback(
    () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de saber mais sobre a Loungerie Amapá Garden Shopping."
    );
    const phoneNumber = "5596981094159";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="topo" className="relative h-[92vh] overflow-hidden mt-16">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-elegant-black/35" />
            </div>
          </div>
        ))}

        {/* Conteúdo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-pure-white px-6 max-w-4xl mx-auto">
            <h1 className="hero-text mb-6 drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed drop-shadow-md max-w-3xl mx-auto">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToId("linhas")}
                className="btn-elegant bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Conheça nossas linhas
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                variant="outline"
                className="btn-outline-elegant border-white text-white hover:bg-white hover:text-elegant-black"
              >
                Fale conosco no WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Setas */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 text-pure-white/80 hover:text-pure-white transition-colors duration-300"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-pure-white/80 hover:text-pure-white transition-colors duration-300"
          aria-label="Próximo slide"
        >
          <ChevronRight size={48} />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-accent"
                  : "bg-pure-white/50 hover:bg-pure-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
