const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-primary">
            Sobre a Marca
          </h2>
          
          <div className="space-y-8">
            <p className="body-elegant text-xl leading-relaxed">
              Inspirada na elegância parisiense, a <span className="font-semibold text-accent">Loungerie</span> foi criada 
              para transformar a experiência da lingerie no Brasil.
            </p>
            
            <p className="body-elegant text-lg leading-relaxed mt-6">
              Cada peça é desenvolvida com atenção aos detalhes, misturando conforto e sensualidade, 
              para que cada mulher se sinta confiante, linda e autêntica.
            </p>
            
            <div className="mt-12 p-8 bg-accent/10 rounded-2xl border border-accent/20">
              <p className="text-xl font-light text-primary leading-relaxed">
                Desde sua fundação, a Loungerie redefiniu o conceito de moda íntima no Brasil. 
                Nosso propósito é empoderar mulheres para que se sintam lindas, confiantes e 
                autênticas em todos os momentos.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-primary mb-2">Sofisticação</h3>
                <p className="text-sm text-muted-foreground">Peças que unem delicadeza e elegância</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💫</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-primary mb-2">Conforto</h3>
                <p className="text-sm text-muted-foreground">Modelagens que valorizam o corpo feminino</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👑</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-primary mb-2">Empoderamento</h3>
                <p className="text-sm text-muted-foreground">Para mulheres que vivem com autenticidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;