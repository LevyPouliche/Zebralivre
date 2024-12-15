// Sélectionner le conteneur principal
const container = document.querySelector('.container');

// Trouver tous les items dans le conteneur
container.querySelectorAll('.item').forEach(item => {
    const form = item.querySelector('.star-rating'); // Formulaire dans cet item
    const itemId = item.dataset.id; // Récupérer l'ID de l'item
    const display = item.querySelector('form + *'); // Élément où afficher la note

    // Charger la note depuis localStorage (si elle existe)
    const savedRating = localStorage.getItem(`rating_${itemId}`);
    if (savedRating) {
        const savedStar = form.querySelector(`input[value="${savedRating}"]`);
        if (savedStar) savedStar.checked = true; // Cocher l'étoile sauvegardée
        display.textContent = `Votre note : ${savedRating} étoile(s)`; // Afficher la note
    }

    // Ajouter un événement pour sauvegarder la nouvelle note
    form.addEventListener('change', function () {
        const selectedRating = form.querySelector('input[type="radio"]:checked').value; // Note sélectionnée
        localStorage.setItem(`rating_${itemId}`, selectedRating); // Sauvegarder la note avec l'ID unique
        display.textContent = `Votre note : ${selectedRating} étoile(s)`; // Mettre à jour l'affichage
    });
});
