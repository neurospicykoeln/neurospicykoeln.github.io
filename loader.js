document.addEventListener("DOMContentLoaded", function () {

  // Header and Footer
  function loadPart(id, file) {
    return fetch(file)
      .then(response => response.text())
      .then(html => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      })
      .catch(error => console.error("Error loading", file, error));
  }

  Promise.all([
    loadPart("header", "partials/header.html"),
    loadPart("footer", "partials/footer.html")
  ]);

  // Gallery and Lightbox
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  let images = [];
  let currentIndex = 0;

  if (gallery) {
    images = Array.from(gallery.querySelectorAll("img"));
  }


  // Gallery scroll buttons
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

    currentIndex = images.indexOf(img);

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


  // image swipe
  function showImage(index) {

    if (!images.length) return;

    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
  }


  // Desktop key control
  document.addEventListener("keydown", function(e) {

    if (!lightbox || lightbox.style.display !== "flex") return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);

  });


  // Lightbox events
  if (lightbox) {

    // click to close
    lightbox.addEventListener("click", function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });


    // Swipe control
    let startX = 0;
    let startY = 0;

    lightbox.addEventListener("touchstart", function(e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    lightbox.addEventListener("touchend", function(e) {

      let endX = e.changedTouches[0].clientX;
      let endY = e.changedTouches[0].clientY;

      let diffX = endX - startX;
      let diffY = endY - startY;

      // Swipe right
      if (diffX > 80) {
        showImage(currentIndex - 1);
      }

      // Swipe left
      else if (diffX < -80) {
        showImage(currentIndex + 1);
      }

      // Swipe down
      else if (diffY > 120) {
        closeLightbox();
      }

    });

  }

});
