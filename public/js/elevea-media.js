// public/js/elevea-media.js - VERSÃO CORRIGIDA
(function() {
    'use strict';
    
    const SITE_SLUG = 'LOUNGERIEAMAPAGARDEN';
    const ELEVEA_UPLOAD_API = 'https://eleveaagencia.netlify.app/.netlify/functions/upload-drive';
    
    // Função para upload de imagem (CORRIGIDA)
    async function uploadImage(file, slot) {
        try {
            // Converter arquivo para base64
            const base64 = await fileToBase64(file);
            
            const response = await fetch(ELEVEA_UPLOAD_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    siteSlug: SITE_SLUG,
                    email: 'contato@' + SITE_SLUG.toLowerCase() + '.com.br',
                    logo: slot === 'logo' ? base64 : null,
                    fotos: slot !== 'logo' ? [base64] : [],
                    logoLink: '',
                    fotosLink: ''
                })
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
    
    // Converter arquivo para base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
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
                    if (result) {
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