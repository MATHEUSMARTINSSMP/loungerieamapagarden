import { Mail, Users, Heart } from 'lucide-react';

const CurriculumSection = () => {
  return (
    <section className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="card-elegant">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-soft-gold mr-3" />
              <h2 className="section-title text-primary">
                Faça Parte da Nossa Equipe
              </h2>
            </div>
            
            <p className="body-elegant text-lg mb-8">
              Estamos sempre em busca de pessoas apaixonadas por moda e atendimento de excelência. 
              Se você tem o perfil para fazer parte da família Sacada | Oh, Boy!, queremos conhecê-la!
            </p>
            
            <div className="bg-soft-gold/10 rounded-lg p-8 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-soft-gold mr-2" />
                <h3 className="font-serif text-xl font-medium text-primary">
                  Envie seu Currículo
                </h3>
              </div>
              
              <p className="body-elegant text-center">
                <a 
                  href="mailto:sacadaohboyamapa@hotmail.com"
                  className="text-soft-gold hover:text-soft-gold/80 transition-colors duration-300 font-medium"
                >
                  sacadaohboyamapa@hotmail.com
                </a>
              </p>
            </div>
            
            <div className="flex items-center justify-center text-primary/70">
              <Heart className="w-4 h-4 mr-2 text-soft-gold" />
              <p className="text-sm">
                Venha ser parte de uma história de elegância e sofisticação no Amapá
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;