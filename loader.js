document.addEventListener("DOMContentLoaded", function () {

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

  window.scrollGallery = function(amount) {
    document.getElementById("gallery").scrollBy({
      left: amount,
      behavior: "smooth"
    });
  };

  window.openLightbox = function(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  };

  document.getElementById("lightbox").addEventListener("click", function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });

  window.closeLightbox = function() {
    document.getElementById("lightbox").style.display = "none";
  };

  document.addEventListener("keydown", function(e){
    if (e.key === "Escape") {
      closeLightbox();
    }
  });

});
