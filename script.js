(function(){
  'use strict';

  /* ══════════════════════════════════════════
     1. HEADER — shrink on scroll
  ══════════════════════════════════════════ */
  function initHeaderScroll(){
    const header = document.querySelector('.siteHeader');
    if(!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ══════════════════════════════════════════
     2. SCROLL REVEAL — IntersectionObserver
  ══════════════════════════════════════════ */
  function initScrollReveal(){
    const els = document.querySelectorAll('.reveal, .stagger');
    if(!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    els.forEach(el => io.observe(el));
  }

  /* ══════════════════════════════════════════
     3. GALLERY — arrows + thumbs + swipe + dots
  ══════════════════════════════════════════ */
  function initGallery(){
    const galleryImages = [
      {src:'product-plate.jpg', label:'Beige naturel', color:'beige'},
      {src:'product-bib.jpg', label:'Rose doux', color:'rose'},
      {src:'product-bowl.jpg', label:'Vert sauge', color:'sage'},
      {src:'product-kit.jpg', label:'Packaging et détails', color:'kit'}
    ];

    let idx = 0;
    let touchStartX = 0;

    const mainPhoto = document.getElementById('mainProductPhoto');
    const prev      = document.querySelector('.galleryPrev');
    const next      = document.querySelector('.galleryNext');
    const thumbBtns = document.querySelectorAll('.thumbButton');
    const dots      = document.querySelectorAll('.galleryDot');
    const colorBtns = document.querySelectorAll('.colorPill');

    if(!mainPhoto) return;

    function setActiveState(){
      thumbBtns.forEach((t,i) => t.classList.toggle('active', i === idx));
      dots.forEach((d,i) => d.classList.toggle('active', i === idx));

      colorBtns.forEach(btn => {
        const colorIndex = Number(btn.dataset.galleryIndex);
        const active = colorIndex === idx;
        btn.classList.toggle('selected', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    function goTo(newIdx){
      idx = (newIdx + galleryImages.length) % galleryImages.length;
      const nextImage = galleryImages[idx];

      mainPhoto.style.opacity = '0';
      setTimeout(() => {
        mainPhoto.src = nextImage.src;
        mainPhoto.alt = 'Coffret repas bébé ' + nextImage.label;
        mainPhoto.style.opacity = '1';
      }, 160);

      setActiveState();
    }

    if(prev) prev.addEventListener('click', () => goTo(idx - 1));
    if(next) next.addEventListener('click', () => goTo(idx + 1));

    thumbBtns.forEach((t,i) => {
      t.addEventListener('click', () => goTo(Number(t.dataset.galleryIndex ?? i)));
    });

    dots.forEach((d,i) => {
      d.addEventListener('click', () => goTo(Number(d.dataset.galleryIndex ?? i)));
    });

    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => goTo(Number(btn.dataset.galleryIndex)));
    });

    const box = document.querySelector('.mainProductImage');
    if(box){
      box.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
      }, {passive:true});

      box.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if(Math.abs(dx) > 44){
          goTo(dx < 0 ? idx + 1 : idx - 1);
        }
      }, {passive:true});
    }

    setActiveState();
  }

  /* ══════════════════════════════════════════
     4. COLOR PILLS
  ══════════════════════════════════════════ */
  function initColorPills(){
    // Color pills are synchronized inside initGallery().
  }

  /* ══════════════════════════════════════════
     5. SMOOTH SCROLL
  ══════════════════════════════════════════ */
  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if(href === '#home'){ return; } // let browser handle — scrolls to top naturally
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
  }

  /* ══════════════════════════════════════════
     6. LANGUAGE TOGGLE — FR ↔ EN
  ══════════════════════════════════════════ */
  const translations = {
    "Livraison rapide via Amazon":"Fast delivery via Amazon",
    "Pensé pour les premiers moments":"Designed for the first moments",
    "Des essentiels":"Natural essentials",
    "naturels pour bébé,":"for baby,",
    "avec amour ♡":"with love ♡",
    "Des produits sûrs, durables et conçus pour accompagner bébé à chaque étape de ses premiers moments.":"Safe, durable products designed to support baby at every stage of their first moments.",
    "Acheter sur Amazon":"Shop on Amazon",
    "En savoir plus":"Learn more",
    "Notre premier essentiel":"Our first essential",
    "Le kit repas en bois":"The wooden feeding set",
    "Voir la page Repas":"View meals page",
    "Des collections à venir ♡":"Coming soon ♡",
    "Repas":"Meals","Découvrir":"Discover",
    "Sommeil":"Sleep","Bain":"Bath","Jouets":"Toys","Accessoires":"Accessories",
    "Bientôt disponible":"Coming soon",
    "Livraison rapide":"Fast delivery","Via Amazon":"Via Amazon",
    "Sélection premium":"Premium selection","Qualité soignée":"Carefully crafted",
    "Retours simples":"Easy returns","Selon politique Amazon":"Per Amazon policy",
    "Service client":"Customer service","À votre écoute":"Here for you",
    "Amas Baby sélectionne des essentiels bébé doux, sûrs et de qualité, pour des moments inoubliables.":"Amas Baby selects soft, safe, quality baby essentials for unforgettable moments.",
    "Nos produits":"Our products","Collections":"Collections","À propos":"About","Contact":"Contact",
    "Accueil":"Home","Produit":"Product",
    "© 2025 Amas Baby. Tous droits réservés.":"© 2025 Amas Baby. All rights reserved.",
    "Catégorie repas":"Meals category",
    "Les essentiels repas":"Mealtime essentials",
    "pour accompagner bébé avec douceur":"to support baby gently",
    "Un coffret naturel et durable, pensé pour les premiers repas de bébé.":"A natural, durable set for baby's first meals.",
    "Voir sur Amazon":"View on Amazon",
    "Coffret Repas Bébé Bambou & Silicone":"Baby Bamboo & Silicone Feeding Set",
    "Couleur":"Color","Rose":"Pink","Vert sauge":"Sage green","Beige":"Beige",
    "Un coffret complet et durable pour accompagner bébé à chaque repas. Conçu avec des matériaux naturels et sûrs, pour des moments simples, doux et agréables.":"A complete set for every mealtime — made with natural, safe materials.",
    "Inclus dans le coffret":"Included in the set",
    "Assiette":"Plate","bambou naturel":"natural bamboo",
    "Bol":"Bowl","Cuillère":"Spoon","bambou & silicone":"bamboo & silicone",
    "Fourchette":"Fork","Bavoir":"Bib","silicone alimentaire":"food-grade silicone",
    "Pourquoi les parents l'adorent":"Why parents love it",
    "Sans BPA":"BPA free","et sûr pour bébé":"safe for baby",
    "Cadeau":"Gift","idéal":"ideal",
    "À partir de quel âge ?":"From what age?",
    "Le coffret est pensé pour les premiers repas de bébé, généralement autour de 4 mois et plus.":"Designed for baby's first meals, generally from 4 months.",
    "Compatible lave-vaisselle ?":"Dishwasher safe?",
    "Les éléments silicone sont faciles à nettoyer. Pour le bambou, un lavage doux à la main est recommandé.":"Silicone pieces are easy to clean. Bamboo should be hand washed gently.",
    "Le coffret est-il livré via Amazon ?":"Is the set shipped via Amazon?",
    "Oui, le bouton \"Voir sur Amazon\" dirige vers la fiche produit Amazon.":"Yes, the \"View on Amazon\" button links to the Amazon product page.",
    "Naturel":"Natural","& Durable":"& Durable","Disponible":"Available",
    "Matériaux naturels":"Natural materials",
    "Facile à nettoyer":"Easy to clean","Conçu avec amour":"Made with love"
  };
  const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([fr,en])=>[en,fr]));

  function walkText(root, cb){
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n){
        if(!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if(n.parentElement?.closest('script,style,svg')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes=[];
    while(w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(cb);
  }

  function initLang(){
    const btn = document.querySelector('.langBtn');
    if(!btn) return;
    btn.addEventListener('click', () => {
      const cur = document.documentElement.lang || 'fr';
      const next = cur === 'fr' ? 'en' : 'fr';
      const dict = next === 'en' ? translations : reverseTranslations;
      walkText(document.body, node => {
        const t = node.nodeValue.trim();
        if(dict[t]){
          const lead = node.nodeValue.match(/^\s*/)[0];
          const tail = node.nodeValue.match(/\s*$/)[0];
          node.nodeValue = lead + dict[t] + tail;
        }
      });
      document.documentElement.lang = next;
      btn.textContent = next === 'fr' ? 'EN' : 'FR';
    });
  }

  /* ══════════════════════════════════════════
     INIT
  ══════════════════════════════════════════ */
  function init(){
    initHeaderScroll();
    initScrollReveal();
    initGallery();
    initColorPills();
    initSmoothScroll();
    initLang();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
