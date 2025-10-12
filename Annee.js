const select = document.getElementById("Annee_Publication");
  const anneeActuelle = new Date().getFullYear();
  const premiereAnnee = 1000; // ou une autre année de départ

  for (let annee = anneeActuelle; annee >= premiereAnnee; annee--) {
    const option = document.createElement("option");
    option.value = annee;
    option.textContent = annee;
    select.appendChild(option);
  }
