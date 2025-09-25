import { Heart, Sparkles, ShoppingBag } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Heart,
      title: "Linha Básica",
      description: "Perfeita para o dia a dia, oferecendo conforto e praticidade sem abrir mão da elegância."
    },
    {
      icon: Sparkles,
      title: "Linha Fashion", 
      description: "As últimas tendências internacionais traduzidas em peças sofisticadas e contemporâneas."
    },
    {
      icon: ShoppingBag,
      title: "Conheça Nossa Loja",
      description: "Inaugurada em 7 de dezembro de 2023 no Amapá Garden Shopping, nossa loja traz o universo Loungerie para perto de você."
    }
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title text-primary">
            Nossas Linhas
          </h2>
          <p className="body-elegant text-lg">
            Descubra nossa curadoria exclusiva de moda íntima, pensada para cada momento da sua vida.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center group">
              {/* Espaço para foto 1:1 */}
              <div className="mb-6 aspect-square bg-muted rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-300">
                <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                  <service.icon className="w-12 h-12 text-accent" />
                </div>
              </div>
              <h3 className="text-lg font-serif font-medium mb-4 text-primary leading-tight">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;