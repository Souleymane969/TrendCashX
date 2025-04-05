console.log(" Script index.js chargé !");

import { firebaseAuth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Sélection des éléments du DOM
const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

// Vérifie que le formulaire existe
if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;

      signupMessage.innerText = " Utilisateur inscrit avec succès !";
      signupMessage.style.color = "green";
      console.log(" Utilisateur inscrit :", user);
    } catch (error) {
      signupMessage.innerText = " Erreur : " + (error.message || "Inconnue");
 signupMessage.style.color = "red";
      console.error("Erreur d'inscription :", error);
    }
  });
} else {
  console.error(" Le formulaire d'inscription est introuvable !");
}
