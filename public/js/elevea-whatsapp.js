// public/js/elevea-whatsapp.js
(function() {
    'use strict';
    
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN';
    const ELEVEA_API = 'https://eleveaagencia.netlify.app/.netlify/functions/whatsapp-webhook';
    
    // Função para enviar mensagem via WhatsApp
    async function sendWhatsAppMessage(phoneNumber, message, context = {}) {
        try {
            const response = await fetch(ELEVEA_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'send_message',
                    site: SITE_SLUG,
                    to: phoneNumber,
                    message: message,
                    context: context
                })
            });
            
            if (response.ok) {
                console.log('✅ Mensagem WhatsApp enviada');
                return await response.json();
            }
        } catch (error) {
            console.log('⚠️ Erro ao enviar WhatsApp:', error);
        }
    }
    
    // Auto-resposta para leads
    function setupWhatsAppAutoResponse() {
        // Interceptar envios de formulário para auto-resposta
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const formData = new FormData(form);
            
            let phone = '';
            let name = '';
            
            // Capturar telefone e nome
            for (let [key, value] of formData.entries()) {
                if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('telefone') || key.toLowerCase().includes('whatsapp')) {
                    phone = value;
                }
                if (key.toLowerCase().includes('name') || key.toLowerCase().includes('nome')) {
                    name = value;
                }
            }
            
            // Enviar auto-resposta se tiver telefone
            if (phone) {
                const message = `Olá${name ? ' ' + name : ''}! 👋\n\nRecebemos seu contato através do site da Loungerie Amapá Garden.\n\nEm breve entraremos em contato para atendê-lo(a)!\n\n🌿 Obrigado pelo interesse!`;
                
                setTimeout(() => {
                    sendWhatsAppMessage(phone, message, {
                        source: 'website',
                        type: 'auto_response',
                        form_data: Object.fromEntries(formData)
                    });
                }, 2000);
            }
        });
    }
    
    // Botão flutuante do WhatsApp (se configurado)
    function createWhatsAppButton() {
        const whatsappNumber = '+5596981094159'; // ✅ NÚMERO REAL DA LOUNGERIE
        const message = 'Olá! Vim através do site da Loungerie Amapá Garden.';
        
        const button = document.createElement('div');
        button.id = 'elevea-whatsapp-button';
        button.innerHTML = `
            <a href="https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}" 
               target="_blank" 
               style="
                 position: fixed;
                 bottom: 20px;
                 right: 20px;
                 background: #25D366;
                 color: white;
                 border-radius: 50px;
                 padding: 15px;
                 box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                 z-index: 1000;
                 text-decoration: none;
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 width: 60px;
                 height: 60px;
                 font-size: 24px;
               ">
              💬
            </a>
        `;
        
        document.body.appendChild(button);
    }
    
    // Executar quando página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setupWhatsAppAutoResponse();
            createWhatsAppButton();
        });
    } else {
        setupWhatsAppAutoResponse();
        createWhatsAppButton();
    }
    
    // Disponibilizar globalmente
    window.eleveaWhatsApp = {
        send: sendWhatsAppMessage
    };
})();