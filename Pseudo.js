const pseudo = localStorage.getItem("userPseudo");
  if (pseudo) {
    document.getElementById("nav-pseudo").textContent = pseudo;
    document.getElementById("profile-pseudo").textContent = pseudo;
  } else {
    document.getElementById("nav-pseudo").textContent = "Aucun pseudo";
    document.getElementById("profile-pseudo").textContent = "Aucun pseudo";
  }
