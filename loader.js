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


function scrollGallery(amount) {
  document.getElementById("gallery").scrollBy({
    left: amount,
    behavior: "smooth"
  });
}

function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightbox.style.display = "flex";
  lightboxImg.src = img.src;
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
