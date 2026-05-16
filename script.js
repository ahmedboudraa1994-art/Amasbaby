document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

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

    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === galleryIndex);
    });
  }

  prev.addEventListener("click", function(){
    updateGallery(galleryIndex - 1);
  });

  next.addEventListener("click", function(){
    updateGallery(galleryIndex + 1);
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", function(){
      updateGallery(i);
    });
  });
}

if(document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", initAmasGallery);
}else{
  initAmasGallery();
}
