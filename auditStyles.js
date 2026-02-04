(() => {
    // -----------------------------
    // 1. Tous les IDs
    // -----------------------------
    const allIds = [...document.querySelectorAll('[id]')].map(el => el.id)
                     .filter(Boolean)
                     .sort();

    // -----------------------------
    // 2. Toutes les classes uniques
    // -----------------------------
    const allClasses = [...document.querySelectorAll('[class]')]
        .flatMap(el => el.className.split(/\s+/))
        .filter(Boolean);
    const uniqueClasses = [...new Set(allClasses)].sort();

// -----------------------------
    // 3. Toutes les variables CSS
    // -----------------------------
    const allVariables = new Set();
    for (let sheet of document.styleSheets) {
        try {
            for (let rule of sheet.cssRules) {
                if (rule.style) {
                    for (let i = 0; i < rule.style.length; i++) {
                        const prop = rule.style[i];
                        if (prop.startsWith('--')) {
                            allVariables.add(prop);
                        }
                    }
                }
            }
        } catch(e) {
            // Certaines feuilles externes peuvent être bloquées par CORS
        }
    }
    const sortedVariables = [...allVariables].sort();

// -----------------------------
    // 4. Préparer les données
    // -----------------------------
    const data = {
        ids: allIds,
        classes: uniqueClasses,
        cssVariables: sortedVariables
    };

    // -----------------------------
    // 5. Générer et télécharger le fichier JSON
    // -----------------------------
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'styles_zebralivre.json';
    a.click();

    console.log('✅ Audit complet terminé. Fichier JSON généré.', data);

    return data; // retourne également les données dans la console
})();
