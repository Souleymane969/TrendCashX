// --- Importation des fonctions Firebase ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// --- Configuration Firebase avec TES VALEURS ---
const firebaseConfig = {
  apiKey: "AlzaSyCG1PnO9UgF0gxGkniTJdZCcI70YShg6bY",
  authDomain: "trendcashx.firebaseapp.com",
  projectId: "trendcashx",
  storageBucket: "trendcashx.appspot.com",
  messagingSenderId: "198131315912",
  appId: "1:198131315912:web:d53275cf1c4849f94fc802",
  measurementId: "G-BOSN3CN3OZ"
};

// --- Initialisation de l'app ---
const app = initializeApp(firebaseConfig);

// --- Initialisation des services ---
const firebaseAuth = getAuth(app);

// --- Providers pour réseaux sociaux ---
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// --- Export des services nécessaires ---
export {
  firebaseAuth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  signInWithPopup,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier
};
