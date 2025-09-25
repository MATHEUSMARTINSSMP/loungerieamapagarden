import { MapPin, Clock, Phone, Instagram } from 'lucide-react';

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-20 bg-gradient-elegant">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title text-primary" data-elevea-text="location-title">
            Visite Nossa Loja
          </h2>
          <p className="body-elegant text-lg" data-elevea-text="location-subtitle">
            Estamos localizadas no Amapá Garden Shopping, prontas para recebê-la com toda sofisticação da Loungerie.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card-elegant">
              {/* Endereço */}
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-medium text-primary mb-2">
                    Endereço
                  </h3>
                  <p className="body-elegant" data-elevea-text="location-address">
                    Amapá Garden Shopping<br />
                    Rodovia Juscelino Kubitschek, 2141, Loja 154<br />
                    Macapá - AP
                  </p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Amap%C3%A1+Garden+Shopping,+Rodovia+Juscelino+Kubitschek,+2141,+Macap%C3%A1+AP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-6 py-2 bg-accent text-white font-medium rounded-lg shadow hover:bg-accent/90 transition-colors duration-300"
                  >
                    Como Chegar
                  </a>
                </div>
              </div>
              
              {/* Horários */}
              <div className="flex items-start space-x-4 mb-6">
                <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-medium text-primary mb-2">
                    Horários de Funcionamento
                  </h3>
                  <div className="body-elegant space-y-1" data-elevea-text="location-hours">
                    <p><span className="font-medium">Segunda a sábado:</span> 10h – 22h</p>
                    <p><span className="font-medium">Domingos e feriados:</span> 15h – 21h</p>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-4 mb-6">
                <Instagram className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-medium text-primary mb-2">
                    Instagram
                  </h3>
                  <p className="body-elegant">
                    Siga nosso perfil no Instagram 
                    <a
                      href="https://instagram.com/loungerie_amapagarden"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors duration-300 ml-1"
                    >
                      @loungerie_amapagarden
                    </a>
                  </p>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-medium text-primary mb-2">
                    WhatsApp
                  </h3>
                  <p className="body-elegant">
                    Fale com nossa equipe no WhatsApp 
                    <a 
                      href="https://wa.me/5596981094159?text=Olá! Gostaria de saber mais sobre a Loungerie Amapá Garden Shopping." 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors duration-300 ml-1"
                    >
                      (96) 9 8109-4159
                    </a> e descubra a coleção perfeita para você.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Maps */}
          <div className="card-elegant">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4949842665067!2d-51.066665425130866!3d0.03745959999842946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d61e4f0f0f0f0f0%3A0x5e5e5e5e5e5e5e5e!2sAmapá%20Garden%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1703123456789"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Amapá Garden Shopping"
              />
            </div>
            
            <div className="mt-6 p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-primary font-medium">
                📍 Rodovia Juscelino Kubitschek, 2141, Loja 154 - Inaugurada em 7 de dezembro de 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
