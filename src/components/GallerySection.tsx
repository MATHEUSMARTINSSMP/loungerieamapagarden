import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Img = { src: string; alt: string };
type Item = { type: string; description: string; images: Img[] };

const CarouselItem = ({
  type,
  description,
  images,
}: {
  type: string;
  description: string;
  images: Img[];
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () =>
    setCurrentImageIndex((p) => (p + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-muted/30 border border-border/50">
      <div className="relative w-full h-full">
        {/* Botões */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-card/90 shadow-elegant hover:bg-card transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4 text-primary" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-card/90 shadow-elegant hover:bg-card transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4 text-primary" />
        </button>

        {/* Carrossel */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
          >
            {images.map((image, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  width={900}
                  height={900}
                  loading={idx === currentImageIndex ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-start text-center p-4 bg-gradient-to-t from-black/50 via-black/10 to-transparent">
          <h3 className="font-serif text-lg font-medium text-white mb-1 drop-shadow">
            {type}
          </h3>
          <p className="text-white/90 text-xs drop-shadow">{description}</p>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentImageIndex
                  ? "bg-soft-gold shadow-gold"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const galleryItems: Item[] = [
    {
      type: "Clientes Satisfeitas",
      description: "Experiências de compra únicas",
      images: [
        { src: "/cliente1.jpg", alt: "Cliente 1" },
        { src: "/cliente2.jpg", alt: "Cliente 2" },
        { src: "/cliente3.jpg", alt: "Cliente 3" },
        { src: "/cliente4.jpg", alt: "Cliente 4" },
      ],
    },
    {
      type: "Looks Sacada",
      description: "Coleções elegantes e sofisticadas",
      images: [
        { src: "/sacada1.jpg", alt: "Sacada Look 1" },
        { src: "/sacada2.jpg", alt: "Sacada Look 2" },
        { src: "/sacada3.jpg", alt: "Sacada Look 3" },
        { src: "/sacada4.jpg", alt: "Sacada Look 4" },
      ],
    },
    {
      type: "Eventos & Lifestyle",
      description: "Momentos especiais com estilo",
      images: [
        { src: "/evento1.jpg", alt: "Evento 1" },
        { src: "/evento2.jpg", alt: "Evento 2" },
        { src: "/evento3.jpg", alt: "Evento 3" },
        { src: "/evento4.jpg", alt: "Evento 4" },
      ],
    },
    {
      type: "Looks Oh, Boy!",
      description: "Peças modernas e versáteis",
      images: [
        { src: "/ohboy1.jpg", alt: "Oh, Boy! Look 1" },
        { src: "/ohboy2.jpg", alt: "Oh, Boy! Look 2" },
        { src: "/ohboy3.jpg", alt: "Oh, Boy! Look 3" },
        { src: "/ohboy4.jpg", alt: "Oh, Boy! Look 4" },
      ],
    },
    {
      type: "Nova Coleção",
      description: "Últimas tendências em moda",
      images: [
        { src: "/nova1.jpg", alt: "Nova Coleção 1" },
        { src: "/nova2.jpg", alt: "Nova Coleção 2" },
        { src: "/nova3.jpg", alt: "Nova Coleção 3" },
        { src: "/nova4.jpg", alt: "Nova Coleção 4" },
      ],
    },
    {
      type: "Ambiente da Loja",
      description: "Interior sofisticado e acolhedor",
      images: [
        { src: "/loja1.jpg", alt: "Ambiente da Loja 1" },
        { src: "/loja2.jpg", alt: "Ambiente da Loja 2" },
        { src: "/loja3.jpg", alt: "Ambiente da Loja 3" },
        { src: "/loja4.jpg", alt: "Ambiente da Loja 4" },
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-sand">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title text-primary">Inspiração de Estilo</h2>
          <p className="body-elegant text-lg">
            Descubra nosso universo através de imagens que capturam a essência
            das marcas Sacada e Oh, Boy!
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <CarouselItem
              key={i}
              type={item.type}
              description={item.description}
              images={item.images}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground italic">
            * Em breve: mais fotos das coleções, vitrines e ambiente completo da
            loja
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
