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
  ]).then(() => {
    // Mobile nav bar toggle
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav");

    if (navToggle && nav) {

      // Klick
      navToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        navToggle.classList.toggle("active");
      });

      // Menü schließen bei Klick auf Link
      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.remove("active");
          navToggle.classList.remove("active");
        });
      });

      // Menü schließen bei Klick außerhalb
      document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
          nav.classList.remove("active");
          navToggle.classList.remove("active");
        }
      });
    }
  });

  // Gallery and lightbox
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

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

    const caption = img.closest("figure")?.querySelector("figcaption");
    if (caption && lightboxCaption) {
      lightboxCaption.textContent = caption.textContent;
    }

    document.body.style.overflow = "hidden";

  };


  // close lightbox
  window.closeLightbox = function() {

    if (!lightbox) return;

    lightbox.style.display = "none";
    lightboxImg.src = "";

    document.body.style.overflow = "";

  };


  // change images
  function showImage(index) {

    if (!images.length) return;

    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;

    const img = images[currentIndex];

    lightboxImg.src = img.src;

    const caption = img.closest("figure")?.querySelector("figcaption");
    if (caption && lightboxCaption) {
      lightboxCaption.textContent = caption.textContent;
    }

  }


  // Desktop key controls
  document.addEventListener("keydown", function(e) {

    if (!lightbox || lightbox.style.display !== "flex") return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);

  });


  // lightbox events
  if (lightbox) {

    // click to close
    lightbox.addEventListener("click", function(e) {

      if (e.target === lightbox) {
        closeLightbox();
      }

    });


    // swipe controls
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

      // swipe right
      if (diffX > 80) {
        showImage(currentIndex - 1);
      }

      // swipe left
      else if (diffX < -80) {
        showImage(currentIndex + 1);
      }

      // swipe down
      else if (diffY > 120) {
        closeLightbox();
      }

    });

  }

});
