console.log("Script index.js chargé !");

import { firebaseAuth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// --------- INSCRIPTION PAR EMAIL ---------
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
      signupMessage.innerText = `Bienvenue, user.email`;
      signupMessage.style.color = "green";
      console.log("Utilisateur inscrit :", user);
      logoutButton.style.display = "inline-block";
     catch (error) 
      signupMessage.innerText = `Erreur :{error.message}`;
      signupMessage.style.color = "red";
      console.error("Erreur d'inscription :", error);
    }
  });
}

// --------- CONNEXION PAR EMAIL ---------
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      loginMessage.innerText = `Bienvenue, user.email`;
      loginMessage.style.color = "green";
      console.log("Utilisateur connecté :", user);
      logoutButton.style.display = "inline-block";
     catch (error) 
      loginMessage.innerText = `Erreur :{error.message}`;
      loginMessage.style.color = "red";
 console.error("Erreur de connexion :", error);
    }
  });
}

// --------- CONNEXION GOOGLE ---------
const googleBtn = document.getElementById("google-login");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      alert(`Connecté avec Google : user.displayName`);
      logoutButton.style.display = "inline-block";
     catch (error) 
      console.error("Erreur Google Login :", error);
      alert("Erreur : " + error.message);
    );


// ——— CONNEXION FACEBOOK ———
const facebookBtn = document.getElementById("facebook-login");
if (facebookBtn) 
  facebookBtn.addEventListener("click", async () => 
    const provider = new FacebookAuthProvider();
    try 
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      alert(`Connecté avec Facebook :{user.displayName}`);
      logoutButton.style.display = "inline-block";
    } catch (error) {
      console.error("Erreur Facebook Login :", error);
      alert("Erreur : " + error.message);
    }
  });
}

// --------- CONNEXION TWITTER ---------
const twitterBtn = document.getElementById("twitter-login");
 if (twitterBtn) {
  twitterBtn.addEventListener("click", async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      alert(`Connecté avec Twitter : ${user.displayName}`);
      logoutButton.style.display = "inline-block";
    } catch (error) {
      console.error("Erreur Twitter Login :", error);
      alert("Erreur : " + error.message);
    }
  });
}

// --------- CONNEXION TÉLÉPHONE ---------
const phoneForm = document.getElementById("phone-form");
const verifyForm = document.getElementById("verify-code-form");
const phoneMessage = document.getElementById("phone-message");
let confirmationResult;

if (phoneForm) {
  window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
    size: "normal",
    callback: (response) => {
      console.log("reCAPTCHA vérifié");
    }
  }, firebaseAuth);

  phoneForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById("phone-number").value;

    try {
      confirmationResult = await signInWithPhoneNumber(firebaseAuth, phoneNumber, window.recaptchaVerifier);
      phoneMessage.innerText = "Code envoyé par SMS";
      phoneMessage.style.color = "green";
 verifyForm.style.display = "block";
      console.log("SMS envoyé !");
     catch (error) 
      phoneMessage.innerText = "Erreur : " + error.message;
      phoneMessage.style.color = "red";
      console.error("Erreur SMS :", error);
    );

  verifyForm.addEventListener("submit", async (e) => 
    e.preventDefault();
    const code = document.getElementById("verification-code").value;

    try 
      const result = await confirmationResult.confirm(code);
      const user = result.user;
      phoneMessage.innerText = `Connecté :{user.phoneNumber}`;
      phoneMessage.style.color = "green";
      console.log("Connexion par téléphone réussie :", user);
      logoutButton.style.display = "inline-block";
    } catch (error) {
      phoneMessage.innerText = "Code invalide";
      phoneMessage.style.color = "red";
      console.error("Erreur code SMS :", error);
    }
  });
}

// --------- DÉCONNEXION ---------
const logoutButton = document.getElementById("logout-button");
const logoutMessage = document.getElementById("logout-message");

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(firebaseAuth);
      logoutMessage.innerText = "Déconnexion réussie.";
      logoutMessage.style.color = "green";
 console.log("Utilisateur déconnecté.");
      logoutButton.style.display = "none";
    } catch (error) {
      logoutMessage.innerText = "Erreur de déconnexion.";
      logoutMessage.style.color = "red";
      console.error("Erreur logout :", error);
    }
  });
}
