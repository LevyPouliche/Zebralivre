const avatarInput = document.getElementById('avatarInput');
const avatars = document.querySelectorAll('.avatar-sync');

// Cliquer sur n’importe quel avatar déclenche l’input
avatars.forEach(img => {
    img.addEventListener('click', () => {
        avatarInput.click();
    });
});

// Charger l'avatar depuis localStorage dès le chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        avatars.forEach(img => img.src = savedAvatar);
    }
});

// Quand l'utilisateur choisit un fichier
avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageSrc = e.target.result;

            // Mettre à jour tous les avatars en même temps
            avatars.forEach(img => img.src = imageSrc);

            // Sauvegarder dans localStorage
            localStorage.setItem('userAvatar', imageSrc);
        }

        reader.readAsDataURL(file);
    }
});
