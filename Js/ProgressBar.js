const barre = document.getElementById('barre');
const niveauTexte = document.getElementById('niveauTexte');

// Données
let niveau = 1;
let xp = 0;

// XP nécessaire pour le niveau courant
function xpRequise() {
  return 100 * niveau;
}

// Mise à jour visuelle
function setProgress() {
  const maxXP = xpRequise();
  barre.max = maxXP;
  barre.value = xp;
  barre.textContent = Math.round((xp / maxXP) * 100) + '%';

  niveauTexte.textContent = "Niveau " + niveau;
}

// Ajout d'XP
function ajouterXP(valeur) {
  xp += valeur;

  while (xp >= xpRequise()) {
    xp -= xpRequise();
    niveau++;
  }

  sauvegarder();
  setProgress();
}

// Sauvegarde locale
function sauvegarder() {
  localStorage.setItem('progression', JSON.stringify({
    niveau: niveau,
    xp: xp
  }));
}

// Chargement
function charger() {
  const data = localStorage.getItem('progression');
  if (data) {
    const obj = JSON.parse(data);
    niveau = obj.niveau;
    xp = obj.xp;
  }
  setProgress();
}

// Initialisation
charger();
