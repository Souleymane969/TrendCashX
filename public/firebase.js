// Importation des fonctions depuis le CDN Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AlzaSyCG1Pn09Ugf0gxGknitJTdZCcI70YbhSEk",
  authDomain: "trendcashx.firebaseapp.com",
  projectId: "trendcashx",
  storageBucket: "trendcashx.appspot.com",
  messagingSenderId: "198131315912",
  appId: "1:198131315912:web:d533275cf1c4849f74a1fd",
  measurementId: "G-B0SN3CN30Z"
};

// Initialisation de l'app
const app = initializeApp(firebaseConfig);

// Initialisation des services
const firebaseAuth = getAuth(app);
const firebaseDB = getFirestore(app);

// Exporter les variables nécessaires
 export { firebaseAuth, firebaseDB };
