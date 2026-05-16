document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});


const galleryImages = ["product-plate.jpg", "product-bowl.jpg", "product-bib.jpg", "product-kit.jpg"];
let galleryIndex = 0;

function updateGallery(index){
  const mainPhoto = document.getElementById("mainProductPhoto");
  const thumbs = document.querySelectorAll(".thumbButton");
  if(!mainPhoto || !thumbs.length) return;

  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  mainPhoto.src = galleryImages[galleryIndex];

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === galleryIndex);
  });
}

document.querySelector(".galleryPrev")?.addEventListener("click", () => {
  updateGallery(galleryIndex - 1);
});

document.querySelector(".galleryNext")?.addEventListener("click", () => {
  updateGallery(galleryIndex + 1);
});

document.querySelectorAll(".thumbButton").forEach((thumb, i) => {
  thumb.addEventListener("click", () => updateGallery(i));
});
