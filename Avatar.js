const avatar = document.getElementById("avatar");
  const avatarInput = document.getElementById("avatarInput");

  // Charger l’avatar sauvegardé au démarrage
  const savedAvatar = localStorage.getItem("avatarProfil");
  if (savedAvatar) {
    avatar.src = savedAvatar;
  }

  // Ouvrir le sélecteur au clic
  avatar.addEventListener("click", function (e) {
    e.preventDefault();
    avatarInput.click();
  });

  // Sauvegarder l’image sélectionnée
  avatarInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      avatar.src = e.target.result;
      localStorage.setItem("avatarProfil", e.target.result);
    };
    reader.readAsDataURL(file);
  });