document.addEventListener("DOMContentLoaded", () => {

  // Éléments DOM
  const barre = document.getElementById('barre');
  const niveauTexte = document.getElementById('niveauTexte');
  const xpTotalTexte = document.getElementById('xpTotalTexte');

  // Sécurité : si la barre n’existe pas, on ne lance pas le script
  if (!barre || !niveauTexte) {
    console.warn("ProgressBar : éléments DOM manquants");
    return;
  }

  // Données
  let niveau = 0;
  let xp = 0;
  let xpCumul = 0;

  // XP requise pour passer au niveau suivant
  function xpRequise() {
    if (niveau === 0) return 60;
    return Math.round(120 * Math.pow(niveau, 1.6));
  }

  // Mise à jour visuelle
  function setProgress() {
    const maxXP = xpRequise();

    barre.max = maxXP;
    barre.value = xp;

    niveauTexte.textContent = "Niveau " + niveau;

    if (xpTotalTexte) {
      xpTotalTexte.textContent = xpCumul + " XP";
    }

    // Couleur dynamique par niveau (CSS variable)
    const couleur =
      getComputedStyle(document.documentElement)
        .getPropertyValue(`--lvl-${niveau}`) || "#006D6F";

    barre.style.backgroundColor = couleur.trim();
    niveauTexte.style.color = couleur.trim();
  }

  // Ajout d’XP (appelé par Timer.js)
  window.ajouterXP = function (valeur) {
    if (typeof valeur !== "number" || valeur <= 0) return;

    xp += valeur;
    xpCumul += valeur;

    while (xp >= xpRequise()) {
      xp -= xpRequise();
      niveau++;
    }

    sauvegarder();
    setProgress();
  };

  // Sauvegarde locale
  function sauvegarder() {
    localStorage.setItem("progression", JSON.stringify({
      niveau,
      xp,
      xpCumul
    }));
  }

  // Chargement local
  function charger() {
    const data = localStorage.getItem("progression");
    if (data) {
      const obj = JSON.parse(data);
      niveau = obj.niveau ?? 0;
      xp = obj.xp ?? 0;
      xpCumul = obj.xpCumul ?? 0;
    }
    setProgress();
  }

  // Initialisation
  charger();

});