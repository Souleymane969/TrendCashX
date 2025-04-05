console.log("Script index.js chargé !");

import { firebaseAuth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;

      signupMessage.innerText = `Utilisateur inscrit : ${user.email}`;
      signupMessage.style.color = "green";
      console.log("Utilisateur inscrit :", user);

    } catch (error) {
 signupMessage.innerText = `Erreur : " + error.message;
      signupMessage.style.color = "red";
      console.error("Erreur d'inscription :", error);
    }
  });
} else {
  console.error("Le formulaire d'inscription est introuvable.");
}
