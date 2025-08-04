const galerie = document.getElementById("galerie");

  let scrollStep = 166; // ajustez selon la taille d’une image + marge
  let scrollPosition = 0;
  const interval = 2500;
  let scrollTimer;

  function autoScroll() {
    const maxScrollLeft = galerie.scrollWidth - galerie.clientWidth;

    if (scrollPosition + scrollStep <= maxScrollLeft) {
      scrollPosition += scrollStep;
      galerie.scrollTo({ left: scrollPosition, behavior: "smooth" });
    } else {
      clearInterval(scrollTimer); // Arrêt du défilement automatique à la fin
    }
  }

  // Lancement initial du défilement automatique
  function startAutoScroll() {
    // Empêche plusieurs timers simultanés
    if (scrollTimer) clearInterval(scrollTimer);
    scrollTimer = setInterval(autoScroll, interval);
  }

  // Contrôle manuel avec les flèches
  function scrollGalerie(direction) {
    const maxScrollLeft = galerie.scrollWidth - galerie.clientWidth;
    scrollPosition += direction * scrollStep;

    if (scrollPosition < 0) scrollPosition = 0;
    if (scrollPosition > maxScrollLeft) scrollPosition = maxScrollLeft;

    galerie.scrollTo({ left: scrollPosition, behavior: "smooth" });

    // Relancer le défilement automatique après interaction manuelle
    if (scrollTimer) clearInterval(scrollTimer);
    setTimeout(startAutoScroll, interval + 500); // délai pour laisser défiler le scroll manuel
  }

  // Démarrage initial
  startAutoScroll();
