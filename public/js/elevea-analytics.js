// public/js/elevea-analytics.js
(function() {
    'use strict';
    
    // Configuração - ALTERE AQUI O SITE_SLUG
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN'; // ⚠️ IMPORTANTE: Usar o slug correto
    const ELEVEA_API = 'https://eleveaagencia.netlify.app/.netlify/functions/client-api';
    
    // Função para capturar dados da visita
    function getVisitData() {
        return {
            path: window.location.pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer || '',
            timestamp: new Date().toISOString(),
            screen: {
                width: screen.width,
                height: screen.height
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }
    
    // Função para enviar hit para ELEVEA
    async function recordHit() {
        try {
            const visitData = getVisitData();
            
            const response = await fetch(ELEVEA_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'record_hit',
                    site: SITE_SLUG,
                    meta: visitData
                })
            });
            
            if (response.ok) {
                console.log('✅ Hit registrado na ELEVEA');
            }
        } catch (error) {
            console.log('⚠️ Erro ao registrar hit:', error);
        }
    }
    
    // Executar quando página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', recordHit);
    } else {
        recordHit();
    }
    
    // Registrar mudanças de página (SPA)
    let currentPath = window.location.pathname;
    setInterval(() => {
        if (window.location.pathname !== currentPath) {
            currentPath = window.location.pathname;
            recordHit();
        }
    }, 1000);
})();