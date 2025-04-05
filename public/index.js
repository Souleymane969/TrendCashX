console.log("Script index.js chargé !");

import { firebaseAuth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

//  Sélection des éléments du DOM
const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

//  Inscription
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
     catch (error) 
      signupMessage.innerText = `Erreur :{error.message}`;
      signupMessage.style.color = "red";
      console.error("Erreur d'inscription :", error);
    }
  });
}

//  Connexion
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;

      loginMessage.innerText = `Bienvenue user.email`;
      loginMessage.style.color = "green";
      console.log("Utilisateur connecté :", user);
     catch (error) 
      loginMessage.innerText = `Erreur :{error.message}`;
      loginMessage.style.color = "red";
      console.error("Erreur de connexion :", error);
    }
  });
}
