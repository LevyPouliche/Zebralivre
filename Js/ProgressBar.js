const barre = document.getElementById('barre');
const niveauTexte = document.getElementById('niveauTexte');
const xpTotalTexte = document.getElementById('xpTotalTexte'); // nouvel élément affichant le total d'XP

// Données
let niveau = 0;   // On commence au niveau 0
let xp = 0;
let xpCumul = 0;  // Total cumulé à vie

// XP nécessaire pour le niveau courant
function xpRequise() {
  if (niveau === 0) {
    return 60; // Palier spécial 0 → 1
  }
  return Math.round(120 * Math.pow(niveau, 1.6));
}

// Mise à jour visuelle
function setProgress() {
    const maxXP = xpRequise();
    barre.max = maxXP;
    barre.value = xp;

    niveauTexte.textContent = "Niveau " + niveau;

    // Appliquer la variable CSS correspondant au niveau
    const couleur = getComputedStyle(document.documentElement)
        .getPropertyValue(`--lvl-${niveau}`) || "#006D6F";

    barre.style.backgroundColor = couleur.trim();
    niveauTexte.style.color = couleur.trim();
}

// Ajout d'XP
function ajouterXP(valeur) {
  xp += valeur;
  xpCumul += valeur; // cumule l'XP à vie

  while (xp >= xpRequise()) {
    const xpMax = xpRequise();
    xp -= xpMax;
    niveau++;
  }

  sauvegarder();
  setProgress();
}

// Sauvegarde locale
function sauvegarder() {
  localStorage.setItem('progression', JSON.stringify({
    niveau: niveau,
    xp: xp,
    xpCumul: xpCumul
  }));
}

// Chargement
function charger() {
  const data = localStorage.getItem('progression');
  if (data) {
    const obj = JSON.parse(data);
    niveau = obj.niveau;
    xp = obj.xp;
    xpCumul = obj.xpCumul || 0;
  }
  setProgress();
}

// Initialisation
charger();
