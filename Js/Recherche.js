  document.getElementById("resultats").classList.add("galerie-container");
 document.querySelector(".rechercher-btn").addEventListener("click", function() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultats = document.getElementById("resultats");

  // Vide les anciens résultats
  resultats.innerHTML = "";

  // Si rien n’est saisi, on masque la zone et on arrête
  if (searchValue === "") {
    resultats.style.display = "none";
    return;
  }

  // Recherche tous les éléments du document qui ont un id
  const allElements = document.querySelectorAll("[id]");
  const matches = [];

  allElements.forEach(el => {
    // On ignore la zone de résultats elle-même
    if (el.id !== "resultats" && el.id.toLowerCase().includes(searchValue)) {
      matches.push(el);
    }
  });

  // Affichage des résultats
  resultats.style.display = "block";

  if (matches.length > 0) {
    const title = document.createElement("h3");
    title.textContent = `Résultats trouvés (${matches.length}) :`;
    resultats.appendChild(title);

    matches.forEach(el => {
      const clone = el.cloneNode(true);
      clone.removeAttribute("id"); // éviter les doublons d’ID
      resultats.appendChild(clone);
    });
  } else {
    resultats.innerHTML = "<p>Aucun résultat trouvé.</p>";
  }
});
