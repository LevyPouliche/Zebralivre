document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  const pseudo = document.getElementById("pseudo");
  const email = document.getElementById("email");
  const emailConfirm = document.getElementById("emailConfirm");
  const password = document.getElementById("password");
  const country = document.getElementById("country");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearErrors();
    let isValid = true;

    // Pseudo
    if (pseudo.value.trim().length < 3) {
      showError(pseudo, "Le pseudo doit contenir au moins 3 caractères.");
      isValid = false;
    }

    // Email
    if (!isValidEmail(email.value)) {
      showError(email, "Adresse email invalide.");
      isValid = false;
    }

    // Confirmation email
    if (email.value !== emailConfirm.value) {
      showError(emailConfirm, "Les adresses email ne correspondent pas.");
      isValid = false;
    }

    // Mot de passe
    if (password.value.length < 8) {
      showError(password, "Le mot de passe doit contenir au moins 8 caractères.");
      isValid = false;
    }

    // Pays
    if (country.value === "") {
      showError(country, "Veuillez sélectionner un pays.");
      isValid = false;
    }

    // Si tout est valide
    if (isValid) {
      const newUser = {
        pseudo: pseudo.value.trim(),
        email: email.value.trim(),
        password: password.value,
        country: country.value,
        language: document.getElementById("langue").value
      };

      console.log("Nouvel utilisateur :", newUser);

      // À brancher plus tard avec l’API backend
      // fetch("/api/register", { ... })
    }
  });

  function showError(input, message) {
    const formGroup = input.parentElement;
    const errorSpan = formGroup.querySelector(".error");
    errorSpan.textContent = message;
    formGroup.classList.add("has-error");
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(span => {
      span.textContent = "";
    });
    document.querySelectorAll(".form-group").forEach(group => {
      group.classList.remove("has-error");
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
