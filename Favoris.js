function toggleFavori(bouton) {
      const image = bouton.querySelector('img');
      const srcVide = "Coeur_Vide.png";
      const srcPlein = "Coeur_Plein.png";
    
      if (image.src.includes(srcVide)) {
        image.src = srcPlein;
        image.alt = "coeur plein";
      } else {
        image.src = srcVide;
        image.alt = "coeur vide";
      }
    }
