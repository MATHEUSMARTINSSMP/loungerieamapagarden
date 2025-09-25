// public/js/elevea-feedback.js
(function() {
    'use strict';
    
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN';
    const ELEVEA_API = 'https://eleveaagencia.netlify.app/.netlify/functions/client-api';
    
    // Função para enviar feedback
    async function sendFeedback(feedbackData) {
        try {
            const response = await fetch(ELEVEA_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'create_feedback',
                    site: SITE_SLUG,
                    rating: feedbackData.rating,
                    comment: feedbackData.comment || '',
                    name: feedbackData.name || '',
                    email: feedbackData.email || '',
                    phone: feedbackData.phone || ''
                })
            });
            
            if (response.ok) {
                console.log('✅ Feedback enviado para ELEVEA');
            }
        } catch (error) {
            console.log('⚠️ Erro ao enviar feedback:', error);
        }
    }
    
    // Disponibilizar globalmente para uso manual
    window.eleveaFeedback = sendFeedback;
})();