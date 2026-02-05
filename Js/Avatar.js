localStorage.setItem("userPseudo", "TestUtilisateur");
syncPseudo();
function savePseudo(pseudo) {
  localStorage.setItem("userPseudo", pseudo);
  syncPseudo();
  function syncPseudo() {
  const pseudo = localStorage.getItem("userPseudo");

  if (!pseudo) return;

  document.querySelectorAll(".pseudo-sync").forEach(el => {
    el.textContent = pseudo;
  });
}
}
document.addEventListener("DOMContentLoaded", syncPseudo);
