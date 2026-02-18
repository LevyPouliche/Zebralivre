    function sauvegarderHeures() {
    localStorage.setItem("heuresTravaillees", JSON.stringify(heuresTravaillees));
}

function chargerHeures() {
    const data = localStorage.getItem("heuresTravaillees");
    if (data) {
        heuresTravaillees = JSON.parse(data);
        barChart.data.datasets[0].data = heuresTravaillees;
        barChart.update();
    }
}


    const ctx = document.getElementById('barChart').getContext('2d');
    const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    let heuresTravaillees = new Array(jours.length).fill(0);

   // Création du graphique
const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: jours,
        datasets: [{
            label: "Nombre d'heures",
            data: heuresTravaillees,
            backgroundColor: "rgba(56,163,165,0.5)",   // Couleur demandée
            borderColor: "#38A3A5",                   // Bordure demandée
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 24,
                title: {
                    display: true,
                    text: "Heures"
                }
            }
        }
    }
});

function ajouterTempsAuJour(secondes) {
    let heures = secondes / 3600;

    // Jour actuel (0 = dimanche ... 6 = samedi)
    let indexJour = new Date().getDay();

    heuresTravaillees[indexJour] += heures;

    if (heuresTravaillees[indexJour] > 24) {
        heuresTravaillees[indexJour] = 24;
    }

    barChart.data.datasets[0].data = heuresTravaillees;
   barChart.update();
afficherResumeJours();
sauvegarderHeures();

}

function afficherResumeJours() {
    const div = document.getElementById("resumeJours");
    let html = "<h3>Heures travaillées par jour</h3>";

    for (let i = 0; i < jours.length; i++) {
        html += `${jours[i]} : ${heuresTravaillees[i].toFixed(2)} h<br>`;
    }

    div.innerHTML = html;
}
chargerHeures();


afficherResumeJours();

class Timer {
    constructor(affichageElement) {
        this.affichageElement = affichageElement;
        this.reset();
        this.interval = null;
    }

    start() {
        if (!this.interval) {
            this.startTime = Date.now() - this.elapsedTime;
            this.interval = setInterval(() => {
                this.elapsedTime = Date.now() - this.startTime;
                this.afficherTemps();
            }, 1000);
        }
    }

    stop() {
    if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;

        // temps écoulé en secondes
        let secondes = Math.floor(this.elapsedTime / 1000);

        // mise à jour du graphique
        ajouterTempsAuJour(secondes);

        // --- AJOUT XP PAR MINUTE ---
        // 1 XP par minute de lecture
        let xpAAjouter = Math.floor(secondes / 60);
        if (xpAAjouter > 0) {
            ajouterXP(xpAAjouter); // Appel de votre fonction existante
        }
    }
}


    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.startTime = null;
        this.afficherTemps();
    }

    ajouterTemps(listeDeTemps) {
    let totalSecondes = 0;
    listeDeTemps.forEach(temps => {
        const [heures, minutes] = temps.split(':').map(Number);
        if (isNaN(heures) || isNaN(minutes)) return; // Validation simple
        totalSecondes += (heures * 3600) + (minutes * 60);
    });

    this.elapsedTime += totalSecondes * 1000;
    if (this.startTime) {
        this.startTime = Date.now() - this.elapsedTime;
    }
    this.afficherTemps();
}

    afficherTemps() {
        let totalSecondes = Math.floor(this.elapsedTime / 1000);
        const heures = Math.floor(totalSecondes / 3600);
        const minutes = Math.floor((totalSecondes % 3600) / 60);
        const secondes = totalSecondes % 60;

        const tempsFormate = [
            String(heures).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(secondes).padStart(2, '0')
        ].join(':');

        this.affichageElement.textContent = tempsFormate;
    }
}

// Création du Timer
const monTimer = new Timer(document.getElementById('timer'));

// Récupération des boutons
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

// Fonctions appelées par onclick
function demarrer() {
    monTimer.start();
    startBtn.disabled = true;    // Désactiver "Démarrer"
    stopBtn.disabled = false;    // Activer "Arrêter"
    resetBtn.disabled = false;   // Activer "Réinitialiser"
}

function arreter() {
    monTimer.stop();
    startBtn.disabled = false;   // Activer "Démarrer"
    stopBtn.disabled = true;     // Désactiver "Arrêter"
    resetBtn.disabled = false;   // "Réinitialiser" reste actif
}

function reinitialiser() {
    monTimer.reset();
    startBtn.disabled = false;   // Activer "Démarrer"
    stopBtn.disabled = true;     // Désactiver "Arrêter"
    resetBtn.disabled = true;    // Désactiver "Réinitialiser"
}

function ajouterTemps() {
    const input = document.getElementById('tempsAjouter');
    const temps = input.value.trim();
    if (temps) {
        monTimer.ajouterTemps([temps]);
        input.value = '';
        // Facultatif : activer Réinitialiser si on ajoute du temps
        resetBtn.disabled = false;
    }
}

function envoyerLivre() {
    const select = document.getElementById("mesLivres");
    const livreChoisi = select.value;

    if (!livreChoisi) {
        alert("Veuillez sélectionner un livre.");
        return;
    }

    // Affiche le livre sélectionné dans la div
    const affichage = document.getElementById("livreSelectionne");
    affichage.textContent = livreChoisi;
}

function selectionLivre() {
    const select = document.getElementById("mesLivres");
    const livreChoisi = select.value;

    const inputTemps = document.getElementById("tempsAjouter");
    const boutonTemps = document.getElementById("Ajoutertemps");
    const boutonStart = document.getElementById("startBtn");

    if (livreChoisi) {
        // Activer temps + bouton démarrer
        inputTemps.disabled = false;
        boutonTemps.disabled = false;
        boutonStart.disabled = false;
    } else {
        // Désactiver si aucun livre
        inputTemps.disabled = true;
        boutonTemps.disabled = true;
        boutonStart.disabled = true;
    }
}



