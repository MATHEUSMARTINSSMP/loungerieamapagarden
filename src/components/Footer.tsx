import { Instagram, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo/Brand Name */}
          <h3 className="font-serif text-2xl font-medium mb-4">
            Loungerie
          </h3>
          
          {/* Brand Message */}
          <p className="text-primary-foreground/90 mb-6 font-light">
            Moda íntima sofisticada no Amapá Garden Shopping
          </p>
          
          {/* Contact Info */}
          <div className="text-sm text-primary-foreground/70 space-y-2 mb-8">
            <p>Amapá Garden Shopping - Rodovia Juscelino Kubitschek, Macapá - AP</p>
            <p>Segunda a Sábado: 10h – 22h | Domingo: 15h – 21h</p>
            <p>WhatsApp: (96) 9 8109-4159</p>
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/60 flex items-center justify-center">
              © 2024 Loungerie Amapá Garden Shopping - Feito com <Heart className="w-4 h-4 mx-1 text-accent" /> para mulheres que vivem a experiência de se sentir linda todos os dias
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;