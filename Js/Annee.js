document.addEventListener('DOMContentLoaded', () => {
    const selectAnnee = document.getElementById('Annee_Publication');
    const anneeActuelle = new Date().getFullYear();

    for (let annee = anneeActuelle; annee >= 1000; annee--) {
        const option = document.createElement('option');
        option.value = annee;
        option.textContent = annee;
        selectAnnee.appendChild(option);
    }
});
