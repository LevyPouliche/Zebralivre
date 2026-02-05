 const addBtn = document.getElementById('addCheckbox');
  const textInput = document.getElementById('checkboxText');
  const list = document.getElementById('checkboxList');
  const clearAll = document.getElementById('clearAll');
  const clearChecked = document.getElementById('clearChecked');

  // Charger depuis le localStorage
  let items = JSON.parse(localStorage.getItem('checkboxItems')) || [];
  renderList();

  // Ajouter un élément
  addBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text === "") return;

    items.push({ text, checked: false });
    saveAndRender();
    textInput.value = "";
    textInput.focus();
  });

  // Supprimer tout
  clearAll.addEventListener('click', () => {
    items = [];
    saveAndRender();
  });

  // Supprimer cochés
  clearChecked.addEventListener('click', () => {
    items = items.filter(item => !item.checked);
    saveAndRender();
  });

  // Sauvegarde + affichage
  function saveAndRender() {
    localStorage.setItem('checkboxItems', JSON.stringify(items));
    renderList();
  }

  // Affichage
  function renderList() {
    list.innerHTML = "";

    // Trier : non cochés en haut, cochés en bas
    const sorted = items
      .map((item, index) => ({ ...item, originalIndex: index }))
      .sort((a, b) => a.checked - b.checked);

    sorted.forEach(item => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.checked;

      const span = document.createElement('span');
      span.textContent = item.text;

      // Lorsqu'on coche ou décoche
      checkbox.addEventListener('change', () => {
        // On met à jour dans le tableau principal via son index d’origine
        items[item.originalIndex].checked = checkbox.checked;
        saveAndRender();
      });

      label.appendChild(checkbox);
      label.appendChild(span);
      list.appendChild(label);
    });
  }
