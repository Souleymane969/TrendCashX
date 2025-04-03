javascript
// Importation des modules Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Pour l'authentification
import { getFirestore } from "firebase/firestore"; // Pour la base de données

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AlzaSyCG1Pn09UgxGknitJTdZCcl70YbhSEk",
  authDomain: "trendcashx.firebaseapp.com",
  projectId: "trendcashx",
  storageBucket: "trendcashx.firebasestorage.app",
  messagingSenderId: "198131315912",
  appId: "1:198131315912:web:d533275cf1c4849f74a1fd",
  measurementId: "G-B0SN3CN30Z"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
const auth = getAuth(app); // Authentification
const db = getFirestore(app); // Base de données Firestore

export { auth, db };
