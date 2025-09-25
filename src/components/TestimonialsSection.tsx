import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      text: "A Loungerie transformou minha relação com lingerie. Nunca me senti tão confiante e elegante ao mesmo tempo.",
      author: "Ana Carolina",
      role: "Empresária"
    },
    {
      text: "Peças lindas que unem conforto e sensualidade. A qualidade é excepcional e o atendimento é impecável.",
      author: "Mariana Silva",
      role: "Advogada"
    },
    {
      text: "Cada peça da Loungerie é especial. Me sinto empoderada e linda usando suas criações.",
      author: "Patricia Oliveira",
      role: "Médica"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title text-primary">
            O Que Nossas Clientes Dizem
          </h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="card-elegant text-center min-h-[300px] flex flex-col justify-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-accent fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl lg:text-2xl font-light text-primary leading-relaxed mb-8 italic">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            
            <div>
              <p className="font-serif text-lg font-medium text-primary">
                {testimonials[currentTestimonial].author}
              </p>
              <p className="text-muted-foreground">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-accent hover:text-accent/80 transition-colors duration-300"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-accent hover:text-accent/80 transition-colors duration-300"
          >
            <ChevronRight size={32} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-accent' 
                    : 'bg-border hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;