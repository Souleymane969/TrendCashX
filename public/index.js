console.log(" Script index.js chargé !");

// Importation de firebaseAuth depuis firebase.js
import { firebaseAuth } from "./firebase.js";

// Importation de la fonction d'inscription par email
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Sélection des éléments HTML
const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

// Vérifie que le formulaire existe
if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Création de l'utilisateur
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;

      signupMessage.innerText = ` Utilisateur inscrit : ${user.email}`;
      signupMessage.style.color = "green";
   console.log("Utilisateur inscrit :", user);

     catch (error) 
      // Affichage de l'erreur
      signupMessage.innerText = ` Erreur :{error.message}`;
      signupMessage.style.color = "red";
      console.error("Erreur d'inscription :", error);
    }
  });
} else {
  console.error(" Le formulaire d'inscription n'existe pas.");
}
