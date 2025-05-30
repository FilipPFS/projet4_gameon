function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Elements du DOM: recuperation via la classe (querySellector) ou par id (getElementById)
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("formElement");
const modalBody = document.querySelector(".modal-body");

// Ouvrir le modal via le button
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fermer le modal
closeBtn.addEventListener("click", closeModal);

// Afficher le modal
function launchModal() {
  modalbg.style.display = "block";
}

// Masquer le modal (fermeture) et reinitialisation des champs du formulaire
function closeModal() {
  form.reset();
  modalbg.style.display = "none";
}

// Supression des erreurs via des atrributs des divs avec la classe formData
function clearErrors() {
  document.querySelectorAll(".formData").forEach((el) => {
    el.setAttribute("data-error", "");
    el.setAttribute("data-error-visible", "false");
  });
}

// Ajout d'un évènement à la sumission du formulaire
form.addEventListener("submit", validate);

// Function qui récuperé et valide les différents champs du formulaire
function validate(event) {
  // Pour empêcher la soumission et rafraichissement de la page
  event.preventDefault();

  // A chaque nouvelle soumission, on supprime les erreurs de la précedente soumission (si présentes)
  let isValid = true;
  clearErrors();

  // Récuperation des différents champs de notre formulaire
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const locations = document.getElementsByName("location");
  const checkbox1 = document.getElementById("checkbox1");

  // Fonction qui trouve le div concerné par l'erreur, et ajoute des attributs d'erreurs pour afficher l'erreur dans l'UI
  function showError(input, message) {
    const parent = input.closest(".formData");
    parent.setAttribute("data-error", message);
    parent.setAttribute("data-error-visible", "true");
    isValid = false;
  }

  // Si la valeur de cet élèment est inférieure à 2 charactères, on va afficher ce message
  if (firstName.value.trim().length < 2) {
    showError(firstName, "Le prénom doit contenir au moins 2 caractères.");
  }

  if (lastName.value.trim().length < 2) {
    showError(lastName, "Le nom doit contenir au moins 2 caractères.");
  }

  // Vérification spécifique si l'email est dans le format valide
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    showError(email, "Veuillez entrer une adresse e-mail valide.");
  }

  if (!birthdate.value) {
    showError(birthdate, "Veuillez renseigner votre date de naissance.");
  }

  if (quantity.value === "" || Number(quantity.value) < 0) {
    showError(quantity, "Veuillez indiquer un nombre valide.");
  }

  // Vérification si un lieu a été choisi
  let locationSelected = false;
  for (const loc of locations) {
    if (loc.checked) {
      locationSelected = true;
      break;
    }
  }
  if (!locationSelected) {
    showError(locations[0], "Veuillez choisir un lieu.");
  }

  // Vérification de la valeur du checkbox avec 'checked'
  if (!checkbox1.checked) {
    showError(checkbox1, "Vous devez accepter les conditions.");
  }

  return isValid;
}
