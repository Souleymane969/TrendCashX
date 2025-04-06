// Importation des fonctions depuis les CDN Firebase 9 modular
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Configuration Firebase (remplace avec tes propres infos si nécessaire)
const firebaseConfig = {
  apiKey: "AlzaSyCG1PnO9UgF0gxGkniJTdZCcI70YvbeT8A",
  authDomain: "trendcashx.firebaseapp.com",
  projectId: "trendcashx",
  storageBucket: "trendcashx.appspot.com",
  messagingSenderId: "198131315912",
  appId: "1:198131315912:web:d533275cf1c4849fa31e04",
  measurementId: "G-BOSN3CN3OZ"
};

// Initialisation de l'app Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
const firebaseAuth = getAuth(app); // Authentification (email, Google, Twitter, etc.)
const firebaseDB = getFirestore(app); // Base de données (si besoin plus tard)

// Exporter les variables nécessaires
export { firebaseAuth, firebaseDB };
