function toggleFavori(bouton) {
  const image = bouton.querySelector('img');

  const srcVide  = "Images/Coeur_Vide.png";
  const srcPlein = "Images/Coeur_Plein.png";

  if (image.src.includes("Coeur_Vide.png")) {
    image.src = srcPlein;
    image.alt = "coeur plein";
  } else {
    image.src = srcVide;
    image.alt = "coeur vide";
  }
}
