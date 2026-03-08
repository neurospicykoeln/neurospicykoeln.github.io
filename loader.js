document.addEventListener("DOMContentLoaded", function () {

  // Header and Footer
  function loadPart(id, file) {
    fetch(file)
      .then(response => response.text())
      .then(html => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      })
      .catch(error => console.error("Error loading", file, error));
  } 

  // load in parallel
  Promise.all([
    loadPart("header", "partials/header.html"),
    loadPart("footer", "partials/footer.html")
  ]);

  // Photo gallery and lightbox
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  // Scroll Buttons
  window.scrollGallery = function(amount) {
    if (!gallery) return;

    gallery.scrollBy({
      left: amount,
      behavior: "smooth"
    });
  };

  // open lightbox
  window.openLightbox = function(img) {
    if (!lightbox || !lightboxImg) return;

    lightbox.style.display = "flex";
    lightboxImg.src = img.src;

    document.body.style.overflow = "hidden";
  };

  // close lightbox
  window.closeLightbox = function() {
    if (!lightbox || !lightboxImg) return;

    lightbox.style.display = "none";
    lightboxImg.src = "";

    document.body.style.overflow = "";
  };


  // ESC to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      window.closeLightbox();
    }
  });


  // only activate when lightbox exists
  if (lightbox) {

    // click to close
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        window.closeLightbox();
      }
    });

    // Swipe to close
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
        window.closeLightbox();
      }

      touchStartY = 0;
      touchEndY = 0;
    });

  }

});
