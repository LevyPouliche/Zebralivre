const barre  = document.getElementById('barre');
const input  = document.getElementById('valeur');
const bouton = document.getElementById('maj');

function setProgress(percent) {
  // borne entre 0 et 100
  const p = Math.max(0, Math.min(100, percent));
  barre.value = p;
  barre.textContent = p + '%'; // texte alternatif si <progress> n’est pas supporté
}

bouton.addEventListener('click', () => {
  setProgress(Number(input.value));
});