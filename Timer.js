// =======================
// SAUVEGARDE / CHARGEMENT
// =======================

function sauvegarderHeures() {
  localStorage.setItem(
    "heuresTravaillees",
    JSON.stringify(heuresTravaillees)
  );
}

function chargerHeures() {
  const data = localStorage.getItem("heuresTravaillees");
  if (data) {
    heuresTravaillees = JSON.parse(data);
    barChart.data.datasets[0].data = heuresTravaillees;
    barChart.update();
  }
}

// =======================
// GRAPHIQUE
// =======================

const ctx = document.getElementById("barChart")?.getContext("2d");

const jours = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];

let heuresTravaillees = new Array(jours.length).fill(0);

// Sécurité : si le canvas n'existe pas, on n'initialise pas le graphique
let barChart = null;

if (ctx) {
  barChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: jours,
      datasets: [
        {
          label: "Nombre d'heures",
          data: heuresTravaillees,
          backgroundColor: "rgba(56,163,165,0.5)",
          borderColor: "#38A3A5",
          borderWidth: 1
        }
      ]
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

  chargerHeures();
}

// =======================
// MISE À JOUR DES HEURES
// =======================

function ajouterTempsAuJour(secondes) {
  if (!barChart) return;

  const heures = secondes / 3600;
  const indexJour = new Date().getDay();

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
  if (!div) return;

  let html = "<h3>Heures travaillées par jour</h3>";
  for (let i = 0; i < jours.length; i++) {
    html += `${jours[i]} : ${heuresTravaillees[i].toFixed(2)} h<br>`;
  }
  div.innerHTML = html;
}

// =======================
// TIMER
// =======================

class Timer {
  constructor(affichageElement) {
    this.affichageElement = affichageElement;
    this.interval = null;
    this.elapsedTime = 0;
    this.startTime = null;
    this.afficherTemps();
  }

  start() {
    if (this.interval) return;

    this.startTime = Date.now() - this.elapsedTime;

    this.interval = setInterval(() => {
      this.elapsedTime = Date.now() - this.startTime;
      this.afficherTemps();
    }, 1000);
  }

  stop() {
    if (!this.interval) return;

    clearInterval(this.interval);
    this.interval = null;

    const secondes = Math.floor(this.elapsedTime / 1000);

    // Graphique
    ajouterTempsAuJour(secondes);

    // XP (sécurisé)
    const xpAAjouter = Math.floor(secondes / 60);
    if (xpAAjouter > 0 && typeof window.ajouterXP === "function") {
      window.ajouterXP(xpAAjouter);
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
      const [h, m] = temps.split(":").map(Number);
      if (isNaN(h) || isNaN(m)) return;
      totalSecondes += h * 3600 + m * 60;
    });

    this.elapsedTime += totalSecondes * 1000;
    if (this.startTime) {
      this.startTime = Date.now() - this.elapsedTime;
    }

    this.afficherTemps();
  }

  afficherTemps() {
    if (!this.affichageElement) return;

    const totalSecondes = Math.floor(this.elapsedTime / 1000);
    const h = Math.floor(totalSecondes / 3600);
    const m = Math.floor((totalSecondes % 3600) / 60);
    const s = totalSecondes % 60;

    this.affichageElement.textContent =
      String(h).padStart(2, "0") + ":" +
      String(m).padStart(2, "0") + ":" +
      String(s).padStart(2, "0");
  }
}

// =======================
// INITIALISATION UI
// =======================

const timerElement = document.getElementById("timer");
const monTimer = new Timer(timerElement);

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

window.demarrer = function () {
  monTimer.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
};

window.arreter = function () {
  monTimer.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

window.reinitialiser = function () {
  monTimer.reset();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
};

// =======================
// AJOUT MANUEL DE TEMPS
// =======================

window.ajouterTemps = function () {
  const input = document.getElementById("tempsAjouter");
  if (!input || !input.value.trim()) return;

  monTimer.ajouterTemps([input.value.trim()]);
  input.value = "";
  resetBtn.disabled = false;
};

// =======================
// GESTION LIVRES / UI
// =======================

window.selectionLivre = function () {
  const select = document.getElementById("mesLivres");
  const inputTemps = document.getElementById("tempsAjouter");
  const boutonTemps = document.getElementById("Ajoutertemps");
  const boutonStart = document.getElementById("startBtn");

  if (!select || !inputTemps || !boutonTemps || !boutonStart) return;

  if (select.value) {
    inputTemps.disabled = false;
    boutonTemps.disabled = false;
    boutonStart.disabled = false;
  } else {
    inputTemps.disabled = true;
    boutonTemps.disabled = true;
    boutonStart.disabled = true;
  }
};

window.envoyerLivre = function () {
  const select = document.getElementById("mesLivres");
  const affichage = document.getElementById("livreSelectionne");

  if (!select || !affichage) return;

  if (!select.value) {
    alert("Veuillez sélectionner un livre.");
    return;
  }

  affichage.textContent = select.value;
};



