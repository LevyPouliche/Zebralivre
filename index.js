// index.js
// Script pour récupérer la biographie d’un auteur via l’API REST de Wikipedia

import readline from "readline";

// Interface pour lire l'entrée utilisateur dans le terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getBiography(authorName) {
  // Formatage du nom : remplacer les espaces par des underscores
  const formattedName = authorName.replace(/\s+/g, "_");
  const url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formattedName)}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Page introuvable ou erreur de requête");
      return res.json();
    })
    .then(data => {
      // L’API renvoie un résumé dans la propriété 'extract'
      return data.extract || "Aucune biographie disponible.";
    });
}

// Pose la question à l'utilisateur
rl.question("Nom de l'auteur : ", async (answer) => {
  try {
    const bio = await getBiography(answer);
    console.log("\nBiographie :\n");
    console.log(bio);
  } catch (err) {
    console.error("Erreur :", err.message);
  } finally {
    rl.close();
  }
});
