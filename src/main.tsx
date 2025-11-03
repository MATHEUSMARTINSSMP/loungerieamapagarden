import React from 'react';
import ReactDOM from 'react-dom/client';
// Assume sections data is stored here or imported from a similar structure
const sectionsData = [
  {
    "id": "7da0a291-b9f0-43e3-b25e-ebff9810d693",
    "type": "hero",
    "title": "Bem-vindo à Loja",
    "subtitle": "Elegância e Conforto em Cada Detalhe",
    "description": "Descubra nossa coleção exclusiva de lingeries e roupas íntimas. Qualidade premium com designs sofisticados."
  },
  {
    "id": "18713a27-677a-4cd6-b0c8-7d4c548354ed",
    "type": "about",
    "title": "Sobre Nós",
    "subtitle": "Nossa História",
    "description": "Há mais de 10 anos no mercado, a Loungerie Amapá Garden oferece produtos de alta qualidade, combinando estilo, conforto e elegância. Nossa missão é fazer com que cada cliente se sinta especial e confiante."
  },
  {
    "id": "e4cce551-ffc2-40f0-9231-43a00b3508d0",
    "type": "products",
    "title": "Nossos Produtos",
    "subtitle": "Coleções Exclusivas",
    "description": "Explore nossa ampla variedade de produtos: lingeries, sutiãs, calcinhas, pijamas e muito mais. Todos com qualidade premium e acabamento impecável."
  },
  {
    "id": "1dca38cc-2ed0-4cf7-b5eb-c1ce47778fed",
    "type": "gallery",
    "title": "Galeria",
    "subtitle": "Nossos Momentos",
    "description": "Confira as fotos dos nossos produtos e eventos."
  },
  {
    "id": "23a0bfa5-d9e8-4bca-97be-5f751ef05ee6",
    "type": "contact",
    "title": "Entre em Contato",
    "subtitle": "Estamos Aqui para Ajudar",
    "description": "Tire suas dúvidas, faça pedidos ou solicite informações. Nossa equipe está pronta para atendê-lo!"
  }
];

function App() {
  return (
    <div>
      {sectionsData.map(section => {
        // Render logic for each section type would go here
        if (section.type === 'hero') {
          return (
            <section key={section.id}>
              <h1>{section.title}</h1>
              <h2>{section.subtitle}</h2>
              <p>{section.description}</p>
            </section>
          );
        } else if (section.type === 'about') {
          return (
            <section key={section.id}>
              <h3>{section.title}</h3>
              <h4>{section.subtitle}</h4>
              <p>{section.description}</p>
            </section>
          );
        } // ... and so on for other section types
        return null;
      })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
