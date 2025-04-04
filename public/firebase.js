// Importation des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCG1Pn09Ugf0gxGknitJTdZCcI70YbhSEk",
  authDomain: "trendcashx.firebaseapp.com",
  projectId: "trendcashx",
  storageBucket: "trendcashx.appspot.com",
  messagingSenderId: "198131315912",
  appId: "1:198131315912:web:d533275cf1c4849f74a1fd",
  measurementId: "G-B0SN3CN30Z"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services Firebase
const db = getFirestore(app);
const auth = getAuth(app);

// Exporte les services pour les utiliser ailleurs
export { app, db, auth };
