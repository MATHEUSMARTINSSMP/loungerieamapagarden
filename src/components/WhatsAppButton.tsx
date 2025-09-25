import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre a Loungerie Amapá Garden Shopping.");
    const phoneNumber = "5596981094159";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 p-0"
      aria-label="Entrar em contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </Button>
  );
};

export default WhatsAppButton;