  const avatar = document.getElementById('avatar');
  const imageUpload = document.getElementById('imageUpload');

  // Limite en octets (1 Mo = 1 048 576 octets)
  const MAX_FILE_SIZE = 1048576;

  avatar.addEventListener('click', () => {
    imageUpload.click();
  });

  imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    // Vérifie la taille du fichier
    if (file.size > MAX_FILE_SIZE) {
      alert("L'image est trop lourde. Veuillez choisir un fichier de moins de 1 Mo.");
      this.value = ''; // Réinitialise le champ fichier
      return;
    }

    // Vérifie que c’est bien une image
    if (!file.type.startsWith('image/')) {
      alert("Ce fichier n'est pas une image.");
      this.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      avatar.src = e.target.result;
      sessionStorage.setItem('menuProfilImage', e.target.result);
    };
    reader.readAsDataURL(file);
  });

  // Restaure l'image sauvegardée en session
  const savedImage = sessionStorage.getItem('menuProfilImage');
  if (savedImage) {
    avatar.src = savedImage;
  }
