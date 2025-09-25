// public/js/elevea-leads.js
(function() {
    'use strict';
    
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN'; // ⚠️ IMPORTANTE: Mesmo slug
    const ELEVEA_API = 'https://eleveaagencia.netlify.app/.netlify/functions/client-api';
    
    // Função para enviar lead
    async function sendLead(leadData) {
        try {
            const response = await fetch(ELEVEA_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'create_lead',
                    site: SITE_SLUG,
                    name: leadData.name || '',
                    email: leadData.email || '',
                    phone: leadData.phone || '',
                    source: 'site'
                })
            });
            
            if (response.ok) {
                console.log('✅ Lead enviado para ELEVEA');
            }
        } catch (error) {
            console.log('⚠️ Erro ao enviar lead:', error);
        }
    }
    
    // Função para capturar formulários
    function attachFormTracking() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const formData = new FormData(form);
                const leadData = {};
                
                // Capturar campos comuns
                for (let [key, value] of formData.entries()) {
                    if (key.toLowerCase().includes('name') || key.toLowerCase().includes('nome')) {
                        leadData.name = value;
                    }
                    if (key.toLowerCase().includes('email') || key.toLowerCase().includes('e-mail')) {
                        leadData.email = value;
                    }
                    if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('telefone') || key.toLowerCase().includes('whatsapp')) {
                        leadData.phone = value;
                    }
                }
                
                // Enviar lead se tiver pelo menos email ou telefone
                if (leadData.email || leadData.phone) {
                    sendLead(leadData);
                }
            });
        });
    }
    
    // Executar quando página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachFormTracking);
    } else {
        attachFormTracking();
    }
})();