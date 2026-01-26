// Récupère le pseudo depuis le storage et l'affiche partout
function syncPseudo() {
  const pseudo = localStorage.getItem("userPseudo");

  if (!pseudo) return;

  document.querySelectorAll(".pseudo-sync").forEach(element => {
    element.textContent = pseudo;
  });
}

// Sauvegarde un pseudo et déclenche la synchronisation
function savePseudo(pseudo) {
  if (!pseudo || pseudo.trim() === "") return;

  localStorage.setItem("userPseudo", pseudo.trim());
  syncPseudo();
}

// Initialisation automatique au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  syncPseudo();
});
