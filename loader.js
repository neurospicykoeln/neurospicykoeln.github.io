document.addEventListener("DOMContentLoaded", function () {

  // Header und Footer auf jedem Tab laden
  function loadPart(id, file) {
    fetch(file)
      .then(response => response.text())
      .then(html => {
        document.getElementById(id).innerHTML = html;
      })
      .catch(error => console.error("Error loading", file, error));
  }

  // Load header and footer
  loadPart("header", "partials/header.html");
  loadPart("footer", "partials/footer.html");

  // Lightbox
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  
  // Scroll Buttons
  function scrollGallery(amount) {
    gallery.scrollBy({
      left: amount,
      behavior: "smooth"
    });
  }
  
  // Lightbox öffnen
  function openLightbox(img) {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  
  // Hintergrundscroll deaktivieren (wichtig für Handy)
    document.body.style.overflow = "hidden";
  }
  
  // Lightboy schließen
  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  
  // Scroll wieder aktivieren
    document.body.style.overflow = "";
  }
  
  // ESC zum Schließen
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
  
  // Lightbox per Klick außerhalb schließen
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Lightbox per swipe nach unten schließen (Handy)
  let touchStartY = 0;
  let touchEndY = 0;
  
  lightbox.addEventListener("touchstart", function (e) {
    touchStartY = e.touches[0].clientY;
  });
  
  lightbox.addEventListener("touchmove", function (e) {
    touchEndY = e.touches[0].clientY;
  });
  
  lightbox.addEventListener("touchend", function () {
    if (touchEndY - touchStartY > 120) {
      closeLightbox();
    }
  
    touchStartY = 0;
    touchEndY = 0;
  });
