// Importation de Firebase depuis le CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Rendre Firebase accessible dans la console
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
// Tester l'initialisation dans la console
console.log("Firebase App:", window.firebaseApp);
console.log("Firebase Auth:", window.firebaseAuth);
console.log("Firebase Firestore:", window.firebaseDB);
