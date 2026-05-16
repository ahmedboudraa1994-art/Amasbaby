
(function(){
  const translations = {
    "Livraison rapide via Amazon": "Fast delivery via Amazon",
    "Paiement sécurisé": "Secure payment",
    "Géré par Amazon": "Managed by Amazon",
    "Pensé pour les premiers moments": "Designed for the first moments",
    "Des essentiels": "Natural essentials",
    "naturels pour bébé,": "for baby,",
    "avec amour ♡": "with love ♡",
    "Des produits sûrs, durables et conçus pour accompagner bébé à chaque étape de ses premiers moments.": "Safe, durable products designed to support baby at every stage of their first moments.",
    "Acheter sur Amazon": "Shop on Amazon",
    "En savoir plus": "Learn more",
    "Notre premier essentiel": "Our first essential",
    "Le kit repas en bois": "The wooden feeding set",
    "Voir la page Repas": "View meals page",
    "Des collections à venir ♡": "Coming soon collections ♡",
    "Repas": "Meals",
    "Découvrir": "Discover",
    "Sommeil": "Sleep",
    "Bain": "Bath",
    "Jouets": "Toys",
    "Accessoires": "Accessories",
    "Bientôt disponible": "Coming soon",
    "Livraison rapide": "Fast delivery",
    "Via Amazon": "Via Amazon",
    "Retours simples": "Simple returns",
    "Selon politique Amazon": "According to Amazon policy",
    "Service client": "Customer service",
    "À votre écoute": "Here to help",
    "Amas Baby sélectionne des essentiels bébé doux, sûrs et de qualité, pour des moments inoubliables.": "Amas Baby selects soft, safe, quality baby essentials for unforgettable moments.",
    "Produit": "Product",
    "Collections": "Collections",
    "À propos": "About",
    "Contact": "Contact",
    "Accueil": "Home",
    "Catégorie repas": "Meals category",
    "Les essentiels repas": "Mealtime essentials",
    "pour accompagner bébé avec douceur": "to support baby with softness",
    "Un coffret naturel et durable, pensé pour les premiers repas de bébé.": "A natural and durable set, designed for baby's first meals.",
    "Voir sur Amazon": "View on Amazon",
    "Coffret Repas Bébé Bambou & Silicone": "Baby Bamboo & Silicone Feeding Set",
    "Couleur": "Color",
    "Rose": "Pink",
    "Vert sauge": "Sage green",
    "Beige": "Beige",
    "Un coffret complet et durable pour accompagner bébé à chaque repas. Conçu avec des matériaux naturels et sûrs, pour des moments simples, doux et agréables.": "A complete and durable set to support baby at every meal. Made with natural and safe materials for simple, soft and pleasant mealtimes.",
    "Inclus dans le coffret": "Included in the set",
    "Assiette": "Plate",
    "bambou": "bamboo",
    "Bol": "Bowl",
    "ventouse": "suction",
    "Cuillère": "Spoon",
    "silicone": "silicone",
    "Fourchette": "Fork",
    "Bavoir": "Bib",
    "récupérateur": "catcher",
    "Pourquoi les parents l’adorent": "Why parents love it",
    "Sans BPA": "BPA free",
    "et sûr": "and safe",
    "Bambou": "Bamboo",
    "naturel": "natural",
    "Facile": "Easy",
    "à nettoyer": "to clean",
    "Cadeau": "Gift",
    "idéal": "ideal",
    "Conçu": "Made",
    "avec amour": "with love",
    "À partir de quel âge ?": "From what age?",
    "Le coffret est pensé pour les premiers repas de bébé, généralement autour de 4 mois et plus.": "The set is designed for baby's first meals, generally around 4 months and up.",
    "Compatible lave-vaisselle ?": "Dishwasher safe?",
    "Les éléments silicone sont faciles à nettoyer. Pour le bambou, un lavage doux à la main est recommandé.": "Silicone pieces are easy to clean. For bamboo, gentle hand washing is recommended.",
    "Le coffret est-il livré via Amazon ?": "Is the set delivered via Amazon?",
    "Oui, le bouton “Voir sur Amazon” dirige vers la fiche produit Amazon.": "Yes, the “View on Amazon” button leads to the Amazon product page."
  };

  const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([fr,en]) => [en,fr]));

  function walkTextNodes(root, callback){
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if(node.parentElement && node.parentElement.closest("script,style,svg")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(callback);
  }

  function switchLanguage(){
    const btn = document.querySelector(".langBtn");
    const current = document.documentElement.lang || "fr";
    const next = current === "fr" ? "en" : "fr";
    const dict = next === "en" ? translations : reverseTranslations;

    walkTextNodes(document.body, node => {
      const trimmed = node.nodeValue.trim();
      if(dict[trimmed]){
        const leading = node.nodeValue.match(/^\s*/)[0];
        const trailing = node.nodeValue.match(/\s*$/)[0];
        node.nodeValue = leading + dict[trimmed] + trailing;
      }
    });

    document.documentElement.lang = next;
    if(btn) btn.textContent = next === "fr" ? "EN" : "FR";
  }

  function initLanguageToggle(){
    const btn = document.querySelector(".langBtn");
    if(btn) btn.addEventListener("click", switchLanguage);
  }

  function initAmasGallery(){
    const galleryImages = ["product-plate.jpg", "product-bowl.jpg", "product-bib.jpg", "product-kit.jpg"];
    let galleryIndex = 0;

    const mainPhoto = document.getElementById("mainProductPhoto");
    const prev = document.querySelector(".galleryPrev");
    const next = document.querySelector(".galleryNext");
    const thumbs = document.querySelectorAll(".thumbButton");

    if(!mainPhoto || !prev || !next || !thumbs.length) return;

    function updateGallery(index){
      galleryIndex = (index + galleryImages.length) % galleryImages.length;
      mainPhoto.src = galleryImages[galleryIndex];
      thumbs.forEach((thumb, i) => thumb.classList.toggle("active", i === galleryIndex));
    }

    prev.addEventListener("click", () => updateGallery(galleryIndex - 1));
    next.addEventListener("click", () => updateGallery(galleryIndex + 1));
    thumbs.forEach((thumb, i) => thumb.addEventListener("click", () => updateGallery(i)));
  }

  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const target = document.querySelector(link.getAttribute("href"));
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:"smooth", block:"start"});
        }
      });
    });
  }

  function init(){
    initLanguageToggle();
    initAmasGallery();
    initSmoothScroll();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
