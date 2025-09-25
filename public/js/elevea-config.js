// public/js/elevea-config.js
(function() {
    'use strict';
    
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN';
    const ELEVEA_API = 'https://eleveaagencia.netlify.app/.netlify/functions/client-api';
    
    let siteConfig = {};
    
    // Carregar configurações do site
    async function loadSiteConfig() {
        try {
            const response = await fetch(`${ELEVEA_API}?action=get_settings&site=${SITE_SLUG}`);
            if (response.ok) {
                const result = await response.json();
                if (result.settings) {
                    siteConfig = result.settings;
                    applySiteConfig();
                }
            }
        } catch (error) {
            console.log('⚠️ Erro ao carregar configurações:', error);
        }
    }
    
    // Aplicar configurações no site
    function applySiteConfig() {
        // Aplicar textos dinâmicos
        applyTextContent();
        
        // Aplicar imagens dinâmicas
        applyImageContent();
        
        // Aplicar estilos customizados
        applyCustomStyles();
        
        // Aplicar configurações de SEO
        applySEOConfig();
    }
    
    // Aplicar textos dinâmicos
    function applyTextContent() {
        if (siteConfig.texts) {
            Object.keys(siteConfig.texts).forEach(key => {
                const elements = document.querySelectorAll(`[data-elevea-text="${key}"]`);
                elements.forEach(el => {
                    if (siteConfig.texts[key]) {
                        el.textContent = siteConfig.texts[key];
                    }
                });
            });
        }
    }
    
    // Aplicar imagens dinâmicas
    function applyImageContent() {
        if (siteConfig.images) {
            Object.keys(siteConfig.images).forEach(key => {
                const elements = document.querySelectorAll(`[data-elevea-image="${key}"]`);
                elements.forEach(el => {
                    if (siteConfig.images[key]) {
                        if (el.tagName === 'IMG') {
                            el.src = siteConfig.images[key];
                        } else {
                            el.style.backgroundImage = `url(${siteConfig.images[key]})`;
                        }
                    }
                });
            });
        }
    }
    
    // Aplicar estilos customizados
    function applyCustomStyles() {
        if (siteConfig.styles) {
            let styleElement = document.getElementById('elevea-dynamic-styles');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'elevea-dynamic-styles';
                document.head.appendChild(styleElement);
            }
            
            let css = '';
            Object.keys(siteConfig.styles).forEach(selector => {
                const styles = siteConfig.styles[selector];
                css += `${selector} { `;
                Object.keys(styles).forEach(property => {
                    css += `${property}: ${styles[property]}; `;
                });
                css += `} `;
            });
            
            styleElement.textContent = css;
        }
    }
    
    // Aplicar configurações de SEO
    function applySEOConfig() {
        if (siteConfig.seo) {
            // Título da página
            if (siteConfig.seo.title) {
                document.title = siteConfig.seo.title;
            }
            
            // Meta description
            if (siteConfig.seo.description) {
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = 'description';
                    document.head.appendChild(metaDesc);
                }
                metaDesc.content = siteConfig.seo.description;
            }
            
            // Meta keywords
            if (siteConfig.seo.keywords) {
                let metaKeywords = document.querySelector('meta[name="keywords"]');
                if (!metaKeywords) {
                    metaKeywords = document.createElement('meta');
                    metaKeywords.name = 'keywords';
                    document.head.appendChild(metaKeywords);
                }
                metaKeywords.content = siteConfig.seo.keywords;
            }
        }
    }
    
    // Monitorar mudanças no DOM para elementos dinâmicos (SPA)
    function setupDOMObserver() {
        const observer = new MutationObserver(() => {
            // Reagir configurações quando DOM muda (para SPAs)
            setTimeout(applySiteConfig, 100);
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Executar quando página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadSiteConfig();
            setupDOMObserver();
        });
    } else {
        loadSiteConfig();
        setupDOMObserver();
    }
    
    // Recarregar configurações periodicamente (5 minutos)
    setInterval(loadSiteConfig, 5 * 60 * 1000);
    
    // Disponibilizar globalmente
    window.eleveaConfig = {
        reload: loadSiteConfig,
        get: () => siteConfig
    };
})();