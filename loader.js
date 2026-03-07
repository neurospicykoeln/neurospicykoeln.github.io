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
