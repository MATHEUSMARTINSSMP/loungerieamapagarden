// public/js/elevea-whatsapp.js - VERSÃO CORRIGIDA
(function() {
    'use strict';
    
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN';
    // WhatsApp webhook não é usado pelo cliente - apenas auto-resposta direta
    
    // Botão flutuante do WhatsApp (FUNCIONA)
    function createWhatsAppButton() {
        const whatsappNumber = '+5596981094159'; // ✅ NÚMERO REAL DA LOUNGERIE
        const message = 'Olá! Vim através do site da Loungerie Amapá Garden.';
        
        // Evitar criação duplicada
        if (document.getElementById('elevea-whatsapp-button')) return;
        
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
    
    // Auto-resposta via API (SIMPLIFICADA)
    function setupWhatsAppAutoResponse() {
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const formData = new FormData(form);
            
            let phone = '';
            let name = '';
            
            for (let [key, value] of formData.entries()) {
                if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('telefone') || key.toLowerCase().includes('whatsapp')) {
                    phone = value;
                }
                if (key.toLowerCase().includes('name') || key.toLowerCase().includes('nome')) {
                    name = value;
                }
            }
            
            // Log para debug (remover em produção)
            if (phone) {
                console.log('📱 WhatsApp lead capturado:', { name, phone });
                // Integração com WhatsApp será feita via dashboard da ELEVEA
            }
        });
    }
    
    // Função para enviar mensagem WhatsApp programática
    function sendWhatsAppMessage(phone, message) {
        const cleanPhone = phone.replace(/\D/g, '');
        const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    // Inicialização
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
        send: sendWhatsAppMessage,
        log: (msg) => console.log('📱 WhatsApp:', msg)
    };
})();