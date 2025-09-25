// public/js/elevea-media.js
(function() {
    'use strict';
    
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN';
    const ELEVEA_API = 'https://eleveaagencia.netlify.app/.netlify/functions/client-api';
    
    // Função para upload de imagem
    async function uploadImage(file, slot) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('site', SITE_SLUG);
            formData.append('slot', slot);
            formData.append('action', 'upload_media');
            
            const response = await fetch(ELEVEA_API, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Imagem enviada para ELEVEA');
                return result;
            }
        } catch (error) {
            console.log('⚠️ Erro ao enviar imagem:', error);
        }
    }
    
    // Criar áreas de drop para uploads
    function setupImageUploadAreas() {
        const imageElements = document.querySelectorAll('[data-elevea-image]');
        
        imageElements.forEach(element => {
            const slot = element.getAttribute('data-elevea-image');
            
            // Evitar duplicação de listeners
            if (element.dataset.eleveaInitialized) return;
            element.dataset.eleveaInitialized = 'true';
            
            // Adicionar indicador visual que é editável
            element.style.cursor = 'pointer';
            element.title = 'Clique para alterar imagem (via dashboard ELEVEA)';
            
            // Crear input file oculto
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
            
            // Adicionar click handler para upload
            element.addEventListener('click', function(e) {
                e.preventDefault();
                fileInput.click();
            });
            
            // Handler para quando arquivo é selecionado
            fileInput.addEventListener('change', async function(e) {
                const file = e.target.files[0];
                if (file) {
                    console.log(`📤 Fazendo upload da imagem para slot: ${slot}`);
                    const result = await uploadImage(file, slot);
                    if (result && result.url) {
                        // Atualizar imagem na página
                        if (element.tagName === 'IMG') {
                            element.src = result.url;
                        } else {
                            element.style.backgroundImage = `url(${result.url})`;
                        }
                        console.log('✅ Imagem atualizada na página');
                    }
                }
            });
            
            // Opcional: adicionar overlay quando hover (para indicar que é editável)
            element.addEventListener('mouseenter', function() {
                if (!this.querySelector('.elevea-edit-overlay')) {
                    const overlay = document.createElement('div');
                    overlay.className = 'elevea-edit-overlay';
                    overlay.innerHTML = '✏️ Editável';
                    overlay.style.cssText = `
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        background: rgba(0,0,0,0.7);
                        color: white;
                        padding: 2px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        pointer-events: none;
                        z-index: 1000;
                    `;
                    
                    if (this.style.position === '' || this.style.position === 'static') {
                        this.style.position = 'relative';
                    }
                    
                    this.appendChild(overlay);
                }
            });
            
            element.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.elevea-edit-overlay');
                if (overlay) {
                    overlay.remove();
                }
            });
        });
    }
    
    // Monitorar novos elementos com data-elevea-image (SPA)
    function setupImageObserver() {
        const observer = new MutationObserver(() => {
            setupImageUploadAreas();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Executar quando página carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupImageUploadAreas();
            setupImageObserver();
        });
    } else {
        setupImageUploadAreas();
        setupImageObserver();
    }
    
    // Disponibilizar globalmente
    window.eleveaMedia = {
        upload: uploadImage
    };
})();