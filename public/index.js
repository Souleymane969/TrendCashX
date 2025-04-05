// index.js

console.log("Script index.js chargé !");

import { firebaseAuth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Sélection du formulaire et du message
const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

// Vérifie que le formulaire existe
if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement

    const email = document.getElementById("email").value;
 const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;

      signupMessage.innerText = `Utilisateur inscrit : user.email`;
      signupMessage.style.color = "green";
      console.log("Utilisateur inscrit :", user);
     catch (error) 
      signupMessage.innerText = `Erreur :{error.message}`;
      signupMessage.style.color = "red";
      console.error("Erreur d'inscription :", error);
    }
  });
} else {
  console.error("Le formulaire d'inscription est introuvable !");
}
