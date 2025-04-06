console.log("Script index.js chargé !");

import {
  firebaseAuth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  signInWithPopup,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// --- Formulaires ---
const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

const logoutButton = document.getElementById("logout-button");
const logoutMessage = document.getElementById("logout-message");

const googleLoginBtn = document.getElementById("google-login-btn");
const facebookLoginBtn = document.getElementById("facebook-login-btn");
const twitterLoginBtn = document.getElementById("twitter-login-btn");
 const socialMessage = document.getElementById("social-message");

const phoneForm = document.getElementById("phone-form");
const phoneMessage = document.getElementById("phone-message");
const verifyForm = document.getElementById("verify-code-form");

let confirmationResult;

// --- Inscription par email ---
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      signupMessage.innerText = "Inscription réussie";
      signupMessage.style.color = "green";
      console.log("Utilisateur inscrit :", userCredential.user);
    } catch (error) {
      signupMessage.innerText = "Erreur : " + error.message;
      signupMessage.style.color = "red";
      console.error("Erreur d'inscription :", error);
    }
  });
}

// --- Connexion par email ---
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
 const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      loginMessage.innerText = "Connexion réussie";
      loginMessage.style.color = "green";
      logoutButton.style.display = "inline-block";
      console.log("Utilisateur connecté :", userCredential.user);
    } catch (error) {
      loginMessage.innerText = "Erreur : " + error.message;
      loginMessage.style.color = "red";
      console.error("Erreur de connexion :", error);
    }
  });
}

// --- Connexion Google ---
if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      socialMessage.innerText = `Connecté : user.displayName`;
      console.log("Connexion Google réussie :", user);
     catch (error) 
      socialMessage.innerText = "Erreur : " + error.message;
      console.error("Erreur Google :", error);
    );


// — Connexion Facebook —
if (facebookLoginBtn) 
  facebookLoginBtn.addEventListener("click", async () => 
    try 
      const result = await signInWithPopup(firebaseAuth, facebookProvider);
      const user = result.user;
      socialMessage.innerText = `Connecté :{user.displayName}`;
 console.log("Connexion Facebook réussie :", user);
    } catch (error) {
      socialMessage.innerText = "Erreur : " + error.message;
      console.error("Erreur Facebook :", error);
    }
  });
}

// --- Connexion Twitter ---
if (twitterLoginBtn) {
  twitterLoginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, twitterProvider);
      const user = result.user;
      socialMessage.innerText = `Connecté : ${user.displayName}`;
      console.log("Connexion Twitter réussie :", user);
    } catch (error) {
      socialMessage.innerText = "Erreur : " + error.message;
      console.error("Erreur Twitter :", error);
    }
  });
}

// --- Connexion par téléphone ---
if (phoneForm) {
  window.recaptchaVerifier = new RecaptchaVerifier(firebaseAuth, "recaptcha-container", {
    size: "normal",
    callback: (response) => {
      console.log("reCAPTCHA validé !");
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expiré");
    }
  });

  phoneForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById("phone-number").value;

    try {
      confirmationResult = await signInWithPhoneNumber(firebaseAuth, phoneNumber, window.recaptchaVerifier);
 phoneMessage.innerText = "Code envoyé par SMS";
      phoneMessage.style.color = "green";
      verifyForm.style.display = "block";
    } catch (error) {
      phoneMessage.innerText = "Erreur : " + error.message;
      phoneMessage.style.color = "red";
      console.error("Erreur téléphone :", error);
    }
  });
}

// --- Vérification code SMS ---
if (verifyForm) {
  verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = document.getElementById("verification-code").value;

    try {
      const result = await confirmationResult.confirm(code);
      phoneMessage.innerText = "Connexion réussie";
      phoneMessage.style.color = "green";
      console.log("Utilisateur connecté par téléphone :", result.user);
    } catch (error) {
      phoneMessage.innerText = "Erreur : " + error.message;
      phoneMessage.style.color = "red";
      console.error("Erreur vérification code :", error);
    }
  });
}

// --- Déconnexion ---
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(firebaseAuth);
      logoutMessage.innerText = "Déconnexion réussie.";
      logoutMessage.style.color = "green";
      logoutButton.style.display = "none";
    } catch (error) {
[06/04, 21:29] ChatGPT: logoutMessage.innerText = "Erreur : " + error.message;
      logoutMessage.style.color = "red";
      console.error("Erreur déconnexion :", error);
    }
  });
}
