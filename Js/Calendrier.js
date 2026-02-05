const monthDisplay = document.getElementById('monthDisplay');
const daysContainer = document.getElementById('daysContainer');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

// Variables pour la date actuelle
let currentDate = new Date();
const today = currentDate.getDate(); // Jour actuel
const currentMonth = currentDate.getMonth(); // Mois actuel
const currentYear = currentDate.getFullYear(); // Année actuelle

function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Afficher le mois et l'année en haut
    monthDisplay.textContent = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

    // Effacer les anciens jours
    daysContainer.innerHTML = '';

    // Obtenir le jour de la semaine du premier jour du mois et le nombre de jours dans ce mois
    const firstDay = new Date(year, month, 1).getDay(); // Premier jour du mois
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Nombre de jours dans le mois

    // Afficher les cases vides avant le premier jour du mois
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    // Afficher les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;

        // Si c'est aujourd'hui, ajouter une classe spéciale
        if (day === today && year === currentYear && month === currentMonth) {
            dayDiv.classList.add('today');
        }

        daysContainer.appendChild(dayDiv);
    }
}

// Passer au mois précédent
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

// Passer au mois suivant
nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Initialiser le calendrier
updateCalendar();
